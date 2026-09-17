-- Baneh360 MVP schema
-- PostgreSQL / Supabase

create extension if not exists pgcrypto;

create type public.business_type as enum (
  'store', 'restaurant', 'cafe', 'hotel', 'attraction', 'parking', 'service'
);

create type public.verification_status as enum ('pending', 'verified', 'rejected');
create type public.stock_status as enum ('in_stock', 'limited', 'out_of_stock', 'unknown');
create type public.discount_type as enum ('percent', 'fixed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_fa text not null,
  name_en text,
  icon text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  type public.business_type not null,
  name text not null,
  slug text not null unique,
  description text,
  phone text,
  whatsapp text,
  website text,
  address text,
  latitude double precision,
  longitude double precision,
  cover_url text,
  logo_url text,
  verification_status public.verification_status not null default 'pending',
  is_active boolean not null default true,
  is_featured boolean not null default false,
  rating numeric(2,1),
  review_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint businesses_rating_check check (rating is null or (rating >= 0 and rating <= 5))
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  brand text,
  model text,
  image_url text,
  search_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  price numeric(14,0) not null check (price >= 0),
  previous_price numeric(14,0) check (previous_price is null or previous_price >= 0),
  stock public.stock_status not null default 'unknown',
  warranty text,
  note text,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (business_id, product_id)
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  title text not null,
  description text,
  code text,
  discount_type public.discount_type,
  discount_value numeric(12,2),
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  body text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id, business_id)
);

create table public.favorites (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, business_id)
);

create index businesses_type_idx on public.businesses(type);
create index businesses_category_idx on public.businesses(category_id);
create index businesses_verification_idx on public.businesses(verification_status, is_active);
create index listings_product_price_idx on public.listings(product_id, price) where is_active = true;
create index listings_business_idx on public.listings(business_id);
create index deals_active_dates_idx on public.deals(is_active, starts_at, ends_at);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'name'))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.businesses enable row level security;
alter table public.products enable row level security;
alter table public.listings enable row level security;
alter table public.deals enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;

create policy "public can read active categories"
on public.categories for select
using (is_active = true);

create policy "public can read approved businesses"
on public.businesses for select
using (is_active = true and verification_status = 'verified');

create policy "public can read products"
on public.products for select
using (true);

create policy "public can read active listings"
on public.listings for select
using (
  is_active = true and exists (
    select 1 from public.businesses b
    where b.id = business_id
      and b.is_active = true
      and b.verification_status = 'verified'
  )
);

create policy "public can read active deals"
on public.deals for select
using (
  is_active = true
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
  and exists (
    select 1 from public.businesses b
    where b.id = business_id
      and b.is_active = true
      and b.verification_status = 'verified'
  )
);

create policy "public can read published reviews"
on public.reviews for select
using (is_published = true);

create policy "users can read own profile"
on public.profiles for select to authenticated
using (auth.uid() = id);

create policy "users can update own profile"
on public.profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "users manage own favorites"
on public.favorites for all to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "users create own reviews"
on public.reviews for insert to authenticated
with check (auth.uid() = profile_id);

create policy "users update own reviews"
on public.reviews for update to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

insert into public.categories (slug, name_fa, name_en, icon, sort_order) values
  ('shopping', 'خرید و فروشگاه', 'Shopping', 'shopping-bag', 10),
  ('food', 'رستوران و کافه', 'Food & Cafe', 'utensils', 20),
  ('stay', 'هتل و اقامت', 'Stay', 'hotel', 30),
  ('services', 'خدمات شهری', 'Services', 'tool', 40),
  ('attractions', 'دیدنی‌ها', 'Attractions', 'map-pin', 50),
  ('parking', 'پارکینگ', 'Parking', 'parking', 60)
on conflict (slug) do nothing;

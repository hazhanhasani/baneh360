const stats = [
  ['کسب‌وکارها', '0', 'در انتظار ورود داده'],
  ['قیمت‌های فعال', '0', 'لیستینگ کالا'],
  ['تخفیف‌ها', '0', 'کمپین فعال'],
  ['کاربران', '0', 'عضو ثبت‌شده'],
];

export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span>Baneh</span><b>360</b></div>
        <p className="brandCaption">مرکز مدیریت</p>
        <nav>
          <a className="active">داشبورد</a>
          <a>کسب‌وکارها</a>
          <a>کالا و قیمت</a>
          <a>تخفیف‌ها</a>
          <a>سفر و مکان‌ها</a>
          <a>گزارش‌ها</a>
        </nav>
      </aside>

      <section className="content">
        <header>
          <div>
            <p className="muted">پنج‌شنبه، شروع پروژه</p>
            <h1>داشبورد بانه ۳۶۰</h1>
          </div>
          <button>+ افزودن کسب‌وکار</button>
        </header>

        <div className="stats">
          {stats.map(([title, value, caption]) => (
            <article key={title}>
              <p>{title}</p>
              <strong>{value}</strong>
              <span>{caption}</span>
            </article>
          ))}
        </div>

        <div className="panelGrid">
          <article className="panel">
            <div className="panelTitle"><h2>شروع راه‌اندازی</h2><span>Phase 1</span></div>
            <div className="checklist">
              <div className="done">ساخت هویت و ریپوی پروژه</div>
              <div className="done">معماری اپ و پنل مدیریت</div>
              <div>اتصال Supabase و احراز هویت</div>
              <div>ورود اولین کسب‌وکارهای بانه</div>
            </div>
          </article>

          <article className="panel accentPanel">
            <p className="kicker">Baneh360</p>
            <h2>خرید، سفر، زندگی</h2>
            <p>اطلاعات قابل اعتماد و خدمات واقعی بانه در یک تجربه یکپارچه.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

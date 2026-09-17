export type UserMode = 'traveler' | 'resident';

export type BusinessType =
  | 'store'
  | 'restaurant'
  | 'cafe'
  | 'hotel'
  | 'attraction'
  | 'parking'
  | 'service';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface BusinessSummary {
  id: string;
  name: string;
  type: BusinessType;
  verificationStatus: VerificationStatus;
  rating: number | null;
  reviewCount: number;
  address: string | null;
}

export interface ProductListing {
  id: string;
  businessId: string;
  productId: string;
  price: number;
  previousPrice: number | null;
  inStock: boolean;
  warranty: string | null;
  updatedAt: string;
}

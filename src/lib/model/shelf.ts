// what's on the shelf?
export interface Shelf {
  storeId?: string;
  productId?: string;
  aisle: string;
  shelf: string;
  level: string;
  updated: string; // date
  price: string;
}

export interface ShelfSearchParams {
  address?: string;
  category?: string;
  city?: string;
  name?: string;
}
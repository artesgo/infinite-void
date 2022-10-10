// what's on the shelf?
export interface Stock {
  storeId?: string;
  productId?: string;
  aisle: number;
  shelf: number;
  level: number;
  updated: Date; // date
  price: number;
}

export interface StockSearchParams {
  address?: string;
  category?: string;
  city?: string;
  name?: string;
}
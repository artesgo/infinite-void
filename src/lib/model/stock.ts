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
  storeId?: string; // search only storeId for inventory of store
  productId?: string; // search only productId for location of item in different stores
}
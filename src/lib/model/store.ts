export interface Store {
  id?: string;
  address: string;
  category?: string;
  city: string;
  name: string;
}

export interface StoreSearchParams {
  address?: string;
  category?: string;
  city?: string;
  name?: string;
}
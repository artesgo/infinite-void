export interface Product {
  id?: string,
  name?: string,
  brand?: string,
  weight?: string,
  weight_unit?: string;
  sku?: string;
}

export interface ProductSearchParams {
  name?: string;
  brand?: string;
  sku?: string;
}
export interface Product {
  nameProduct: string;
  numberProduct: string;
  balanceProduct: string;
  detaildProduct: string;
  iconProduct?: string;
}

export interface ProductsResponse {
  listCard: Product[];
}
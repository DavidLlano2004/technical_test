import { productsApi } from "../../api/productsApi";
import type { ProductsResponse } from "../interfaces/product";

export const getProductsAction = async (): Promise<ProductsResponse> => {
  try {
    const { data } = await productsApi.get<ProductsResponse>("/cards");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error trayendo los productos");
  }
};

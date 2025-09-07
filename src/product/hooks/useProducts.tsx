import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";

export const useProducts = () => {

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsAction(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    productsQuery,
  };

};

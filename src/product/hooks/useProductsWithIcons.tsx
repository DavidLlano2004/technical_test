// hooks/useProductsWithIcons.ts
import { useMemo } from 'react';
import { useProducts } from './useProducts';

// Mapa que relaciona el nombre del producto con el nombre del icono en el objeto Icons
const productIconMap: Record<string, string> = {
  'MFUND': 'IconMFUND',
  'CREA': 'IconCREA', 
  'FICS': 'IconFICS',
  'BOLT': 'IconBOLT',
};

export const useProductsWithIcons = () => {
  const { productsQuery } = useProducts();
  
  const productsWithIcons = useMemo(() => {
    if (!productsQuery.data?.listCard) return [];
    
    return productsQuery.data.listCard.map(product => ({
      ...product,
      iconProduct: productIconMap[product.nameProduct] || 'IconDefault'
    }));
  }, [productsQuery.data]);

  return {
    productsQuery,
    products: productsWithIcons,
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    error: productsQuery.error
  };
};
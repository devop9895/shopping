import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/features/products';

export const PRODUCT_KEYS = {
  ALL: ['products-key'],
} as const;

export function useProducts() {
  return useQuery({
    queryKey: PRODUCT_KEYS.ALL,
    queryFn: getProducts,
  });
}

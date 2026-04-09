import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/features/products';
import { PRODUCT_KEYS } from '@/features/products/constants';

export function useProducts() {
  return useQuery({
    queryKey: PRODUCT_KEYS.ALL,
    queryFn: getProducts,
  });
}

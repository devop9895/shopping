import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/features/products';
import { PRODUCT_KEYS } from '@/features/products/constants';
import { filterGetAll } from '@/features/shopping/hooks/useProductsFilters';

export function useAllProducts() {
  return useQuery({
    queryKey: PRODUCT_KEYS.ALL,
    queryFn: () => getProducts({ filters: filterGetAll }),
  });
}

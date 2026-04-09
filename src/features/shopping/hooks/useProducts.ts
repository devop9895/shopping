import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/features/products/api/getProducts';
import { useProductsFilters } from '@/features/shopping/hooks/useProductsFilters';
import { PRODUCT_KEYS } from '@/features/products/constants';

export function useProducts() {
  const filters = useProductsFilters();

  return useQuery({
    queryKey: [PRODUCT_KEYS.FILTERS, filters],
    queryFn: () => getProducts({ filters }),
  });
}

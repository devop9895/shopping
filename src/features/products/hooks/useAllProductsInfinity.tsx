import { useInfiniteQuery } from '@tanstack/react-query';
import { PRODUCT_KEYS } from '@/features/products/constants';
import type { dataBaseTypeProductPagination } from '@/features/products/schemas';
import { getProducts } from '@/features/products';

export function useAllProductsInfinity() {
  return useInfiniteQuery({
    queryKey: PRODUCT_KEYS.INFINITY,
    queryFn: ({ pageParam }) => getProducts({ filters: { _page: pageParam, _per_page: '20' } }),
    initialPageParam: '1',
    getNextPageParam: (lastPage: dataBaseTypeProductPagination) => lastPage.next?.toString(),
  });
}

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { ProductsTable } from '@/features/products/components/ProductsTable';
import { useAllProductsInfinity } from '@/features/products/hooks/useAllProductsInfinity';

export function InfinityProducts() {
  const { isFetchingNextPage, isPending, error, data, fetchNextPage, hasNextPage } =
    useAllProductsInfinity();

  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView || isFetchingNextPage || !hasNextPage) return;

    fetchNextPage();
  }, [inView, isFetchingNextPage]);

  if (isPending) {
    return (
      <div className='rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500'>
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className='rounded-lg border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700'>
        Error: {error.message}
      </div>
    );
  }

  const products = data.pages.flatMap((group) => group.data);
  return (
    <div className='flex h-full flex-1 flex-col gap-3'>
      <ProductsTable products={products} sentinelRef={ref} />
    </div>
  );
}

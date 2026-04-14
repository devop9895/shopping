import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { ProductsTable } from '@/features/products/components/ProductsTable';
import { useAllProductsInfinity } from '@/features/products/hooks/useAllProductsInfinity';

export function InfinityProducts() {
  const { isFetchingNextPage, isPending, error, data, fetchNextPage } = useAllProductsInfinity();

  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView || isFetchingNextPage) return;

    fetchNextPage();
  }, [inView, isFetchingNextPage]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products = data.pages.flatMap((group) => group.data);
  return (
    <div className='flex-1'>
      <button onClick={() => fetchNextPage()}>LOAD MORE</button>
      <ProductsTable products={products} />
      <div ref={ref}>Loading...</div>
    </div>
  );
}

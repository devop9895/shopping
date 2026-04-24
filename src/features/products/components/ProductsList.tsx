import { useAllProducts } from '@/hooks/useAllProducts';
import { ProductsTable } from '@/features/products/components/ProductsTable';

export function ProductsList() {
  const { error, data, isPending } = useAllProducts();

  if (isPending) {
    return (
      <div className='p-4'>
        <div className='rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500'>
          Loading...
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className='p-4'>
        <div className='rounded-lg border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700'>
          Error: {error.message}
        </div>
      </div>
    );
  }
  return <ProductsTable products={data?.data} />;
}

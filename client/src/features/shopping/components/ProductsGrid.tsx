import { useFilteredProducts } from '@/features/shopping/hooks/useFilteredProducts';
import { ProductCard } from '@/features/shopping/components/ProductCard';

export function ProductsGrid() {
  const { error, data, isPending } = useFilteredProducts();

  if (error) {
    return (
      <div className='rounded-lg border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700'>
        Error: {error.message}
      </div>
    );
  }

  if (isPending) {
    return (
      <div className='rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500'>
        Loading products...
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className='rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500'>
        There is no products
      </div>
    );
  }

  return (
    <div className='productsGrid'>
      {data?.data.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
}

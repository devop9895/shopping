import { useFilteredProducts } from '@/features/shopping/hooks/useFilteredProducts';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
        return (
          <Card
            key={product.id}
            variant='outlined'
            className='group h-full overflow-hidden rounded-xl shadow-sm'
          >
            <CardContent className='flex h-full flex-col bg-white p-4 transition-colors group-hover:!bg-slate-200/80'>
              <div className='text-base font-semibold text-slate-900'>{product.name}</div>
              <div className='mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-sm'>
                <div className='font-medium text-sky-700'>$ {product.price}</div>
                <div className='rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600'>
                  {product.brand}
                </div>
              </div>
              <div className='mt-2 text-xs leading-relaxed text-slate-500'>
                Description: {product.description}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

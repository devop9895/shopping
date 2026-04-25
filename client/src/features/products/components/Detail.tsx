import { type SyntheticEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { PATH_ROUTES } from '@/App';
import type { dataBaseTypeProduct } from '@/features/products/schemas';
import { PRODUCT_KEYS } from '@/features/products/constants';
import { deleteProduct } from '@/features/products/api/deleteProduct';

export function Detail() {
  const { state } = useLocation();
  // if (!state) return <div>Missing detail</div>;
  // option 2 if !state we can still {id} = useParams() and get it "declarative"?
  // option 3 getting the info from useQuery cache?

  const { product }: { product: dataBaseTypeProduct } = state;
  useEffect(() => {
    console.log('Same render - New product detail');
    reset();
  }, [product]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('Fake Submit');
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, error, reset } = useMutation({
    mutationKey: PRODUCT_KEYS.DELETE,
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PRODUCT_KEYS.ALL,
      });
      navigate(PATH_ROUTES.PRODUCTS);
    },
  });
  const handleDelete = () => {
    mutate(product.id);
  };

  return (
    <Card className='overflow-hidden rounded-xl border border-slate-200 shadow-sm'>
      <CardContent className='p-4'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <section className='space-y-2 text-sm text-slate-700'>
            <div className='text-base font-semibold text-slate-900'>Name: {product.name}</div>
            <div>Brand: {product.brand}</div>
            <div className='font-medium text-sky-700'>Price: ${product.price}</div>
            <div className='text-slate-500'>Description: {product.description}</div>
          </section>
          <footer className='flex justify-between gap-2 border-t border-slate-200 pt-3'>
            <button>Edit</button>
            <button type='button' onClick={handleDelete} disabled={isPending}>
              Delete
            </button>
          </footer>
          {error?.message ? <span className='text-sm text-red-600'>Error: {error.message}</span> : ''}
        </form>
      </CardContent>
    </Card>
  );
}

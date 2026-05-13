import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DevTool } from '@hookform/devtools';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { PATH_ROUTES } from '@/App';
import { PRODUCT_KEYS } from '@/features/products/constants';
import { updateProduct } from '@/features/products/api/putProduct';
import { ErrorSpan } from '@/components/ErrorSpan';
import { BRAND_LIST, type dataBaseTypeProduct, dataBaseSchemaProduct } from '../schemas';
import { DEV } from '@/config/config';

export function Edit() {
  const { state } = useLocation();
  const { product }: { product: dataBaseTypeProduct } = state;

  const navigate = useNavigate();
  const handleCancel = () => {
    reset();
    navigate(PATH_ROUTES.PRODUCTS);
  };

  const onSubmit = (data: dataBaseTypeProduct) => mutate(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(dataBaseSchemaProduct),
    defaultValues: product,
  });

  const queryClient = useQueryClient();
  const { isPending: isMutatePending, mutate } = useMutation({
    mutationFn: updateProduct,
    onError: (error, _variables) => {
      toast.error(`Error trying to delete product: ${error.message}`);
    },
    onSuccess: () => {
      toast(`${product.name} was updated!`);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.ALL });
    },
  });

  return (
    <Card variant='outlined' className='overflow-hidden rounded-xl border-slate-200 shadow-sm'>
      <CardContent className='p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <section className='space-y-3 [&_label]:block [&_label]:text-xs [&_label]:font-semibold [&_label]:uppercase [&_label]:tracking-wide [&_label]:text-slate-500 [&_input]:mt-1 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-slate-300 [&_input]:bg-white [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm [&_input]:outline-none [&_input]:transition [&_input]:focus:border-sky-500 [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/20 [&_select]:mt-1 [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-slate-300 [&_select]:bg-white [&_select]:px-3 [&_select]:py-2 [&_select]:text-sm [&_select]:outline-none [&_select]:transition [&_select]:focus:border-sky-500 [&_select]:focus:ring-2 [&_select]:focus:ring-sky-500/20'>
            <label>
              Name
              <input {...register('name')} />
              <ErrorSpan errors={errors.name} />
            </label>
            <label>
              Price
              <input {...register('price')} />
              <ErrorSpan errors={errors.price} />
            </label>
            <label>
              Brand
              <select {...register('brand')}>
                {BRAND_LIST.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ErrorSpan errors={errors.brand} />
            </label>
            <label>
              Description
              <input {...register('description')} />
              <ErrorSpan errors={errors.description} />
            </label>
          </section>

          <footer className='flex justify-between gap-2 border-t border-slate-200 pt-3'>
            <button type='submit' disabled={isMutatePending}>
              Save
            </button>
            <button type='button' onClick={handleCancel}>
              Cancel
            </button>
          </footer>
        </form>
        {DEV && <DevTool control={control}></DevTool>}
      </CardContent>
    </Card>
  );
}

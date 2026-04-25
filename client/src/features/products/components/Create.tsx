import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DevTool } from '@hookform/devtools';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { ErrorSpan } from '@/components/ErrorSpan';
import { PATH_ROUTES } from '@/App';
import { createNewProduct } from '@/features/products';
import { PRODUCT_KEYS } from '@/features/products/constants';
import {
  BRAND_LIST,
  type dataBaseTypeProductPagination,
  formSchemaProduct,
  type formTypeProduct,
} from '../schemas';

export function Create() {
  const navigate = useNavigate();
  const handleCancel = () => {
    reset();
    navigate(PATH_ROUTES.PRODUCTS);
  };

  const onSubmit = (data: formTypeProduct) => mutate(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ resolver: zodResolver(formSchemaProduct) });

  const queryClient = useQueryClient();
  const { isPending: isMutatePending, mutate } = useMutation({
    mutationFn: createNewProduct,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: PRODUCT_KEYS.ALL });

      const previousProducts: dataBaseTypeProductPagination | undefined = queryClient.getQueryData(
        PRODUCT_KEYS.ALL,
      );

      queryClient.setQueryData(PRODUCT_KEYS.ALL, (old: dataBaseTypeProductPagination) => {
        const newData = structuredClone(old);
        newData.data = [{ id: crypto.randomUUID(), ...variables }, ...newData.data];
        return newData;
      });

      return previousProducts;
    },
    onError: (error, _variables, onMutateResult) => {
      console.error(error);
      queryClient.setQueryData(PRODUCT_KEYS.ALL, onMutateResult);
    },
    onSuccess: () => {
      reset();
      toast('Product created!');
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
              Create
            </button>
            <button type='button' onClick={handleCancel}>
              Cancel
            </button>
          </footer>
        </form>
        <DevTool control={control}></DevTool>
      </CardContent>
    </Card>
  );
}

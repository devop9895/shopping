import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ErrorSpan } from '@/components/ErrorSpan';
import { PRODUCT_KEYS } from '@/hooks/useProducts';

import { createNewProduct } from '@/features/products';
import { BRAND_LIST, formSchemaProduct, type formTypeProduct } from '../schemas';

export function Create() {
  const navigate = useNavigate();
  const handleCancel = () => {
    reset();
    navigate('/products');
  };

  const onSubmit = (data: formTypeProduct) => mutate(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(formSchemaProduct) });

  const queryClient = useQueryClient();
  const { isPending: isMutatePending, mutate } = useMutation({
    mutationFn: createNewProduct,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: PRODUCT_KEYS.ALL,
      });
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>Load new product</header>

        <section>
          <label className='block'>
            Name
            <input {...register('name')} />
            <ErrorSpan errors={errors.name} />
          </label>
          <label className='block'>
            Price
            <input {...register('price')} />
            <ErrorSpan errors={errors.price} />
          </label>
          <label className='block'>
            Brand
            <select {...register('brand')}>
              {BRAND_LIST.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ErrorSpan errors={errors.brand} />
          </label>
          <label className='block'>
            Description
            <input {...register('description')} />
            <ErrorSpan errors={errors.description} />
          </label>
        </section>

        <footer>
          <button type='submit' disabled={isMutatePending}>
            Create {isMutatePending ? '...' : ''}
          </button>
          <button type='button' onClick={handleCancel}>
            Cancel
          </button>
        </footer>
      </form>
    </>
  );
}

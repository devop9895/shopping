import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { dataBaseTypeProduct } from '@/features/products/schemas';
import { PATH_ROUTES } from '@/App';
import { PRODUCT_KEYS } from '@/features/products/constants';
import { deleteProduct } from '@/features/products/api/deleteProduct';

export function useDeleteProduct({ product }: { product: dataBaseTypeProduct }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: PRODUCT_KEYS.DELETE,
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PRODUCT_KEYS.ALL,
      });
      toast(`Product ${product.name} deleted`);
      navigate(PATH_ROUTES.PRODUCTS);
    },
  });
}

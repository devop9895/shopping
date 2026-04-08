import { GetProducts } from '../products/api';
import { useQuery } from '@tanstack/react-query';

export const PRODUCT_KEYS = {
  ALL: ['products-key'],
} as const;

export default function useProducts() {
  return useQuery({
    queryKey: PRODUCT_KEYS.ALL,
    queryFn: GetProducts,
  });
}

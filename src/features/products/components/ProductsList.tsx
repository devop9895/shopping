import { useAllProducts } from '@/hooks/useAllProducts';
import { ProductsTable } from '@/features/products/components/ProductsTable';

export function ProductsList() {
  const { error, data, isPending } = useAllProducts();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <ProductsTable products={data?.data} />;
}

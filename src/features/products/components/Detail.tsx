import { useLocation } from 'react-router-dom';
import type { dataBaseTypeProduct } from '@/features/products/schemas';

export function Detail() {
  const { state } = useLocation();
  // if (!state) return <div>Missing detail</div>;

  const { product }: { product: dataBaseTypeProduct } = state;

  return (
    <div>
      <div>Name: {product.name}</div>
      <div>Brand: {product.brand}</div>
      <div>Price: ${product.price}</div>
      <div>Description: {product.description}</div>
    </div>
  );
}

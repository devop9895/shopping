import { useProducts } from '@/features/shopping/hooks/useProducts';

export function ProductsGrid() {
  const { error, data, isPending } = useProducts();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <div>Loading products...</div>;
  }

  if (!data?.data?.length) {
    return <div>There is no products</div>;
  }

  return (
    <div className='productsGrid'>
      {data?.data.map((product) => {
        return (
          <div key={product.id} className='border-2'>
            <div>
              {product.name} - {product.brand}
            </div>
            <div>{product.price}</div>
            <div>{product.description}</div>
          </div>
        );
      })}
    </div>
  );
}

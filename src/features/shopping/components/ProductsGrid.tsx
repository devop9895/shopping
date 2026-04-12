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
          <div key={product.id} className='border-2 hover:bg-gray-200'>
            <div>{product.name}</div>
            <div className='flex justify-between'>
              <div>Price: $ {product.price}</div>
              <div>Brand: {product.brand}</div>
            </div>
            <div>Description: {product.description}</div>
          </div>
        );
      })}
    </div>
  );
}

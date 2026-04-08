import useProducts from '../../../hooks/useProducts.tsx';

export default function ProductsGrid() {
  const { error, data, isPending } = useProducts();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <div>Loading products...</div>;
  }

  if (!data?.length) {
    return <div>There is no products</div>;
  }

  return (
    <div className='productsGrid'>
      {data.map((product) => {
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

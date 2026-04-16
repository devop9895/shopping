import { useFilteredProducts } from '@/features/shopping/hooks/useFilteredProducts';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function ProductsGrid() {
  const { error, data, isPending } = useFilteredProducts();

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
          <Card key={product.id} variant='outlined'>
            <CardContent className='hover:bg-gray-200'>
              <div>{product.name}</div>
              <div className='flex justify-between'>
                <div>Price: $ {product.price}</div>
                <div>Brand: {product.brand}</div>
              </div>
              <div>Description: {product.description}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

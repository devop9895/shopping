import { useNavigate } from 'react-router-dom';

import { useAllProducts } from '@/hooks/useAllProducts';
import type { dataBaseTypeProduct } from '@/features/products/schemas';

export function ProductsList() {
  const { error, data, isPending } = useAllProducts();

  const navigate = useNavigate();
  const handleClick = (item: dataBaseTypeProduct) => {
    const state = { product: item };
    navigate(`/products/details/${item.id}`, { state });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {data?.data?.map((item, index) => {
        return (
          <div key={item.id} onClick={() => handleClick(item)}>
            <div>
              {index + 1}: - {item.name} - $({item.price}) - {item.brand} - {item.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { useNavigate } from 'react-router-dom';

import { useProducts } from '@/hooks/useProducts';
import type { dataBaseTypeProduct } from '@/features/products/schemas';

export function ProductsList() {
  const { error, data, isPending } = useProducts();

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
      {data.map((item, index) => {
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

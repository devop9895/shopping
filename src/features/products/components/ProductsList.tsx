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
      <table>
        <thead className='border'>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Desciption</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item) => {
            return (
              <tr
                key={item.id}
                onClick={() => handleClick(item)}
                className='border hover:bg-gray-200'
              >
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.brand}</td>
                <td>{item.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

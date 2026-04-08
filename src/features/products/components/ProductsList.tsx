import { useProducts } from '@/hooks/useProducts';

export function ProductsList() {
  const { error, data, isPending } = useProducts();

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
          <div key={item.id}>
            <div>
              {index + 1}: - {item.name} - $({item.price}) - {item.brand} - {item.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}

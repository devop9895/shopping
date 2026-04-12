import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.map((item) => {
            return (
              <TableRow
                key={item.id}
                onClick={() => handleClick(item)}
                className='hover:bg-gray-200'
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

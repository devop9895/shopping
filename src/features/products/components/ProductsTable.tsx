import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { PATH_ROUTES } from '@/App';
import type { dataBaseTypeProduct, dataBaseTypeProducts } from '@/features/products/schemas';

export function ProductsTable({ products }: { products: dataBaseTypeProducts }) {
  const navigate = useNavigate();
  const handleClick = (item: dataBaseTypeProduct) => {
    const state = { product: item };
    navigate(`${PATH_ROUTES.PRODUCTS_DETAILS}/${item.id}`, { state });
  };

  if (!products?.length) {
    return <div>No products</div>;
  }
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item, index) => {
            return (
              <TableRow
                key={item.id}
                onClick={() => handleClick(item)}
                className='hover:bg-gray-200'
              >
                <TableCell>{index + 1}</TableCell>
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

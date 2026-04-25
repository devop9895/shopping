import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { PATH_ROUTES } from '@/App';
import type { dataBaseTypeProduct, dataBaseTypeProducts } from '@/features/products/schemas';

type ProductsTableProps = {
  products: dataBaseTypeProducts;
  sentinelRef?: (node?: Element | null) => void;
};

export function ProductsTable({ products, sentinelRef }: ProductsTableProps) {
  const navigate = useNavigate();
  const handleClick = (item: dataBaseTypeProduct) => {
    const state = { product: item };
    navigate(`${PATH_ROUTES.PRODUCTS_DETAILS}/${item.id}`, { state });
  };

  if (!products?.length) {
    return (
      <div className='p-4'>
        <div className='rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500'>
          No products
        </div>
      </div>
    );
  }
  return (
    <div className='h-full overflow-auto p-4'>
      <Table className='rounded-xl border border-slate-200 bg-white'>
        <TableHead>
          <TableRow className='bg-slate-50'>
            <TableCell className='font-semibold text-slate-700'>Number</TableCell>
            <TableCell className='font-semibold text-slate-700'>Name</TableCell>
            <TableCell className='font-semibold text-slate-700'>Price</TableCell>
            <TableCell className='font-semibold text-slate-700'>Brand</TableCell>
            <TableCell className='font-semibold text-slate-700'>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item, index) => {
            return (
              <TableRow
                key={item.id}
                onClick={() => handleClick(item)}
                className='cursor-pointer transition-colors hover:bg-slate-100'
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
      {sentinelRef ? (
        <div ref={sentinelRef} className='py-2 text-center text-xs text-slate-400'>
          Loading...
        </div>
      ) : null}
    </div>
  );
}

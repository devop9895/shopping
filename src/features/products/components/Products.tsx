import { Outlet, useNavigate } from 'react-router-dom';

import { ProductsList } from './ProductsList';

export function Products() {
  const navigate = useNavigate();

  return (
    <div className='flex-1 flex gap-12'>
      <div className='w-[70%]'>
        <ProductsList />
      </div>

      <div className='w-[30%] flex flex-col'>
        <button onClick={() => navigate('/products/create')}>New</button>
        <Outlet />
      </div>
    </div>
  );
}

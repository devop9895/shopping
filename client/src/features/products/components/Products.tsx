import { Outlet, useNavigate } from 'react-router-dom';

import { PATH_ROUTES } from '@/App';
import { ProductsList } from './ProductsList';

export function Products() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col-reverse lg:flex-row min-h-0 flex-1 gap-5 lg:gap-7'>
      <div className='min-h-0 lg:w-[70%] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
        <ProductsList />
      </div>
      <div className='lg:w-[30%] lg:min-w-[18rem] max-w-sm rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm'>
        <button className='mb-3 w-full' onClick={() => navigate(PATH_ROUTES.PRODUCTS_CREATE)}>
          New
        </button>
        <Outlet />
      </div>
    </div>
  );
}

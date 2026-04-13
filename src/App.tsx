import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { NotFound } from '@/components/NotFound';

import { Products, Detail, Create, InfinityProducts } from '@/features/products';
import { Shopping } from '@/features/shopping';
import { Boundary } from '@/components/ErrorBoundaries';
import { CartMenu } from '@/components/CartMenu';
import { SettingsMenu } from '@/components/SettingsMenu';

export const PATH_ROUTES = {
  INFINITY_PRODUCTS: '/infinity-products',
  SHOPPING: '/shopping',
  PRODUCTS: '/products',
  DETAILS: 'details',
  PRODUCTS_CREATE: '/products/create',
  CREATE: 'create',
  PRODUCTS_DETAILS: '/products/details',
};

export function App() {
  return (
    <>
      <Toaster />
      <div className='flex flex-col h-dvh w-full p-2'>
        <header className='flex justify-between'>
          <nav>
            <NavLink to={PATH_ROUTES.INFINITY_PRODUCTS} className='p-2'>
              Infinity Products
            </NavLink>
            <NavLink to={PATH_ROUTES.PRODUCTS} className='p-2'>
              Products
            </NavLink>
            <NavLink to={PATH_ROUTES.SHOPPING} className='p-2'>
              Shopping
            </NavLink>
          </nav>
          <div>
            <CartMenu />
            <SettingsMenu />
          </div>
        </header>
        <main className='flex-1 flex flex-col'>
          <Routes>
            <Route path={PATH_ROUTES.INFINITY_PRODUCTS} element={<InfinityProducts />} />

            <Route path='/' element={<Navigate to={PATH_ROUTES.PRODUCTS} replace />} />
            <Route path={PATH_ROUTES.PRODUCTS} element={<Products />}>
              <Route
                path={`${PATH_ROUTES.DETAILS}/:id`}
                element={
                  <Boundary>
                    <Detail />
                  </Boundary>
                }
              />
              <Route
                path={PATH_ROUTES.CREATE}
                element={
                  <Boundary>
                    <Create />
                  </Boundary>
                }
              />
            </Route>

            <Route path={PATH_ROUTES.SHOPPING} element={<Shopping />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

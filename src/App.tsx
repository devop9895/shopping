import { lazy, Suspense } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Boundary } from '@/components/ErrorBoundaries';
import { Loading } from '@/components/Loading';

import { Products, Detail, Create } from '@/features/products';
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

const Shopping = lazy(() =>
  import('@/features/shopping/components/Shopping').then((m) => ({ default: m.Shopping })),
);
const InfinityProducts = lazy(() =>
  import('@/features/products/components/InfinityProducts').then((m) => ({
    default: m.InfinityProducts,
  })),
);
const NotFound = lazy(() => import('@/components/NotFound').then((m) => ({ default: m.NotFound })));

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
          <Boundary>
            <Suspense fallback={<Loading />}>
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
            </Suspense>
          </Boundary>
        </main>
      </div>
    </>
  );
}

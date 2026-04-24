import { lazy, Suspense } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Boundary } from '@/components/ErrorBoundaries';
import { Loading } from '@/components/Loading';
import { NotFound } from '@/components/NotFound';
import { Products } from '@/features/products';
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
const Create = lazy(() =>
  import('@/features/products/components/Create').then((m) => ({ default: m.Create })),
);
const Detail = lazy(() =>
  import('@/features/products/components/Detail').then((m) => ({ default: m.Detail })),
);

export function App() {
  return (
    <>
      <Toaster />
      <div className='flex h-dvh w-full flex-col bg-slate-50 p-3 text-slate-800'>
        <header className='mb-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm'>
          <nav className='flex items-center gap-1'>
            <NavLink
              to={PATH_ROUTES.INFINITY_PRODUCTS}
              className='rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900'
            >
              Infinity Products
            </NavLink>
            <NavLink
              to={PATH_ROUTES.PRODUCTS}
              className='rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900'
            >
              Products
            </NavLink>
            <NavLink
              to={PATH_ROUTES.SHOPPING}
              className='rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900'
            >
              Shopping
            </NavLink>
          </nav>
          <div className='flex items-center gap-1'>
            <CartMenu />
            <SettingsMenu />
          </div>
        </header>
        <main className='flex flex-1 min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm'>
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
                        <Suspense fallback={<Loading />}>
                          <Detail />
                        </Suspense>
                      </Boundary>
                    }
                  />
                  <Route
                    path={PATH_ROUTES.CREATE}
                    element={
                      <Boundary>
                        <Suspense fallback={<Loading />}>
                          <Create />
                        </Suspense>
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

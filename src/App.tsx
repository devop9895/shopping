import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import { NotFound } from '@/components/NotFound';

import { Products, Detail, Create } from '@/features/products';
import { Shopping } from '@/features/shopping';
import { Boundary } from '@/components/ErrorBoundaries';
import { CartMenu } from '@/components/CartMenu';
import { SettingsMenu } from '@/components/SettingsMenu';

export function App() {
  return (
    <div className='flex flex-col h-dvh w-full p-2'>
      <header className='flex justify-between'>
        <nav>
          <NavLink to='/products' className='p-2'>
            Products
          </NavLink>
          <NavLink to='/shopping' className='p-2'>
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
          <Route path='/' element={<Navigate to='/products' replace />} />
          <Route path='/products' element={<Products />}>
            <Route
              path='details/:id'
              element={
                <Boundary>
                  <Detail />
                </Boundary>
              }
            />
            <Route
              path='create'
              element={
                <Boundary>
                  <Create />
                </Boundary>
              }
            />
          </Route>

          <Route path='/shopping' element={<Shopping />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Products from './products';
import Shopping from './shopping';
import NotFound from './not-found';
import Create from './products/components/create';
import Detail from './products/components/detail';

export default function App() {
  const [showCart, setShowCart] = useState<boolean>(false);
  const handleToggleCart = () => {
    setShowCart((prevState) => !prevState);
  };

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
          <button onClick={handleToggleCart}>Cart icon</button>
          <button>Setting-wheel</button>
        </div>
      </header>
      <main className='flex-1 flex flex-col'>
        <Routes>
          <Route path='/' element={<Navigate to='/products' replace />} />
          <Route path='/products' element={<Products />}>
            <Route path='details/:id' element={<Detail />} />
            <Route path='create' element={<Create />} />
          </Route>

          <Route path='/shopping' element={<Shopping showCart={showCart} />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

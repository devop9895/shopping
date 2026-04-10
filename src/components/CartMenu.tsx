import { useLocation } from 'react-router-dom';

import { useCart } from '@/stores/useCart';
import { IconCart } from '@/components/Icons';

export function CartMenu() {
  const { pathname } = useLocation();
  const { toggleShowCart } = useCart();

  if (pathname === '/shopping') {
    return (
      <button onClick={toggleShowCart}>
        <IconCart />
      </button>
    );
  }
}

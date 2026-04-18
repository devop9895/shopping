import { useLocation } from 'react-router-dom';

import { useCart } from '@/stores/useCart';
import { IconCart } from '@/components/Icons';
import { PATH_ROUTES } from '@/App';

export function CartMenu() {
  const { pathname } = useLocation();
  const { toggleShowCart } = useCart();

  if (pathname === PATH_ROUTES.SHOPPING) {
    return (
      <button onClick={toggleShowCart}>
        <IconCart />
      </button>
    );
  }
}

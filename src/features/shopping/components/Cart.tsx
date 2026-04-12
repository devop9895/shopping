import { useCart } from '@/stores/useCart';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function Cart() {
  const { showCart } = useCart();

  if (!showCart) {
    return;
  }
  return (
    <Card className='flex-1 flex flex-col'>
      <CardContent>
        <div>Cart</div>
        <div className='flex-1'>items</div>
        <div>total</div>
      </CardContent>
    </Card>
  );
}

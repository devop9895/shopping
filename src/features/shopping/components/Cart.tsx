import { useCart } from '@/stores/useCart';

export function Cart() {
  const { showCart } = useCart();

  if (!showCart) {
    return;
  }
  return (
    <div className='flex-1 flex flex-col'>
      <div>Cart</div>
      <div className='flex-1'>items</div>
      <div>total</div>
    </div>
  );
}

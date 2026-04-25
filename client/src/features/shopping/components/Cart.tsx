import { useCart } from '@/stores/useCart';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function Cart() {
  const { showCart } = useCart();

  if (!showCart) {
    return;
  }
  return (
    <Card className='flex h-full flex-1 flex-col rounded-none border-0 shadow-none'>
      <CardContent className='flex min-h-0 flex-1 flex-col gap-3 p-4'>
        <div className='border-b border-slate-100 pb-2 text-sm font-semibold text-slate-900'>Cart</div>
        <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-xs text-slate-500'>
          items
        </div>
        <div className='border-t border-slate-100 pt-2 text-sm font-medium text-slate-700'>total</div>
      </CardContent>
    </Card>
  );
}

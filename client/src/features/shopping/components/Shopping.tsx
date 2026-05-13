import { useCart } from '@/stores/useCart';
import { ProductsGrid } from './ProductsGrid';
import { Cart } from './Cart';
import { Pagination } from './Pagination';
import { Filter } from './Filter';

export function Shopping() {
  const { showCart } = useCart();

  return (
    <div className='flex min-h-0 flex-1 gap-5 lg:gap-7'>
      <section
        className={`${showCart ? 'w-[75%]' : 'w-full'} flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm`}
      >
        <header className='border-b border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-5'>
          <Filter />
        </header>
        <section className='flex-1 overflow-y-auto px-4 py-4 sm:px-5'>
          <ProductsGrid />
        </section>
        <footer className='border-t border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-5'>
          <Pagination />
        </footer>
      </section>
      {showCart ? (
        <aside className='w-[25%] min-w-[17rem] max-w-sm shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
          <Cart />
        </aside>
      ) : null}
    </div>
  );
}

import { useCart } from '@/stores/useCart';
import { ProductsGrid } from './ProductsGrid';
import { Cart } from './Cart';
import { Pagination } from './Pagination';
import { Filter } from './Filter';

export function Shopping() {
  const { showCart } = useCart();

  return (
    <div className='flex-1 flex'>
      <section className={`flex flex-col ${showCart ? 'w-[75%]' : 'w-full'}`}>
        <header className='flex'>
          <Filter />
        </header>
        <section className='flex-1'>
          <ProductsGrid />
        </section>
        <footer className='flex justify-between'>
          <Pagination />
        </footer>
      </section>
      {showCart && (
        <div className='w-[25%] flex'>
          <Cart />
        </div>
      )}
    </div>
  );
}

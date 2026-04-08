import Cart from './components/cart';
import ProductsGrid from './components/products-grid';

export default function Shopping({ showCart }: { showCart: boolean }) {
  return (
    <div className='flex-1 flex'>
      <section className={`flex flex-col ${showCart ? 'w-[75%]' : 'w-full'}`}>
        <header className='flex'>
          <input placeholder='search' />
        </header>
        <section className='flex-1'>
          <ProductsGrid />
        </section>
        <footer className='flex justify-between'>
          <label>
            Quantity
            <select>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </label>
          <div>Pagination</div>
          <label>
            Sort By
            <select>
              <option>Name</option>
              <option>price</option>
            </select>
          </label>
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

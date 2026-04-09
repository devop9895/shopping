export function Pagination() {
  return (
    <form>
      <label>
        Quantity
        <select>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </label>
      <div>Pagination MUI</div>
      <label>
        Sort By
        <select>
          <option>Name</option>
          <option>price</option>
        </select>
      </label>
    </form>
  );
}

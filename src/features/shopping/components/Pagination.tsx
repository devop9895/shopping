import { type SyntheticEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MUIPagination from '@mui/material/Pagination';

import { useFilteredProducts } from '@/features/shopping/hooks/useFilteredProducts';
import {
  QUANTITY_OPTIONS,
  SEARCH_PARAM_LIMIT,
  SEARCH_PARAM_PAGE,
  SEARCH_PARAM_SORT,
  SORT_BY_OPTIONS,
} from '@/features/shopping/constants';

export function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  //
  const getInitialQty = (): string => {
    return searchParams.get(SEARCH_PARAM_LIMIT) || QUANTITY_OPTIONS[0];
  };
  const [qty, setQty] = useState<string>(getInitialQty);
  const handleQtyChange = (event: SyntheticEvent) => {
    const { value } = event.target;
    setQty(value);

    searchParams.set(SEARCH_PARAM_LIMIT, value);
    setSearchParams(searchParams);
  };

  //
  const getInitialSortBy = (): string => {
    return searchParams.get(SEARCH_PARAM_SORT) || SORT_BY_OPTIONS[0];
  };
  const [sortBy, setSortBy] = useState(getInitialSortBy);
  const handleSortByChange = (event: SyntheticEvent) => {
    const { value } = event.target;
    setSortBy(value);

    searchParams.set(SEARCH_PARAM_SORT, value);
    setSearchParams(searchParams);
  };

  //
  const { data } = useFilteredProducts();
  const getInitialPage = () => {
    return parseInt(searchParams.get(SEARCH_PARAM_PAGE) || '1');
  };
  const [page, setPage] = useState<number>(getInitialPage());
  const handlePageChange = (_, value: number) => {
    setPage(value);

    searchParams.set(SEARCH_PARAM_PAGE, value.toString());
    setSearchParams(searchParams);
  };

  return (
    <form className='w-full flex justify-between'>
      <label>
        Quantity
        <select value={qty} onChange={handleQtyChange}>
          {QUANTITY_OPTIONS.map((value) => {
            return <option key={value}>{value}</option>;
          })}
        </select>
      </label>
      <div>
        <MUIPagination count={data?.pages} page={page} onChange={handlePageChange} />
      </div>
      <label>
        Sort By
        <select value={sortBy} onChange={handleSortByChange}>
          {SORT_BY_OPTIONS.map((value) => {
            return <option key={value}>{value}</option>;
          })}
        </select>
      </label>
    </form>
  );
}

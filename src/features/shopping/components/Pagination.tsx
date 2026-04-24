import { type ChangeEvent, useState } from 'react';
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
  const handleQtyChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
  const handleSortByChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
  const handlePageChange = (_event: unknown, value: number) => {
    setPage(value);

    searchParams.set(SEARCH_PARAM_PAGE, value.toString());
    setSearchParams(searchParams);
  };

  return (
    <form className='flex w-full flex-wrap items-end justify-between gap-3'>
      <label className='flex min-w-[7rem] flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>
        Quantity
        <select
          className='rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm font-normal text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
          value={qty}
          onChange={handleQtyChange}
        >
          {QUANTITY_OPTIONS.map((value) => {
            return <option key={value}>{value}</option>;
          })}
        </select>
      </label>
      <div>
        <MUIPagination count={data?.pages} page={page} onChange={handlePageChange} />
      </div>
      <label className='flex min-w-[7rem] flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>
        Sort By
        <select
          className='rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm font-normal text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
          value={sortBy}
          onChange={handleSortByChange}
        >
          {SORT_BY_OPTIONS.map((value) => {
            return <option key={value}>{value}</option>;
          })}
        </select>
      </label>
    </form>
  );
}

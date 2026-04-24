import { type SyntheticEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { SEARCH_PARAM_QUERY } from '@/features/shopping/constants';

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  //
  const getInitialQuery = (): string => {
    return searchParams.get(SEARCH_PARAM_QUERY) || '';
  };
  const [query, setQuery] = useState<string>(getInitialQuery);

  const URLUpdate = (value: string) => {
    searchParams.set(SEARCH_PARAM_QUERY, value);
    setSearchParams(searchParams);
  };
  const debouncedURLUpdate = useDebouncedCallback(URLUpdate, 300);
  const handleChange = (event: SyntheticEvent) => {
    setQuery(event.target.value);
    debouncedURLUpdate(event.target.value);
  };

  return (
    <form className='w-full max-w-md'>
      <label className='mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500'>
        Search
      </label>
      <input
        className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
        placeholder='Search products...'
        value={query}
        onChange={handleChange}
      />
    </form>
  );
}

import { type SyntheticEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { SEARCH_PARAM_QUERY } from '@/features/shopping/components/Pagination';

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
  const debouncedURLUpdate = useDebouncedCallback(URLUpdate, 1000);
  const handleChange = (event: SyntheticEvent) => {
    setQuery(event.target.value);
    debouncedURLUpdate(event.target.value);
  };

  return (
    <form>
      <input placeholder='search' value={query} onChange={handleChange} />
    </form>
  );
}

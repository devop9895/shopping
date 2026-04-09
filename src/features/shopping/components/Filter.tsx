import { type SyntheticEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const QUERY_PARAM = 'query';

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialQuery = (): string => {
    return searchParams.get(QUERY_PARAM) || '';
  };
  const [query, setQuery] = useState<string>(getInitialQuery);

  const handleChange = (event: SyntheticEvent) => {
    const { value } = event.target;
    setQuery(value);

    searchParams.set(QUERY_PARAM, value);
    setSearchParams(searchParams);
  };

  return (
    <form>
      <input placeholder='search' value={query} onChange={handleChange} />
    </form>
  );
}

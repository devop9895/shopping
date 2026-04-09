import { type SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QUERY_PARAM = 'query';

export function Filter() {
  const { search } = useLocation();
  const getInitialQuery = (): string => {
    const urlParams = new URLSearchParams(search);
    return urlParams.get(QUERY_PARAM) || '';
  };
  const [query, setQuery] = useState<string>(getInitialQuery);

  const navigate = useNavigate();
  const handleChange = (event: SyntheticEvent) => {
    const { value } = event.target;
    setQuery(value);

    const urlParams = new URLSearchParams(search);
    urlParams.set(QUERY_PARAM, value);

    navigate(`/shopping?${urlParams.toString()}`);
  };

  return (
    <form>
      <input placeholder='search' value={query} onChange={handleChange} />
    </form>
  );
}

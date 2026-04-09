import { useSearchParams } from 'react-router-dom';

import {
  SEARCH_PARAM_LIMIT,
  SEARCH_PARAM_SORT,
  QUANTITY_OPTIONS,
  SORT_BY_OPTIONS,
  SEARCH_PARAM_QUERY,
} from '@/features/shopping/components/Pagination';

export type FilterParams = {
  'name:contains'?: string;
  _sort?: string;
  _page?: string;
  _per_page: string;
};

export function useProductsFilters(): FilterParams {
  const [searchParams] = useSearchParams();

  return {
    'name:contains': searchParams.get(SEARCH_PARAM_QUERY) || '',
    _sort: searchParams.get(SEARCH_PARAM_SORT) || SORT_BY_OPTIONS[0],
    _page: '1',
    _per_page: searchParams.get(SEARCH_PARAM_LIMIT) || QUANTITY_OPTIONS[0],
  };
}

export const filterGetAll = {
  _sort: SORT_BY_OPTIONS[0],
  _page: '1',
  _per_page: '15',
};

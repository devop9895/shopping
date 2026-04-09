import { dataBaseSchemaProductPagination, type dataBaseTypeProductPagination } from '../schemas';
import { SERVER_URL } from '@/config/config.ts';
import type { FilterParams } from '@/features/shopping/hooks/useProductsFilters';

export async function getProducts({
  filters,
}: {
  filters?: FilterParams;
}): Promise<dataBaseTypeProductPagination> {
  const urlSearchParams = new URLSearchParams(filters);
  const url = `${SERVER_URL}/products?${urlSearchParams.toString()}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request error getting products');
      }
      return response.json();
    })
    .then((jsonResponse) => {
      const { success, error, data } = dataBaseSchemaProductPagination.safeParse(jsonResponse);

      if (success) {
        return data;
      }

      throw new Error(error.message);
    });
}

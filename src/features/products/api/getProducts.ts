import { type dataBaseTypeProducts, dataBaseSchemaProducts } from '../schemas';
import { SERVER_URL } from '@/config/config.ts';

export async function getProducts(): Promise<dataBaseTypeProducts> {
  return fetch(`${SERVER_URL}/products`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request error getting products');
      }
      return response.json();
    })
    .then((jsonResponse) => {
      const { success, error, data } = dataBaseSchemaProducts.safeParse(jsonResponse);

      if (success) {
        return data;
      }

      throw new Error(error.message);
    });
}

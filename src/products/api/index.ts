import {
  type formTypeProduct,
  type dataBaseTypeProducts,
  dataBaseSchemaProducts,
} from '../schemas/product.tsx';
import { SERVER_URL } from '../../config/config.ts';

export async function CreateNewProduct(product: formTypeProduct) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return fetch(`${SERVER_URL}/products`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Product not created');
    }
    return data.json();
  });
}

export async function GetProducts(): Promise<dataBaseTypeProducts> {
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

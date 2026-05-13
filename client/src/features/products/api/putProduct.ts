import { type dataBaseTypeProduct } from '../schemas';
import { SERVER_URL } from '@/config/config.ts';

export async function updateProduct(product: dataBaseTypeProduct) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return fetch(`${SERVER_URL}/products/${product.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Product not updated');
    }
    return data.json();
  });
}

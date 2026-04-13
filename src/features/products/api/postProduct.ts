import { type formTypeProduct } from '../schemas';
import { SERVER_URL } from '@/config/config.ts';

export async function createNewProduct(product: formTypeProduct) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return fetch(`${SERVER_URL}//products`, {
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

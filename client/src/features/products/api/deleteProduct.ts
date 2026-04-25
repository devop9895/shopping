import { SERVER_URL } from '@/config/config';

export async function deleteProduct(id: string) {
  await new Promise((resolve) => setTimeout(() => resolve(true), 500));

  return fetch(`${SERVER_URL}/products/${id}`, { method: 'delete' }).then((resp) => {
    if (!resp.ok) {
      throw new Error(`Error trying to delete resource ${id}`);
    }
    return resp.json();
  });
}

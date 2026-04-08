import z from 'zod';

const BRAND_LIST = ['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5'] as const;

const formSchemaProduct = z.object({
  name: z.string().min(3, 'Min length should be at least of 3'),
  price: z.coerce.number('Number is required').gt(0, 'Should me greater than zero'),
  brand: z.enum(BRAND_LIST),
  description: z.string().min(10, 'Description needs to be longer'),
});
type formTypeProduct = z.infer<typeof formSchemaProduct>;

const dataBaseSchemaProduct = formSchemaProduct.extend({
  id: z.string(),
});
const dataBaseSchemaProducts = z.array(dataBaseSchemaProduct);
type dataBaseTypeProducts = z.infer<typeof dataBaseSchemaProducts>;

export { BRAND_LIST, formSchemaProduct, dataBaseSchemaProducts };
export type { formTypeProduct, dataBaseTypeProducts };

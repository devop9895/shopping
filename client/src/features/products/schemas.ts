import z from 'zod';

import { BRAND_LIST } from './Brands';

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
type dataBaseTypeProduct = z.infer<typeof dataBaseSchemaProduct>;
type dataBaseTypeProducts = z.infer<typeof dataBaseSchemaProducts>;

const dataBaseSchemaProductPagination = z.object({
  first: z.coerce.number(),
  prev: z.coerce.number().optional(),
  next: z.coerce.number().optional(),
  last: z.coerce.number(),
  pages: z.coerce.number(),
  items: z.coerce.number(),
  data: dataBaseSchemaProducts,
});
type dataBaseTypeProductPagination = z.infer<typeof dataBaseSchemaProductPagination>;

export {
  BRAND_LIST,
  formSchemaProduct,
  dataBaseSchemaProduct,
  dataBaseSchemaProducts,
  dataBaseSchemaProductPagination,
};
export type {
  formTypeProduct,
  dataBaseTypeProducts,
  dataBaseTypeProduct,
  dataBaseTypeProductPagination,
};

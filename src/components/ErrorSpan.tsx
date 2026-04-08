type FormError = {
  message?: string;
};

export default function ErrorSpan({ errors }: { errors?: FormError }) {
  if (!errors?.message) return '';
  return <div className='text-red-500'>{errors.message}</div>;
}

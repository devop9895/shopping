import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './style.css';
import { App } from './App';
import { DEV } from './config/config';

const app = document.getElementById('app');
if (!app) throw new Error('Failed to find the app element');

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      gcTime: 120 * 1000,
      // refetchInterval: 60 * 1000,
      retry: 1,
    },
  },
});

createRoot(app!).render(
  <QueryClientProvider client={client}>
    {DEV && <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);

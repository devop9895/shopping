import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './style.css';
import { App } from './App';

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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);

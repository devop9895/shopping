import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function Boundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700'>
          Ups, something went wrong
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

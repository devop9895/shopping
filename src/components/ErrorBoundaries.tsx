import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function Boundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary fallback={<div>Ups, something went wrong</div>}>{children}</ErrorBoundary>;
}

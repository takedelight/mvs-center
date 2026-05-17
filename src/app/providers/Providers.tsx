import { ErrorBoundary } from 'react-error-boundary';
import { RouteProvider } from './RouteProvider';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/core/auth';

export const Providers = () => {
  return (
    <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <AuthProvider>
        <RouteProvider />
        <ToastContainer position="bottom-right" />
      </AuthProvider>
    </ErrorBoundary>
  );
};

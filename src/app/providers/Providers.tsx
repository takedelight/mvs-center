import { ErrorBoundary } from 'react-error-boundary';
import { RouteProvider } from './RouteProvider';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/core/auth';
import { BrowserRouter } from 'react-router';

export const Providers = () => {
  return (
    <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <BrowserRouter>
        <AuthProvider>
          <RouteProvider />
          <ToastContainer position="bottom-right" />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

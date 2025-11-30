import { ErrorBoundary } from 'react-error-boundary';
import { RouteProvider } from './RouteProvider';
import { ToastContainer } from 'react-toastify';

export const Providers = () => {
  return (
    <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <RouteProvider />
      <ToastContainer position="bottom-right" />
    </ErrorBoundary>
  );
};


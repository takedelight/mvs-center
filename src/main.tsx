import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
                <App />
            </ErrorBoundary>
        </StrictMode>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
);

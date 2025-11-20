import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { App } from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { RootLayout } from './layout.tsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<RootLayout />}>
                            <Route index element={<App />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ErrorBoundary>
        </StrictMode>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
);


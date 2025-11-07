import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/layout.tsx';
const queryClient = new QueryClient();

const StatsPage = lazy(() =>
    import('./pages/stats/StatsPage.tsx').then((module) => ({ default: module.StatsPage })),
);
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<App />} />
                            <Route path="/stats" element={<StatsPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ErrorBoundary>
        </StrictMode>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
);

import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { App } from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { RootLayout } from './layout.tsx';
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();

const LazySignInPage = lazy(() =>
  import('@/pages/SignIn').then((module) => ({ default: module.SignInPage })),
);

const LazyNotFoundPage = lazy(() =>
  import('@/app/not-found.tsx').then((module) => ({ default: module.NotFoundPage })),
);

const LazyProfilePage = lazy(() =>
  import('@/pages/Profile').then((module) => ({ default: module.ProfilePage })),
);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<App />} />
              <Route path="*" element={<LazyNotFoundPage />} />\
              <Route path="/signin" element={<LazySignInPage />} />
              <Route path="/profile" element={<LazyProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" />
      </ErrorBoundary>
    </StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);

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
import { ProfileLayout } from './profile/layout.tsx';
import { AdminLayout } from './admin/layout.tsx';
export const queryClient = new QueryClient();

const LazySignInPage = lazy(() =>
  import('@/pages/SignIn').then((module) => ({ default: module.SignInPage })),
);

const LazyNotFoundPage = lazy(() =>
  import('@/app/not-found.tsx').then((module) => ({ default: module.NotFoundPage })),
);

const LazyProfilePage = lazy(() =>
  import('@/pages/Profile').then((module) => ({ default: module.ProfilePage })),
);

const LazyStatementsPage = lazy(() =>
  import('@/pages/Statements').then((module) => ({ default: module.StatementsPage })),
);
const LazySettingsPage = lazy(() =>
  import('@/pages/Settings').then((module) => ({ default: module.SettingsPage })),
);

const LazyAllUsersPage = lazy(() =>
  import('@/pages/Admin').then((module) => ({ default: module.AllUsersPage })),
);

const LazyAllStatementsPage = lazy(() =>
  import('@/pages/Admin').then((module) => ({ default: module.AllStatementsPage })),
);

const LazyAdminSettingsPage = lazy(() =>
  import('@/pages/Admin').then((module) => ({ default: module.SettingsPage })),
);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<App />} />

              <Route path="/signin" element={<LazySignInPage />} />

              <Route path="/profile" element={<ProfileLayout />}>
                <Route index element={<LazyProfilePage />} />
                <Route path="statements" element={<LazyStatementsPage />} />
                <Route path="settings" element={<LazySettingsPage />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route path="users" element={<LazyAllUsersPage />} />
                <Route path="statements" element={<LazyAllStatementsPage />} />
                <Route path="settings" element={<LazyAdminSettingsPage />} />
              </Route>

              <Route path="*" element={<LazyNotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" />
      </ErrorBoundary>
    </StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);

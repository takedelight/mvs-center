import { BrowserRouter, Route, Routes } from 'react-router';
import { RootLayout } from '../layout';
import { LazyLoginPage } from '@/pages/login';
import { LazyProfilePage } from '@/pages/profile/root';
import { LazyHomePage } from '@/pages/home';
import { LazyRegisterPage } from '@/pages/register';
import { LazyUserTicketsPage } from '@/pages/profile/tickets';
import { LazyAdminSettingsPage } from '@/pages/admin/settings';
import { LazyAdminUsersPage } from '@/pages/admin/users';

export const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<LazyHomePage />} />

          <Route path="/signin" element={<LazyLoginPage />} />
          <Route path="/register" element={<LazyRegisterPage />} />

          <Route path="/profile">
            <Route index element={<LazyProfilePage />} />
            <Route path="tickets" element={<LazyUserTicketsPage />} />
          </Route>

          <Route path="/admin">
            <Route path="users" element={<LazyAdminUsersPage />} />
            {/*<Route path="comparison" element={<LazyAdminComparisonPage />} />
            <Route
              path="statements"
              element={
                <FilterProvider>
                  <LazyAdminStatementsPage />
                </FilterProvider>
              }
            />*/}
            <Route path="settings" element={<LazyAdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

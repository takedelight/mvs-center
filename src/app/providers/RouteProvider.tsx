import { BrowserRouter, Route, Routes } from 'react-router';
import { RootLayout } from '../layout';
import { LazyLoginPage } from '@/pages/login';
import { ProfileLayout } from '../profile/layout';
import { LazyProfilePage } from '@/pages/profile/root';
import { LazyProfileSettings } from '../profile/settings/page';
import { AdminLayout } from '../admin/layout';
import { LazyAdminUsersPage } from '../admin/users/page';
import { LazyAdminStatementsPage } from '../admin/statements/page';
import { LazyAdminSettingsPage } from '../admin/settings/page';
import { LazyAllUserStatementsPage } from '../profile/statements/page';
import { FilterProvider } from './FilterProvider';
import { LazyAdminComparisonPage } from '../admin/comparison/page';
import { LazyHomePage } from '@/pages/home';
import { LazyRegisterPage } from '@/pages/register';

export const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<LazyHomePage />} />

          <Route path="/signin" element={<LazyLoginPage />} />
          <Route path="/register" element={<LazyRegisterPage />} />

          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<LazyProfilePage />} />
            {/*<Route path="settings" element={<LazyProfileSettings />} />
            <Route path="statements" element={<LazyAllUserStatementsPage />} />*/}
          </Route>

          {/*<Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<LazyAdminUsersPage />} />
            <Route path="comparison" element={<LazyAdminComparisonPage />} />
            <Route
              path="statements"
              element={
                <FilterProvider>
                  <LazyAdminStatementsPage />
                </FilterProvider>
              }
            />
            <Route path="settings" element={<LazyAdminSettingsPage />} />
          </Route>*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

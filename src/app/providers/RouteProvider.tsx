import { BrowserRouter, Route, Routes } from 'react-router';
import { LazyHomePage } from '../page';
import { RootLayout } from '../layout';
import { LazyLoginPage } from '../login/LoginPage';
import { ProfileLayout } from '../profile/layout';
import { LazyProfilePage } from '../profile/profile-page';
import { LazyProfileSettings } from '../profile/settings/SettingsPage';
import { AdminLayout } from '../admin/layout';
import { LazyAdminUsersPage } from '../admin/users/page';
import { LazyAdminStatementsPage } from '../admin/statements/page';
import { LazyAdminSettingsPage } from '../admin/settings/page';
import { LazyNotFoundPage } from '../not-found';

export const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<LazyHomePage />} />

          <Route path="/signin" element={<LazyLoginPage />} />

          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<LazyProfilePage />} />
            <Route path="settings" element={<LazyProfileSettings />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<LazyAdminUsersPage />} />
            <Route path="statements" element={<LazyAdminStatementsPage />} />
            <Route path="settings" element={<LazyAdminSettingsPage />} />
          </Route>

          <Route path="*" element={<LazyNotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


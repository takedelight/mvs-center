import { Route, Routes } from 'react-router';
import { RootLayout } from '../layout';
import { LazyLoginPage } from '@/pages/login';
import { LazyProfilePage } from '@/pages/profile/root';
import { LazyHomePage } from '@/pages/home';
import { LazyRegisterPage } from '@/pages/register';
import { LazyUserTicketsPage } from '@/pages/profile/tickets';
import { LazyAdminSettingsPage } from '@/pages/admin/settings';
import { LazyAdminUsersPage } from '@/pages/admin/users';
import { LazyAdminStatementsPage } from '../admin/statements/page';
import { LazyAdminComparisonPage } from '../admin/comparison/page';
import { LazyCarsPage } from '@/pages/profile/car';

export const RouteProvider = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<LazyHomePage />} />

        <Route path="/signin" element={<LazyLoginPage />} />
        <Route path="/register" element={<LazyRegisterPage />} />

        <Route path="/profile">
          <Route index element={<LazyProfilePage />} />
          <Route path="tickets" element={<LazyUserTicketsPage />} />
          <Route path="car" element={<LazyCarsPage />} />
        </Route>

        <Route path="/admin">
          <Route path="users" element={<LazyAdminUsersPage />} />
          <Route path="comparison" element={<LazyAdminComparisonPage />} />
          <Route path="tickets" element={<LazyAdminStatementsPage />} />
          <Route path="settings" element={<LazyAdminSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

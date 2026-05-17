import { lazy } from 'react';

import { GenerateStatements } from '@/features/generate-statements/ui/GenerateStatements';
import { DeleteAllStatements } from '@/features/delete-all-statements';
import { useAuth } from '@/core/auth';

const AdminSettingsPage = () => {
  const {
    value: { user },
    actions: { refetchProfile },
  } = useAuth();

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Налаштування</h1>

      <GenerateStatements userId={user?.id} refetch={refetchProfile} />

      <DeleteAllStatements refetch={refetchProfile} />
    </>
  );
};

export const LazyAdminSettingsPage = lazy(() => Promise.resolve({ default: AdminSettingsPage }));

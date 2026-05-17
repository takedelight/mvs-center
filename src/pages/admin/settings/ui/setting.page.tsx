import { lazy } from 'react';

import { GenerateStatements } from '@/features/generate-statements/ui/GenerateStatements';
import { DeleteAllStatements } from '@/features/delete-all-statements';

const AdminSettingsPage = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Налаштування</h1>

      <GenerateStatements />

      <DeleteAllStatements />
    </>
  );
};

export const LazyAdminSettingsPage = lazy(() => Promise.resolve({ default: AdminSettingsPage }));

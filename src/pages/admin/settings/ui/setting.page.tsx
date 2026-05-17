import { lazy } from 'react';

import { GenerateStatements } from '@/features/generate-statements/ui/GenerateStatements';
import { DeleteAllStatements } from '@/features/delete-all-statements';

const AdminSettingsPage = () => {
  return (
    <>
      <GenerateStatements />

      <DeleteAllStatements />
    </>
  );
};

export const LazyAdminSettingsPage = lazy(() => Promise.resolve({ default: AdminSettingsPage }));

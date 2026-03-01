import { lazy } from 'react';
import { useOutletContext } from 'react-router';
import type { User } from '@/entity/user';
import { GenerateStatements } from '@/features/generate-statements/ui/GenerateStatements';
import { DeleteAllStatements } from '@/features/delete-all-statements';

const AdminSettingsPage = () => {
  const [user, refetch] = useOutletContext<[User, refetch: () => void]>();

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Налаштування</h1>

      <GenerateStatements userId={user.id} refetch={refetch} />

      <DeleteAllStatements refetch={refetch} />
    </>
  );
};

export const LazyAdminSettingsPage = lazy(() => Promise.resolve({ default: AdminSettingsPage }));

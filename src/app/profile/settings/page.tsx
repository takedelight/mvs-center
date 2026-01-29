import type { User } from '@/entity/user';
import { DeleteProfile } from '@/features/delete-profile';
import { lazy } from 'react';
import { useOutletContext } from 'react-router';

const SettingsPage = () => {
  const [user, refetch] = useOutletContext<[User, refetch: () => void]>();

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Налаштування</h1>

      <DeleteProfile userId={user.id} refetch={refetch} />
    </>
  );
};

export const LazyProfileSettings = lazy(() => Promise.resolve({ default: SettingsPage }));

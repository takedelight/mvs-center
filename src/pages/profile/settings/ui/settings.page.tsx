import { DeleteProfile } from '@/features/delete-profile';
import { lazy } from 'react';

const SettingsPage = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Налаштування</h1>

      <DeleteProfile />
    </>
  );
};

export const LazyProfileSettings = lazy(() => Promise.resolve({ default: SettingsPage }));

import { UpdateForm } from '@/features/update-profile';

import { lazy } from 'react';

const ProfilePage = () => {
  return (
    <>
      <div className="mt-5 border p-2 rounded-md">
        <h2 className="font-semibold">Особисті дані:</h2>

        <UpdateForm />
      </div>
    </>
  );
};

export const LazyProfilePage = lazy(() => Promise.resolve({ default: ProfilePage }));

import { UpdateForm } from '@/features/update-profile';

import { lazy } from 'react';

const ProfilePage = () => {
  return (
    <>
      <div className="mt-3 border p-2 rounded-md">
        <UpdateForm />
      </div>
    </>
  );
};

export const LazyProfilePage = lazy(() => Promise.resolve({ default: ProfilePage }));

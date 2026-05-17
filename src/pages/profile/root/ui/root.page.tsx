import { useAuth } from '@/core/auth';
import { UpdateForm } from '@/features/update-profile';

import { lazy, useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProfilePage = () => {
  const {
    actions: { refetchProfile },
    value: { user },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/signin');
  }, [navigate, user]);

  if (!user) return null;

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Профіль</h1>

      <div className="mt-5 border p-2 rounded-md">
        <h2 className="font-semibold">Особисті дані:</h2>

        <UpdateForm user={user} refetch={refetchProfile} />
      </div>
    </>
  );
};

export const LazyProfilePage = lazy(() => Promise.resolve({ default: ProfilePage }));

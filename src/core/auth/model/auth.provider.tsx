import type { User } from '@/entity/user';
import { AuthContext } from './auth.context';
import { api } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { refetch: refetchProfile, isPending } = useQuery<User>({
    queryKey: ['profile'],
    refetchOnWindowFocus: false,
    gcTime: 0,
    retry: false,

    queryFn: async () => {
      const data = await api.get('/user/me').then((data) => data.data);
      setUser(data);

      return data;
    },
  });

  const login = () => {};
  const register = () => {};
  const logout = () => {};

  const values = useMemo(
    () => ({
      value: {
        user,
        isAuthenticated: !!user,
        isPending,
      },
      actions: {
        login,
        register,
        refetchProfile,
        logout,
      },
    }),
    [user],
  );

  return <AuthContext value={values}>{children}</AuthContext>;
};

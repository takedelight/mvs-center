import type { User } from '@/entity/user';
import { AuthContext } from './auth.context';
import { api } from '@/shared/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: user,
    refetch: refetchProfile,
    isPending,
  } = useQuery<User>({
    queryKey: ['profile'],
    refetchOnWindowFocus: false,
    gcTime: 0,
    retry: false,
    queryFn: async () => {
      return api.get('/user/me').then((res) => res.data);
    },
  });

  const { mutate: handleLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await api.post('auth/logout', {}, { withCredentials: true });
    },
    onSuccess: async () => {
      toast.success('Ви вийшли зі свого облікового запису.');

      await queryClient.cancelQueries();
      queryClient.clear();

      navigate('/signin');
    },
    onError: () => {
      toast.error('Помилка при виході');
    },
  });

  const login = () => {};
  const register = () => {};

  const values = useMemo(
    () => ({
      value: {
        user: user ?? null,
        isAuthenticated: !!user,
        isPending,
      },
      actions: {
        login,
        register,
        refetchProfile,
        logout: handleLogout,
      },
    }),
    [user, isPending, handleLogout],
  );

  return <AuthContext value={values}>{children}</AuthContext>;
};

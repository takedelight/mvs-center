import { api } from '@/shared/api';
import { Button } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { LogOut as LogOutIcon } from 'lucide-react';

export const LogOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await api.post('auth/logout', {}, { withCredentials: true });
    },
    onSuccess: async () => {
      toast.success('Ви вийшли зі свого облікового запису.');

      queryClient.setQueryData(['profile'], null);

      navigate('/');
    },
    onError: () => {
      toast.error('Помилка при виході');
    },
  });

  return (
    <Button
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      variant="ghost"
      className="w-full text-lg text-red-500 mt-auto hover:text-red-500 justify-normal rounded-none"
    >
      <LogOutIcon /> Вийти
    </Button>
  );
};

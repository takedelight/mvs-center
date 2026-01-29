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

      await queryClient.cancelQueries();
      queryClient.clear();

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
      className="mt-auto w-full justify-start gap-2 rounded-none p-4 text-lg text-red-500 hover:bg-red-50 hover:text-red-600"
    >
      <LogOutIcon size={20} />
      Вийти
    </Button>
  );
};

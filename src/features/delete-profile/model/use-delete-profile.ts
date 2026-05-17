import { useAuth } from '@/core/auth';
import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useDeleteProfile = () => {
  const {
    value: { user },
    actions: { refetchProfile },
  } = useAuth();

  const navigate = useNavigate();

  const deleteProfileMutation = useMutation({
    mutationKey: ['deleteProfile'],
    mutationFn: async () => {
      await api.delete(`/user/delete/${user?.id}`);
    },
    onSuccess: async () => {
      refetchProfile();
      toast.success('Ваш акаунт видалено.');
      navigate('/');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
  });

  return { deleteProfileMutation };
};

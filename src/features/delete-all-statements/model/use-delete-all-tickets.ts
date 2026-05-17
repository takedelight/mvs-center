import { useAuth } from '@/core/auth';
import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useDeleteAllTickets = () => {
  const {
    actions: { refetchProfile },
  } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteAllTicketsMutation = useMutation({
    mutationKey: ['deleteAllTickets'],
    mutationFn: async () => {
      await api.delete('/ticket');
    },
    onSuccess: () => {
      toast.success('Всі заяви видалено');
      setIsDeleteDialogOpen(false);
      refetchProfile();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
  });

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deleteAllTicketsMutation,
  };
};

import { api } from '@/shared/api';
import { ConfirmDialog } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

interface Props {
  refetch: () => void;
}

export const DeleteUsersDialog = (props: Props) => {
  const deleteAllUsersMutation = useMutation({
    mutationKey: ['deleteAllUsers'],
    mutationFn: async () => {
      await api.delete('/user/deleteAll');
    },
    onSuccess: () => {
      props.refetch();
    },
    onError: (error) => {
      if (isAxiosError(error)) toast.error(error.message);
    },
  });

  return (
    <ConfirmDialog
      title={'Ви впевненні, що хочете видалити всіх користувачів ?'}
      buttonText="Видалити"
      onConfirm={() => deleteAllUsersMutation.mutate()}
      disabled={deleteAllUsersMutation.isPending}
    />
  );
};


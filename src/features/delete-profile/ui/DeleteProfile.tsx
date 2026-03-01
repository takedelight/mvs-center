import { api } from '@/shared/api';
import { ConfirmDialog } from '@/shared/ui/confirm-dialog';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

interface Props {
  userId: string;
  refetch: () => void;
}

export const DeleteProfile = ({ refetch, userId }: Props) => {
  const navigate = useNavigate();

  const deleteProfileMutation = useMutation({
    mutationKey: ['deleteProfile'],
    mutationFn: async () => {
      await api.delete(`/user/delete/${userId}`);
    },
    onSuccess: async () => {
      await refetch();
      toast.success('Ваш акаунт видалено.');
      navigate('/');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="mt-5 border p-2 rounded-md">
      <h2 className="font-semibold">Видалити акаунт</h2>

      <div className="flex mt-2 gap-2 ">
        <ConfirmDialog
          title="Ви впевненні, що хочете видалити акаунт?"
          onConfirm={() => deleteProfileMutation.mutate()}
          disabled={deleteProfileMutation.isPending}
          buttonText={'Видалити'}
        />
      </div>
    </div>
  );
};

import { api } from '@/shared/api';
import { Button, Spinner } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface Props {
  ids: string[];
  refetch: () => void;
}

export const DeleteButton = ({ ids, refetch }: Props) => {
  const deleteUsersMutation = useMutation({
    mutationFn: (ids: string[]) =>
      api.delete('/user/delete', {
        data: ids,
      }),
    onSuccess: () => {
      refetch();
      toast.success('Користувачів успішно видалено.');
    },
  });

  return (
    <Button
      className="transition-all ease-in-out duration-150 text-red-400 hover:text-red-500"
      variant="ghost"
      onClick={() => deleteUsersMutation.mutate(ids)}
      disabled={ids.length === 0}
    >
      {deleteUsersMutation.isPending ? <Spinner className="text-ted-500" /> : <Trash2 />}
    </Button>
  );
};


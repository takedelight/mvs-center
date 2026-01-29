import { api } from '@/shared/api';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  refetch: () => void;
}

export const DeleteAllStatements = ({ refetch }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteAllTicketsMutation = useMutation({
    mutationKey: ['deleteAllTickets'],
    mutationFn: async () => {
      await api.delete('/ticket');
    },
    onSuccess: () => {
      toast.success('Всі заяви видалено');
      setIsDeleteDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="mt-5 border rounded-md">
      <div className="w-[340px] p-2">
        <h2 className="font-semibold">Видалити всі заяви</h2>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="mt-2 w-full">
              Видалити всі заяви
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ви впевнені?</DialogTitle>
              <DialogDescription>
                Ця дія незворотна. Це призведе до видалення всіх заяв із системи.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Скасувати</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={() => deleteAllTicketsMutation.mutate()}
                disabled={deleteAllTicketsMutation.isPending}
              >
                {deleteAllTicketsMutation.isPending ? <Spinner /> : 'Так, видалити'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

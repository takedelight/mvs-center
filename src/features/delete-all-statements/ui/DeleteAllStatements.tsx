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

import { useDeleteAllTickets } from '../model/use-delete-all-tickets';

export const DeleteAllStatements = () => {
  const { deleteAllTicketsMutation, isDeleteDialogOpen, setIsDeleteDialogOpen } =
    useDeleteAllTickets();

  return (  
    <div className="mt-5 border rounded-md">
      <div className="w-85 p-2">
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

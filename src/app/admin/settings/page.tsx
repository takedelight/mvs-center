import { api } from '@/shared/api';
import { Button, Dialog, DialogTrigger, Input, Spinner } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { lazy, useEffect, useState, type ChangeEvent } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'react-toastify';
import type { User } from '@/entity/user';

const AdminSettingsPage = () => {
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState({
    tickets: 10,
    users: 10,
  });
  const [user, refetch] = useOutletContext<[User, refetch: () => void]>();

  useEffect(() => {
    if (user) {
      setId(user.id);
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setQuantity((prev) => ({ ...prev, [name]: typeof value !== 'number' ? 0 : Number(value) }));
  };

  const generateTicketsMutation = useMutation({
    mutationKey: ['generateTickets'],
    mutationFn: async () => {
      const response = await api.post(`/ticket/generate/${id}/${quantity.tickets}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Заяви успішно згенеровано');
      refetch();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Налаштування</h1>

      <div className="mt-5 border rounded-md">
        <div className="w-[550px]  p-2 ">
          <h2 className="font-semibold">Згенерувати заяви</h2>

          <div className="flex mt-2 gap-2 items-end">
            <label className="flex flex-col w-[320px]">
              <span className="text-sm">Введіть id користувача</span>
              <Input value={id} onChange={(e) => setId(e.target.value)} />
            </label>
            <label className="flex flex-col w-[200px]">
              <span className="text-sm">Введіть кількість заяв</span>
              <Input name="tickets" value={quantity.tickets} onChange={handleChange} />
            </label>
          </div>
          <Button
            disabled={generateTicketsMutation.isPending}
            className="mt-3 w-full"
            onClick={() => generateTicketsMutation.mutate()}
          >
            {generateTicketsMutation.isPending ? (
              <span className="flex items-center">
                <Spinner /> Згенерувати
              </span>
            ) : (
              <span>Згенерувати</span>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-5 border rounded-md">
        <div className="w-[340px]  p-2 ">
          <h2 className="font-semibold">Видалити всіх заяви</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="mt-2">
                Видалити
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export const LazyAdminSettingsPage = lazy(() => Promise.resolve({ default: AdminSettingsPage }));

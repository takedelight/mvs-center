import { api } from '@/shared/api';
import {
  Button,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/shared/ui';
import type { User } from '@/widgets/header/ui/header';
import { isAxiosError } from 'axios';
import { lazy, useState, type ChangeEvent } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const [quantity, setQuantity] = useState(10);
  const [isOpen, setOpen] = useState(false);

  const [user, refetch] = useOutletContext<[User, refetch: () => void]>();

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) return;

    setQuantity(value === '' ? 0 : Number(value));
  };

  const handleGenerate = async () => {
    try {
      await api.post(`/ticket/generate/${user.id}/${quantity}`);

      toast.success('Заяви успішно згенеровано');

      refetch();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete('/user/delete');
      localStorage.removeItem('access_token');
      navigate('/');
      toast.success('Ваш акаунт видалено.');
      refetch();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Налаштування</h1>

      <div className="mt-5 border p-2 rounded-md">
        <h2 className="font-semibold">Згенерувати заяви</h2>

        <div className="flex mt-2 gap-2 items-end">
          <label className="flex flex-col w-[200px]">
            <span className="text-sm">Введіть кількість заяв</span>
            <Input value={quantity} onChange={handleChange} />
          </label>

          <Button onClick={handleGenerate}>Згенерувати</Button>
        </div>
      </div>

      <div className="mt-5 border p-2 rounded-md">
        <h2 className="font-semibold">Видалити акаунт</h2>

        <div className="flex mt-2 gap-2 ">
          <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Видалити</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ви впевненні, що хочете видалити акаунт?</DialogTitle>
              </DialogHeader>

              <div className="flex justify-end items-center gap-1">
                <Button onClick={() => setOpen(false)} variant="ghost">
                  Відмінити
                </Button>
                <Button onClick={handleDelete} variant="destructive">
                  Видалити
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export const LazyProfileSettings = lazy(() => Promise.resolve({ default: SettingsPage }));


import type { User } from '@/entity/user';
import { api } from '@/shared/api';
import { Button, Input, ConfirmDialog, Spinner } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { lazy, useState, type ChangeEvent } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const [quantity, setQuantity] = useState(10);

  const [user, refetch] = useOutletContext<[User, refetch: () => void]>();

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) return;

    setQuantity(value === '' ? 0 : Number(value));
  };

  const generateStatementsMutation = useMutation({
    mutationKey: ['generateStatements'],
    mutationFn: async () => {
      await api.post(`/ticket/generate/${user.id}/${quantity}`);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success('Заяви успішно згенеровано');

      refetch();
    },
  });

  const deleteProfileMutation = useMutation({
    mutationKey: ['deleteProfile'],
    mutationFn: async () => {
      await api.delete(`/user/delete/${user.id}`);
    },
    onSuccess: () => {
      localStorage.removeItem('access_token');
      navigate('/');
      toast.success('Ваш акаунт видалено.');
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

      <div className="mt-5 border p-2 rounded-md">
        <h2 className="font-semibold">Згенерувати заяви</h2>

        <div className="flex mt-2 gap-2 items-end">
          <label className="flex flex-col w-[200px]">
            <span className="text-sm">Введіть кількість заяв</span>
            <Input value={quantity} onChange={handleChange} />
          </label>

          <Button
            onClick={() => generateStatementsMutation.mutate()}
            disabled={generateStatementsMutation.isPending}
          >
            {generateStatementsMutation.isPending ? (
              <span className="flex items-center gap-1">
                <Spinner />
                Генерування
              </span>
            ) : (
              <span>Згенерувати</span>
            )}
          </Button>
        </div>
      </div>

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
    </>
  );
};

export const LazyProfileSettings = lazy(() => Promise.resolve({ default: SettingsPage }));

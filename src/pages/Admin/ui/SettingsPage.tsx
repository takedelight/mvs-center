import { api } from '@/shared/api';
import { Button, Input } from '@/shared/ui';
import type { User } from '@/widgets/header/ui/header';
import { isAxiosError } from 'axios';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

export const SettingsPage = () => {
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState(10);

  const [user, refetch] = useOutletContext<[User, refetch: () => void]>();

  useEffect(() => {
    if (user) {
      setId(user.id);
    }
  }, [user]);

  console.log(user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) return;

    setQuantity(value === '' ? 0 : Number(value));
  };

  const handleGenerate = async () => {
    try {
      await api.post(`/ticket/generate/${id}/${quantity}`);

      toast.success('Заяви успішно згенеровано');

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
              <Input value={quantity} onChange={handleChange} />
            </label>
          </div>
          <Button className="mt-3 w-full" onClick={handleGenerate}>
            Згенерувати
          </Button>
        </div>
      </div>
    </>
  );
};


import { api } from '@/shared/api';
import { Button, Input } from '@/shared/ui';
import { isAxiosError } from 'axios';
import { useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

export const SettingsPage = () => {
  const [quantity, setQuantity] = useState(10);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) return;

    setQuantity(value === '' ? 0 : Number(value));
  };

  const handleGenerate = async () => {
    try {
      await api.post(`/ticket/generate/${quantity}}`);

      toast.success('Заяви успішно згенеровано');
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
    </>
  );
};


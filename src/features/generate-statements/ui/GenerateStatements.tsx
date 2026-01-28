import { api } from '@/shared/api';
import { Button, Input, Spinner } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

interface Props {
  userId: string;
  quantity?: number;
}

export const GenerateStatements = ({ userId }: Props) => {
  const [quantity, setQuantity] = useState(10);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) return;

    setQuantity(value === '' ? 0 : Number(value));
  };

  const generateStatementsMutation = useMutation({
    mutationKey: ['generateStatements'],
    mutationFn: async () => {
      await api.post(`/ticket/generate/${userId}/${quantity}`);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success('Заяви успішно згенеровано');
    },
  });

  return (
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
  );
};

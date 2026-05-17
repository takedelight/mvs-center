import { useAuth } from '@/core/auth';
import { api } from '@/shared/api';
import { Button, Input, Spinner } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

export const GenerateStatements = () => {
  const {
    value: { user },
    actions: { refetchProfile },
  } = useAuth();

  const [quantity, setQuantity] = useState<number | ''>(10);
  const [id, setId] = useState('');

  useEffect(() => {
    setId(user?.id || '');
  }, [user]);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === '') {
      setQuantity('');
      return;
    }

    if (/^\d*$/.test(value)) {
      setQuantity(Number(value));
    }
  };

  const generateTicketsMutation = useMutation({
    mutationKey: ['generateTickets'],
    mutationFn: async () => {
      const qty = quantity === '' ? 0 : quantity;
      const response = await api.post(`/mock/tickets/generate/${id}/${qty}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Заяви успішно згенеровано');
      refetchProfile();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      }
    },
  });

  return (
    <div className="mt-5 border rounded-md">
      <div className="w-138 p-2">
        <h2 className="font-semibold">Згенерувати заяви</h2>

        <div className="flex mt-2 gap-2 items-end">
          <label className="flex flex-col w-[320px]">
            <span className="text-sm">Введіть id користувача</span>
            <Input value={id} onChange={(e) => setId(e.target.value)} />
          </label>
          <label className="flex flex-col w-50">
            <span className="text-sm">Введіть кількість заяв</span>
            <Input
              name="tickets"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="0"
            />
          </label>
        </div>
        <Button
          disabled={generateTicketsMutation.isPending || !id || quantity === '' || quantity === 0}
          className="mt-3 w-full"
          onClick={() => generateTicketsMutation.mutate()}
        >
          {generateTicketsMutation.isPending ? (
            <span className="flex items-center gap-2">
              <Spinner /> Згенерувати
            </span>
          ) : (
            <span>Згенерувати</span>
          )}
        </Button>
      </div>
    </div>
  );
};

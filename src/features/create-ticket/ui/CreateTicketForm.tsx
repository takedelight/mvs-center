import type { User } from '@/entity/user/model/user.type';
import { api } from '@/shared/api';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

const APPLICATION_TYPES = [
  'Реєстрація авто',
  'Перереєстрація авто',
  'Зняття з обліку',
  'Отримання номерів',
  'Видача дубліката техпаспорта',
  'Заміна водійського посвідчення',
  'Отримання довідки про технічний стан',
  'Заміна номерних знаків',
];

export const CreateTicketForm = () => {
  const [user] = useOutletContext<[User, refetch: () => void]>();

  const [selectedType, setSelectedType] = useState<string>('');

  const [userInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const createStatementMutation = useMutation({
    mutationKey: ['create-statement'],
    mutationFn: async () => {
      await api.post('/ticket', { type: selectedType });
    },
    onSuccess: async () => {
      toast.success('Заяву створено!');

      setSelectedType('');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <Card className="w-150 p-2">
        <CardHeader className="p-0">
          <h1 className="text-xl font-bold">Подача заявки</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex gap-5">
              <div className="w-full">
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                  Ім'я
                </label>
                <Input
                  id="firstName"
                  value={userInfo.firstName}
                  disabled
                  placeholder="John"
                  type="text"
                  name="firstName"
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                  Прізвище
                </label>
                <Input
                  id="lastName"
                  value={userInfo.lastName}
                  disabled
                  placeholder="Doe"
                  type="text"
                  name="lastName"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                value={userInfo.email}
                disabled
                placeholder="JohnDoe@example.com"
                type="email"
                name="email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Тип заяви</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Оберіть тип послуги" />
                </SelectTrigger>
                <SelectContent>
                  {APPLICATION_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              disabled={!selectedType || createStatementMutation.isPending}
              className="mt-2"
              onClick={() => createStatementMutation.mutate()}
            >
              {createStatementMutation.isPending ? (
                <span className="flex gap-2 items-center">
                  <Spinner />
                  Створити заяву
                </span>
              ) : (
                'Створити заяву'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

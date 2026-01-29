import { api } from '@/shared/api';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

interface Props {
  refetch: () => void;
}

interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export const CreateUserDialog = ({ refetch }: Props) => {
  const [userData, setUserData] = useState<CreateUserData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
  });
  const [isOpen, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Перевірка: чи всі поля мають значення (не пусті рядки)
  const isFormValid = Object.values(userData).every((value) => value.trim() !== '');

  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserData) => api.post('/user/create', data),
    onSuccess: () => {
      refetch();
      setOpen(false);
      toast.success('Користувача успішно створено.');
      setUserData({ email: '', firstName: '', lastName: '', password: '', role: '' });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const msg = error.response?.data.message;
        if (error.response?.status === 409) {
          toast.error(msg);
        }
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Додати користувача <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[480px] p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Створення користувача</DialogTitle>
        </DialogHeader>

        <form className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-sm font-medium text-muted-foreground">
              Ім'я
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="h-10"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-sm font-medium text-muted-foreground">
              Прізвище
            </label>
            <Input
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="h-10"
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <Input
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="h-10 normal-case"
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
              Пароль
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              className="h-10 normal-case"
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="role" className="text-sm font-medium text-muted-foreground">
              Роль
            </label>

            <Select
              value={userData.role}
              onValueChange={(value) => setUserData((prev) => ({ ...prev, role: value }))}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Оберіть роль" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="user">Користувач</SelectItem>
                <SelectItem value="operator">Оператор</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => setOpen((p) => !p)}
              type="button"
              className="h-10"
            >
              Скасувати
            </Button>

            <Button
              onClick={() => createUserMutation.mutate(userData)}
              type="button"
              className="h-10"
              // Кнопка неактивна, якщо йде запит АБО форма не валідна
              disabled={createUserMutation.isPending || !isFormValid}
            >
              {createUserMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner /> Створення...
                </span>
              ) : (
                'Створити'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { api } from '@/shared/api';
import { Button, Input, Spinner } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

interface Props {
  user: User;
  refetch: () => void;
}

export const UpdateForm = ({ user, refetch }: Props) => {
  const [userInfo, setUserInfo] = useState<User>({
    id: user.id,
    email: user?.email ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    password: '',
  });

  const updateProfileInfoMutation = useMutation({
    mutationKey: ['profile'],
    mutationFn: async () => {
      const payload = { ...userInfo };

      if (!payload.password) {
        delete payload.password;
      }

      const response = await api.patch(`/user/update/${userInfo.id}`, payload);

      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);

      await refetch();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Помилка при оновленні профілю');
      } else {
        toast.error('Невідома помилка');
      }
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = e;

    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form className="flex gap-3 mt-2 flex-wrap">
        <div className="w-[400px]">
          <label htmlFor="firstName">Ім'я</label>
          <Input
            id="firstName"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="w-[400px]">
          <label htmlFor="lastName">Прізвище</label>
          <Input id="lastName" name="lastName" value={userInfo.lastName} onChange={handleChange} />
        </div>
        <div className="w-[400px]">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="w-[400px]">
          <label htmlFor="password">Пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </div>
      </form>
      <Button
        onClick={() => updateProfileInfoMutation.mutate()}
        disabled={
          (userInfo.email === user.email &&
            userInfo.firstName === user.firstName &&
            userInfo.lastName === user.lastName) ||
          updateProfileInfoMutation.isPending
        }
        className="mt-4"
      >
        {updateProfileInfoMutation.isPending ? (
          <span className="flex gap-2 items-center">
            <Spinner /> Збереження
          </span>
        ) : (
          <span>Зберегти зміни</span>
        )}
      </Button>
    </>
  );
};

import { api } from '@/shared/api';
import { Button, Input, Spinner } from '@/shared/ui';
import type { User } from '@/widgets/header/ui/header';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { lazy, useState, type ChangeEvent } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

const ProfilePage = () => {
  const [user, refetch] = useOutletContext<[User, refetch: () => void]>();

  console.log(user);

  const [userInfo, setUserInfo] = useState<UserInfo>(() => ({
    email: user?.email ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    password: '',
  }));

  const updateProfileInfoMutation = useMutation({
    mutationKey: ['profile'],
    mutationFn: async () => {
      const payload = { ...userInfo };

      if (!payload.password) {
        delete payload.password;
      }

      const response = await api.patch('/user/update', payload);

      toast.success(response.data.message);

      refetch();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
  });

  if (!user) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = e;

    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Профіль</h1>

      <div className="mt-5 border p-2 rounded-md">
        <h2 className="font-semibold">Особисті дані:</h2>
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
            <Input
              id="lastName"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleChange}
            />
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
            userInfo.email === user.email &&
            userInfo.firstName === user.firstName &&
            userInfo.lastName === user.lastName
          }
          className="mt-4"
        >
          {updateProfileInfoMutation.isPending ? (
            <span className="flex gap-2 items-center">
              <Spinner /> Оновлення
            </span>
          ) : (
            <span>Зберегти зміни</span>
          )}
        </Button>
      </div>
    </>
  );
};

export const LazyProfilePage = lazy(() => Promise.resolve({ default: ProfilePage }));

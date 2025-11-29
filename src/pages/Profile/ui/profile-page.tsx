import { api } from '@/shared/api';
import { Button, Input } from '@/shared/ui';
import type { User } from '@/widgets/header/ui/header';
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

export const ProfilePage = () => {
  const { refetch, user } = useOutletContext<{
    user: User;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<User, Error>>;
  }>();

  console.log(user);

  const [userInfo, setUserInfo] = useState<UserInfo>(() => ({
    email: user?.email ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    password: '',
  }));

  if (!user) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = e;

    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const payload = { ...userInfo };

    if (!payload.password) {
      delete payload.password;
    }

    const response = await api.patch('/user/update', payload);

    toast.success(response.data.message);

    refetch();
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
          onClick={handleUpdate}
          disabled={
            userInfo.email === user.email &&
            userInfo.firstName === user.firstName &&
            userInfo.lastName === user.lastName
          }
          className="mt-4"
        >
          Зберегти зміни
        </Button>
      </div>
    </>
  );
};

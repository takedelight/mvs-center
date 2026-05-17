import { useAuth } from '@/core/auth';
import type { User } from '@/entity/user';
import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

export const useUpdateProfile = () => {
  const {
    actions: { refetchProfile },
    value: { user },
  } = useAuth();

  const [userInfo, setUserInfo] = useState<Partial<User>>({
    email: user?.email ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
  });

  const updateProfileInfoMutation = useMutation({
    mutationKey: ['profile'],
    mutationFn: async () => {
      const payload = { ...userInfo };

      if (!payload.password) {
        delete payload.password;
      }

      const response = await api.patch(`/user/update/${user?.id}`, payload);

      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);

      refetchProfile();
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

  const isDidabled =
    (userInfo.firstName === user?.firstName && userInfo.lastName === user?.lastName) ||
    updateProfileInfoMutation.isPending;

  return { userInfo, handleChange, updateProfileInfoMutation, isDidabled };
};

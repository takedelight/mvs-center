import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, type ChangeEvent } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, refresh] = useOutletContext<[_: unknown, refresh: () => void]>();

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = e;

    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const response = await api.post('auth/login', { ...inputValues });
      return response.data;
    },
    onSuccess: async () => {
      toast.success('Ви увійшли у свій профіль!');
      await refresh();
      navigate('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;

        if (error.response?.status === 404) {
          toast.error(errorMessage);
        }

        if (error.response?.status === 401) {
          toast.error(errorMessage);
        }
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  const isPending = loginMutation.isPending;
  const isDisabled = inputValues.email === '' || inputValues.password === '';

  return {
    inputValues,
    handleChange,
    isDisabled,
    isPending,
    handleSubmit,
  };
};

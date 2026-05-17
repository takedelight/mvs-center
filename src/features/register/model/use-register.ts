import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

export const useRegister = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, refresh] = useOutletContext<[unknown, () => Promise<void> | void]>();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: async () => {
      const response = await api.post('auth/register', { ...inputValues });
      return response.data;
    },
    onSuccess: async () => {
      toast.success('Ви успішно зареєструвалися!');
      await refresh();
      navigate('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Помилка реєстрації';
        toast.error(errorMessage);
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  const isPending = registerMutation.isPending;

  const isDisabled =
    inputValues.email === '' ||
    inputValues.firstName === '' ||
    inputValues.lastName === '' ||
    inputValues.password === '';

  return {
    inputValues,
    handleChange,
    handleSubmit,
    registerMutation,
    isPending,
    isDisabled,
  };
};

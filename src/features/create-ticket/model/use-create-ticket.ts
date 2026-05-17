import { useAuth } from '@/core/auth';
import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useCreateTicket = () => {
  const {
    value: { user },
  } = useAuth();

  const [selectedType, setSelectedType] = useState('');
  const [VIN, setVIN] = useState('');

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    setUserInfo({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
  }, [user]);

  const createTicketMutation = useMutation({
    mutationKey: ['create-ticket'],
    mutationFn: async () => {
      if (!selectedType) {
        toast.error('Виберіть тип заявки');
        return;
      }

      if (!VIN) {
        toast.error('Введіть VIN');
        return;
      }

      if (VIN.trim().length < 17) {
        toast.error('VIN повинен містити не менше 17 символів');
        return;
      }

      const data = {
        type: selectedType,
        VIN,
      };

      await api.post('/ticket', data);

      console.log(userInfo);
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

  const isPending = !selectedType || createTicketMutation.isPending;

  return {
    createTicketMutation,
    selectedType,
    setSelectedType,
    VIN,
    setVIN,
    isPending,
    userInfo,
    setUserInfo,
  };
};

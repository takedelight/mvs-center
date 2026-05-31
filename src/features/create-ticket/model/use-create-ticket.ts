import { useAuth } from '@/core/auth';
import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

export const useCreateTicket = () => {
  const {
    value: { user },
  } = useAuth();

  const [selectedType, setSelectedType] = useState('');
  const [selectedCarId, setSelectedCarId] = useState<string>('');

  const [ticket, setTicket] = useState({
    VIN: '',
    type: '',
    carNumber: '',
    newCarNumber: '',
    reason: '',
  });

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createTicketMutation = useMutation({
    mutationKey: ['create-ticket'],
    mutationFn: async () => {
      if (!selectedType) {
        toast.error('Виберіть тип заявки');
        return;
      }

      if (!ticket.VIN) {
        toast.error('Введіть VIN');
        return;
      }

      if (ticket.VIN.trim().length < 17) {
        toast.error('VIN повинен містити не менше 17 символів');
        return;
      }

      const data = {
        type: selectedType,
        VIN: ticket.VIN,
        carNumber: ticket.carNumber,
        newCarNumber: ticket.newCarNumber,
        reason: ticket.reason,
        carId: selectedCarId,
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
  const isDisabled =
    selectedType === 'Заміна номерних знаків'
      ? !ticket.newCarNumber || ticket.newCarNumber.trim().length < 8
      : selectedType === 'Зняття автомобіля з обліку'
        ? !ticket.reason
        : false;

  return {
    createTicketMutation,
    selectedType,
    setSelectedType,
    selectedCarId,
    setSelectedCarId,
    ticket,
    setTicket,
    isPending,
    isDisabled,
    handleChange,
    userInfo,
    setUserInfo,
  };
};

import { api } from '@/shared/api';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { cn } from '@/shared/lib/utils';
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Spinner,
} from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, type ChangeEvent } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

export const SignInForm = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const { setValue } = useLocalStorage('access_token', '');
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
    onSuccess: (data) => {
      setValue(data.access_token);

      toast.success('Ви увійшли у свій профіль!');
      refresh();
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

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Вхід у обліковий запис</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div>
          <label htmlFor="email">Email</label>
          <Input
            value={inputValues.email}
            onChange={(e) => handleChange(e)}
            id="email"
            placeholder="JohnDoe@example.com"
            type="email"
            name="email"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label htmlFor="password">Пароль</label>

            <Link className={cn(buttonVariants({ variant: 'link' }), 'text-xs')} to="/recovery">
              Відновити пароль
            </Link>
          </div>
          <Input
            value={inputValues.password}
            onChange={(e) => handleChange(e)}
            id="password"
            placeholder="********"
            type="password"
            name="password"
          />
        </div>

        <Button
          disabled={loginMutation.isPending}
          onClick={() => loginMutation.mutate()}
          className="uppercase tracking-wide"
        >
          {loginMutation.isPending ? (
            <span className="flex gap-1 items-center">
              <Spinner /> Увійти
            </span>
          ) : (
            <span>Увійти</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

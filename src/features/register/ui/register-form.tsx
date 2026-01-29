import { api } from '@/shared/api';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Spinner } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, type ChangeEvent } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
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
    mutationKey: ['register'],
    mutationFn: async () => {
      const response = await api.post('auth/register', { ...inputValues });
      return response.data;
    },
    onSuccess: async () => {
      toast.success('Ви  успішно зареєструвалися  !');
      await refresh();
      navigate('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;

        if (error.response?.status === 409) {
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
        <CardTitle>Реєстрація нового користувача</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <form action="">
          <div className="flex gap-5 ">
            <div>
              <label htmlFor="firstName">First Name</label>
              <Input
                value={inputValues.firstName}
                onChange={(e) => handleChange(e)}
                id="firstName"
                placeholder="John"
                type="text"
                name="firstName"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Input
                value={inputValues.lastName}
                onChange={(e) => handleChange(e)}
                id="lastName"
                placeholder="Doe"
                type="text"
                name="lastName"
              />
            </div>
          </div>

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
            <label htmlFor="password">Пароль</label>

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
                <Spinner /> Зареєструватися
              </span>
            ) : (
              <span>Зареєструватися</span>
            )}
          </Button>

          <span className="block text-sm text-muted-foreground text-center ">
            Вже маєте акаунт?{' '}
            <Link
              to="/signin"
              className="text-black underline transition-colors ease-in-out duration-150 hover:text-neutral-800"
            >
              Увійти
            </Link>
          </span>
        </form>
      </CardContent>
    </Card>
  );
};

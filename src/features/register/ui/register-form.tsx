import { api } from '@/shared/api';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Spinner } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

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

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Реєстрація нового користувача</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="firstName">First Name</label>
              <Input
                value={inputValues.firstName}
                onChange={handleChange}
                id="firstName"
                placeholder="John"
                type="text"
                name="firstName"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName">Last Name</label>
              <Input
                value={inputValues.lastName}
                onChange={handleChange}
                id="lastName"
                placeholder="Doe"
                type="text"
                name="lastName"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Input
              value={inputValues.email}
              onChange={handleChange}
              id="email"
              placeholder="JohnDoe@example.com"
              type="email"
              name="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Пароль</label>
            <Input
              value={inputValues.password}
              onChange={handleChange}
              id="password"
              placeholder="********"
              type="password"
              name="password"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={registerMutation.isPending} className="w-full">
              {registerMutation.isPending ? (
                <span className="flex gap-1 items-center">
                  <Spinner /> Зареєструватися
                </span>
              ) : (
                'Зареєструватися'
              )}
            </Button>

            <span className="block text-sm text-muted-foreground text-center">
              Вже маєте акаунт?{' '}
              <Link
                to="/signin"
                className="text-black underline transition-colors hover:text-neutral-800"
              >
                Увійти
              </Link>
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

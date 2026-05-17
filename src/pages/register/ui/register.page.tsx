import { RegisterForm } from '@/features/register';
import { lazy } from 'react';

const RegisterPage = () => {
  return (
    <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <RegisterForm />
    </section>
  );
};

export const LazyRegisterPage = lazy(() => Promise.resolve({ default: RegisterPage }));

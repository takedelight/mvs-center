import { RegisterForm } from '@/features/register';
import { lazy } from 'react';

const RegisterPage = () => {
  return (
    <section className="container flex justify-center items-center h-[88vh] mx-auto px-1">
      <RegisterForm />
    </section>
  );
};

export const LazyRegisterPage = lazy(() => Promise.resolve({ default: RegisterPage }));

import { LoginForm } from '@/features/signin';
import { lazy } from 'react';

const LoginPage = () => {
  return (
    <section className="container flex justify-center items-center h-[88vh] mx-auto px-1">
      <LoginForm />
    </section>
  );
};

export const LazyLoginPage = lazy(() => Promise.resolve({ default: LoginPage }));

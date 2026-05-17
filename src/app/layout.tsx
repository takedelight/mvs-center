import { useAuth } from '@/core/auth';
import { Spinner } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

export const RootLayout = () => {
  const navigate = useNavigate();

  const {
    value: { isPending, user },
  } = useAuth();

  const location = useLocation();
  const isAuthRoute =
    location.pathname.startsWith('/signin') || location.pathname.startsWith('/register');

  useEffect(() => {
    if (!isPending && !isAuthRoute && !user) {
      navigate('/signin');
    }
  }, [isPending, isAuthRoute, user]);

  return (
    <div className="flex flex-col h-screen antialiased">
      <Header />

      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <Spinner className="size-7" />
          </div>
        }
      >
        <main className="flex-1 bg-neutral-100">
          <Outlet />
        </main>
      </Suspense>

      <footer className="container text-sm text-center font-semibold py-2 mx-auto px-1 ">
        Тема 18: Структура даних та алгоритм під час підтримки роботи сервісного центру
        МВС.Порівняння алгоритмів сортування з heapsort як базовим
      </footer>
    </div>
  );
};

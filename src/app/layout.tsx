import { api } from '@/shared/api';
import { Spinner } from '@/shared/ui';
import { Header } from '@/widgets/header';
import type { User } from '@/widgets/header/ui/header';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export const RootLayout = () => {
  const { data, refetch } = useQuery<User>({
    queryKey: ['profile'],
    refetchOnWindowFocus: false,
    queryFn: () => api.get('/profile').then((res) => res.data),
  });

  return (
    <div className="flex flex-col h-screen antialiased">
      <Header data={data} />

      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <Spinner />
          </div>
        }
      >
        <main className="flex-1 bg-neutral-100">
          <Outlet context={[data, refetch]} />
        </main>
      </Suspense>

      <footer className="container text-lg text-center font-semibold py-2 mx-auto px-1 ">
        Тема 18: Структура даних та алгоритм під час підтримки роботи сервісного центру
        МВС.Порівняння алгоритмів сортування з heapsort як базовим
      </footer>
    </div>
  );
};

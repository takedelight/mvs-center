import { Header } from '@/widgets/header';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export const RootLayout = () => {
    return (
        <div className="flex flex-col h-screen antialiased">
            <Header />

            <Suspense fallback={<div>load...</div>}>
                <main className="flex-1 bg-neutral-100">
                    <Outlet />
                </main>
            </Suspense>

            <footer className="container text-lg text-center font-semibold py-2 mx-auto px-1 ">
                Тема 18: Структура даних та алгоритм під час підтримки роботи сервісного центру
                МВС.Порівняння алгоритмів сортування з heapsort як базовим
            </footer>
        </div>
    );
};


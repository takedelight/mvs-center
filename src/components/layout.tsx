import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router';
import { Loader } from './ui/loader';

export const Layout = () => {
    return (
        <div className="h-screen relative flex flex-col">
            <header className="py-3 sticky top-0 z-50 bg-white ">
                <nav className="flex items-center justify-center gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            ` hover:text-blue-600 transition font-semibold ${
                                isActive ? ' text-blue-600' : ''
                            }`
                        }
                    >
                        Головна
                    </NavLink>
                    <NavLink
                        to="/stats"
                        className={({ isActive }) =>
                            ` hover:text-blue-600 transition font-semibold ${
                                isActive ? 'text-blue-600 ' : ''
                            }`
                        }
                    >
                        Порівняння
                    </NavLink>
                </nav>
            </header>

            <Suspense
                fallback={
                    <div className="h-screen flex justify-center items-center">
                        <Loader />
                    </div>
                }
            >
                <main className="flex-1">
                    <Outlet />
                </main>
            </Suspense>
        </div>
    );
};

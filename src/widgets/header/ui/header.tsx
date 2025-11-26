import { Link, NavLink } from 'react-router';
import { UserRound } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, buttonVariants } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export const Header = () => {
    const { data } = useQuery<User>({
        queryKey: ['profile'],
        refetchOnWindowFocus: false,
        queryFn: () => api.get('/profile').then((res) => res.data),
    });

    return (
        <header className="shadow-sm py-4">
            <nav className="container flex items-center justify-between mx-auto px-1">
                <Link to="/" className="text-xl font-semibold">
                    Logo
                </Link>

                <ul className="flex items-center gap-3">
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                cn(
                                    'ease-in-out duration-150 transition-all hover:text-blue-600',
                                    isActive ? 'font-semibold text-blue-700 ' : '',
                                )
                            }
                            to="/"
                        >
                            Головна
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                cn(
                                    'ease-in-out duration-150 transition-all hover:text-blue-600',
                                    isActive ? 'font-semibold text-blue-700 ' : '',
                                )
                            }
                            to="/comparisions"
                        >
                            Порівняння
                        </NavLink>
                    </li>
                </ul>

                {!data ? (
                    <Link className={cn(buttonVariants({ variant: 'ghost' }))} to="/signin">
                        <UserRound className="size-5" />
                        Увійти
                    </Link>
                ) : (
                    <Link to="/profile">
                        <Avatar>
                            <AvatarFallback className="bg-primary text-white">
                                {(data?.firstName?.[0] ?? '') + (data?.lastName?.[0] ?? '')}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                )}
            </nav>
        </header>
    );
};


import { Link, NavLink } from 'react-router';
import { UserRound } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, buttonVariants } from '@/shared/ui';
import { useAuth } from '@/core/auth';

export const Header = () => {
  const {
    value: { user },
  } = useAuth();

  const getInitials = () => {
    const first = user?.firstName?.[0]?.toUpperCase() ?? '';
    const last = user?.lastName?.[0]?.toUpperCase() ?? '';
    return `${first}${last}`;
  };

  return (
    <header className="shadow-sm py-4">
      <nav className="container flex items-center justify-between mx-auto px-1">
        <Link to="/" className="text-xl font-semibold">
          Сервісний центр МВС
        </Link>

        <ul className="flex items-center gap-3">
          <li>
            {user && user?.role === 'OPERATOR' && (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'ease-in-out duration-150 transition-all hover:text-blue-600',
                    isActive ? 'font-semibold text-blue-700 ' : '',
                  )
                }
                to="/admin"
              >
                Панель керування
              </NavLink>
            )}
          </li>

          <li>
            {!user ? (
              <Link className={cn(buttonVariants({ variant: 'ghost' }))} to="/signin">
                <UserRound className="size-5" />
                Увійти
              </Link>
            ) : (
              <Link to="/profile">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">{getInitials()}</AvatarFallback>
                </Avatar>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

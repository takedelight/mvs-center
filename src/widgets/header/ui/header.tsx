import { Link, NavLink } from 'react-router';
import { UserRound } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, buttonVariants } from '@/shared/ui';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useMemo } from 'react';
import type { User } from '@/entity/user';

interface Props {
  data?: User;
}

export const Header = ({ data }: Props) => {
  const { value } = useLocalStorage('access_token', '');

  const initials = useMemo(() => {
    if (!data) return null;
    const first = data.firstName?.[0]?.toUpperCase() ?? '';
    const last = data.lastName?.[0]?.toUpperCase() ?? '';
    return `${first}${last}`;
  }, [data]);

  return (
    <header className="shadow-sm py-4">
      <nav className="container flex items-center justify-between mx-auto px-1">
        <Link to="/" className="text-xl font-semibold">
          Сервісний центр МВС
        </Link>

        <ul className="flex items-center gap-3">
          <li>
            {value && data?.role === 'operator' && (
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
            {!data || !value ? (
              <Link className={cn(buttonVariants({ variant: 'ghost' }))} to="/signin">
                <UserRound className="size-5" />
                Увійти
              </Link>
            ) : (
              <Link to="/profile">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">{initials}</AvatarFallback>
                </Avatar>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

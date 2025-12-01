import { Link, NavLink } from 'react-router';
import { User, UserRound } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, buttonVariants } from '@/shared/ui';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  data?: User;
}

export const Header = ({ data }: Props) => {
  return (
    <header className="shadow-sm py-4">
      <nav className="container flex items-center justify-between mx-auto px-1">
        <Link to="/" className="text-xl font-semibold">
          Logo
        </Link>

        <ul className="flex items-center gap-3">
          <li>
            {data?.role === 'operator' && (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'ease-in-out duration-150 transition-all hover:text-blue-600',
                    isActive ? 'font-semibold text-blue-700 ' : '',
                  )
                }
                to="/admin"
              >
                Адмінка
              </NavLink>
            )}
          </li>

          <li>
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
          </li>
        </ul>
      </nav>
    </header>
  );
};

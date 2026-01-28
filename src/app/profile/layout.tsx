import type { User } from '@/entity/user';
import { LogOut } from '@/features/logout';
import { Avatar, AvatarFallback } from '@/shared/ui';
import { Mail, Settings, SquarePen, UserRoundPen } from 'lucide-react';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useOutletContext } from 'react-router';
export const ProfileLayout = () => {
  const [user, refetch] = useOutletContext<[User, () => void]>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/signin');
  }, [user, navigate]);

  return (
    <section className="container h-[85vh] mt-5 mx-auto px-1">
      <div className="bg-white relative h-full rounded-sm grid grid-cols-4 ">
        <aside className="border-r col-start-1 col-end-2 flex flex-col h-full">
          <div className="flex max-w-full p-2 overflow-hidden border-b items-center gap-2">
            <Link to="/profile">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {user?.firstName?.[0]?.toUpperCase() ?? ''}
                  {user?.lastName?.[0]?.toUpperCase() ?? ''}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link to="/profile" className="truncate">
                {user?.firstName} {user?.lastName}
              </Link>
              <span className="text-sm group  gap-1 flex truncate items-center">{user?.email}</span>
            </div>
          </div>

          <ul>
            <li>
              <Link
                className="transition-colors p-4 ease-in-out duration-150 hover:bg-secondary flex items-center gap-2"
                to="/profile"
              >
                <UserRoundPen /> Профіль
              </Link>
            </li>

            <li>
              <Link
                className="transition-colors p-4 ease-in-out duration-150 hover:bg-secondary flex items-center gap-2"
                to="/profile/statements"
              >
                <Mail /> Мої заявки
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors p-4 ease-in-out duration-150 hover:bg-secondary flex items-center gap-2"
                to="/profile/settings"
              >
                <Settings /> Налаштування
              </Link>
            </li>
          </ul>

          <LogOut />
        </aside>

        <div className="col-start-2 p-2   col-end-5 ">
          <div className="mx-auto">
            <Outlet context={[user, refetch]} />
          </div>
        </div>
      </div>
    </section>
  );
};

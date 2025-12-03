import type { User } from '@/entity/user';
import { api } from '@/shared/api';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { Avatar, AvatarFallback, Button } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { LogOut, Mail, Settings, SquarePen, UserRoundPen } from 'lucide-react';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useOutletContext } from 'react-router';
import { toast } from 'react-toastify';

export const ProfileLayout = () => {
  const [user, refetch] = useOutletContext<[User, () => void]>();
  const { value, deleteValue } = useLocalStorage('access_token', '');

  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await api.post('auth/logout', {}, { withCredentials: true });
    },
    onSuccess: () => {
      deleteValue();

      toast.success('Ви вийшли зі свого облікового запису.');

      navigate('/');
      refetch();
    },
  });

  useEffect(() => {
    if (!value || !user) navigate('/signin');
  }, [value, user]);

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
              <Link
                to="/profile"
                className="text-sm group transition-colors ease-in-out duration-150 hover:text-muted-foreground gap-1 flex truncate items-center"
              >
                {user?.email}
                <SquarePen
                  size={10}
                  className="opacity-0 ease-in-out duration-150 transition-opacity group-hover:opacity-100"
                />
              </Link>
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

          <Button
            onClick={() => logoutMutation.mutate()}
            variant="ghost"
            className="w-full text-lg  text-red-500 mt-auto hover:text-red-500 justify-normal rounded-none"
          >
            <LogOut /> Вийти
          </Button>
        </aside>

        <div className="col-start-2 p-2   col-end-5 ">
          <div className="  mx-auto">
            <Outlet context={[user, refetch]} />
          </div>
        </div>
      </div>
    </section>
  );
};


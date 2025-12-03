import type { User } from '@/widgets/header/ui/header';
import { Ban, ClipboardList, Settings, Users } from 'lucide-react';
import { Link, Outlet, useOutletContext } from 'react-router';

export const AdminLayout = () => {
  const [user, refetch] = useOutletContext<[User, refetch: () => void]>();

  if (user?.role === 'user' || !user) {
    return (
      <div className="h-[88vh] flex justify-center items-center">
        <span className="flex items-center flex-col">
          {' '}
          <Ban size={40} />
          <p className="text-gray-600">У вас немає доступу до цієї сторінки</p>
          <Link to="/">На головну</Link>
        </span>
      </div>
    );
  }

  return (
    <section className="container border bg-white mt-5 h-[85vh] grid grid-cols-6 rounded-md  mx-auto ">
      <aside className=" border-r col-start-1 col-end-2">
        <ul>
          <li>
            <Link
              className="transition-colors p-4 ease-in-out duration-150 hover:bg-neutral-200 flex items-center gap-2"
              to="/admin/users"
            >
              <Users /> Всі користувачі
            </Link>
          </li>
          <li>
            <Link
              className="transition-colors p-4 ease-in-out duration-150 hover:bg-neutral-200 flex items-center gap-2"
              to="/admin/statements"
            >
              <ClipboardList /> Всі заявки
            </Link>
          </li>
          <li>
            <Link
              className="transition-colors p-4 ease-in-out duration-150 hover:bg-neutral-200 flex items-center gap-2"
              to="/admin/settings"
            >
              <Settings /> Налаштування
            </Link>
          </li>
        </ul>
      </aside>
      <div className="col-start-2 p-2  col-end-7">
        <Outlet context={[user, refetch]} />
      </div>
    </section>
  );
};


import type { User } from '@/entity/user';
import { ClipboardList, Settings, Users } from 'lucide-react';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useOutletContext } from 'react-router';

export const AdminLayout = () => {
  const [user, refetch] = useOutletContext<[User, refetch: () => void]>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'user') {
      navigate('/');
    }
  }, [user, navigate]);

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

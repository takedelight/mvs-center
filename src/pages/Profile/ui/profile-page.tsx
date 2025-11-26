import { api } from '@/shared/api';
import { Avatar, AvatarFallback } from '@/shared/ui';
import type { User } from '@/widgets/header/ui/header';
import { useQuery } from '@tanstack/react-query';
import { SquarePen } from 'lucide-react';
import { Link } from 'react-router';

export const ProfilePage = () => {
  const { data } = useQuery<User>({
    queryKey: ['profile'],
    refetchOnWindowFocus: false,
    queryFn: () => api.get('/profile').then((res) => res.data),
  });

  return (
    <section className="container h-[88vh] flex justify-center items-center mx-auto px-1">
      <div className="bg-white h-[700px] grid grid-cols-4 w-[1200px]">
        <aside className="border p-2 ">
          <div className="flex max-w-full overflow-hidden items-center gap-1 ">
            <Avatar>
              <AvatarFallback className="bg-primary text-white">
                {(data?.firstName?.[0] ?? '') + (data?.lastName?.[0] ?? '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <span className="truncate">
                {data?.firstName} {''} {data?.lastName}
              </span>
              <Link
                to="/profile#email"
                className="text-sm group transition-colors ease-in-out duration-150 hover:text-muted-foreground gap-1 flex truncate items-center"
              >
                {data?.email}{' '}
                <SquarePen
                  size={10}
                  className="opacity-0 ease-in-out duration-150 transition-opacity group-hover:opacity-100"
                />
              </Link>
            </div>
          </div>
        </aside>
        <div className="col-start-2  col-end-5 "></div>
      </div>
    </section>
  );
};

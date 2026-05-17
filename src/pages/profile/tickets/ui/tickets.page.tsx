import { UserTicketsTable } from '@/widgets/user-tickets-table';
import { lazy } from 'react';

const UserTicketsPage = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mt-3"> Мої заяви</h1>

      <UserTicketsTable />
    </>
  );
};

export const LazyUserTicketsPage = lazy(() => Promise.resolve({ default: UserTicketsPage }));

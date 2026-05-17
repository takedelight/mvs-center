import { UserTicketsTable } from '@/widgets/user-tickets-table';
import { lazy } from 'react';

const UserTicketsPage = () => {
  return (
    <>
      <UserTicketsTable />
    </>
  );
};

export const LazyUserTicketsPage = lazy(() => Promise.resolve({ default: UserTicketsPage }));

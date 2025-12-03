import { lazy } from 'react';

const AllStatementsPage = () => {
  return <></>;
};

export const LazyAdminStatementsPage = lazy(() => Promise.resolve({ default: AllStatementsPage }));

import { Comparison } from '@/features/comparison';
import { lazy } from 'react';

const AdminComparisonPage = () => {
  return (
    <>
      <div className="mt-5">
        <Comparison />
      </div>
    </>
  );
};

export const LazyAdminComparisonPage = lazy(() =>
  Promise.resolve({ default: AdminComparisonPage }),
);

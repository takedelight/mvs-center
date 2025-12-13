import { Comparison } from '@/features/comparison';
import { Compass } from 'lucide-react';
import { lazy } from 'react';

const AdminComparisonPage = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Порівняння алгоритмів сортування</h1>

      <div className="mt-5">
        <Comparison />
      </div>
    </>
  );
};

export const LazyAdminComparisonPage = lazy(() =>
  Promise.resolve({ default: AdminComparisonPage }),
);

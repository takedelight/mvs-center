import { FilterContext } from '@/features/statements-filter/model/filter.context';
import type { SortKey, SortOrder } from '@/features/statements-filter/model/types';
import { SORT_KEYS } from '@/shared/constants';
import { useMemo, useState, type PropsWithChildren } from 'react';

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [order, setOrder] = useState<SortOrder>('desc');
  const [searchValue, setSearchValue] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>(SORT_KEYS[2]);

  const values = useMemo(
    () => ({
      order,
      setOrder,
      searchValue,
      setSearchValue,
      sortKey,
      setSortKey,
    }),
    [order, searchValue, sortKey],
  );

  return <FilterContext.Provider value={values}>{children}</FilterContext.Provider>;
};


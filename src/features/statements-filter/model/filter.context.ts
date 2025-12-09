import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { SortKey, SortOrder } from './types';

interface Context {
  order: SortOrder;
  setOrder: Dispatch<SetStateAction<SortOrder>>;

  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;

  sortKey: SortKey;
  setSortKey: Dispatch<SetStateAction<SortKey>>;
}

export const FilterContext = createContext<Context | null>(null);


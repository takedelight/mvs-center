import { Input } from '@/shared/ui';
import { Search } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({ searchValue, setSearchValue }: Props) => {
  return (
    <div className="mt-5 border w-[230px] px-1 rounded-sm">
      <label htmlFor="search" className="flex  items-center   ">
        <Search />
        <Input
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border-none outline-0 focus-visible:ring-0"
          placeholder="Пошук за ПІБ, типом, id"
        />
      </label>
    </div>
  );
};


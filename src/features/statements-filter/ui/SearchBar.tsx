import { Button, Input } from '@/shared/ui';
import { Search, X } from 'lucide-react';
import { useFilter } from '../hooks/useFilter';

export const SearchBar = () => {
  const { searchValue, setSearchValue } = useFilter();

  return (
    <div className="mt-5 relative border w-[400px] px-1 rounded-sm">
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

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setSearchValue('')}
        className={`
    absolute top-0.5 right-1
    transition-opacity ease-in-out duration-150
    ${searchValue.length > 0 ? 'opacity-100' : 'opacity-0'}
    hover:bg-transparent hover:text-inherit
  `}
      >
        <X />
      </Button>
    </div>
  );
};


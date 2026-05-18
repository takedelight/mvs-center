import { Button, Input } from '@/shared/ui';
import { Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';

export const SearchBar = () => {
  const [params, setParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(params.get('q') ?? '');

  useEffect(() => {
    setSearchValue(params.get('q') ?? '');
  }, [params]);

  useEffect(() => {
    const nextParams = new URLSearchParams(params);

    if (searchValue) {
      nextParams.set('q', searchValue);
      nextParams.set('page', '1');
    } else {
      nextParams.delete('q');
    }

    setParams(nextParams);
  }, [searchValue, setParams, params]);

  return (
    <div className="relative border w-100 px-1 rounded-sm">
      <label htmlFor="search" className="flex items-center">
        <Search />
        <Input
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border-none outline-0 focus-visible:ring-0"
          placeholder="Пошук за ПІБ, типом, id та VIN-номером"
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

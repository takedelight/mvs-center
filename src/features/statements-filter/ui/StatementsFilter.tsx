import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/shared/ui';
import { SearchBar } from './SearchBar';
import { useSearchParams } from 'react-router';
import { SORT_KEYS } from '@/shared/constants';

export const StatementsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStatusValue = searchParams.get('status') || 'all';
  const currentStatusItem =
    SORT_KEYS.find((item) => item.value === currentStatusValue) || SORT_KEYS[2];

  const handleStatusChange = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value === 'all') {
      nextParams.delete('status');
    } else {
      nextParams.set('status', value);
    }

    setSearchParams(nextParams);
  };

  return (
    <div className="flex mb-2 items-center justify-between">
      <SearchBar />

      <ul className="flex items-center gap-3">
        <li>
          <Select value={currentStatusValue} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-40">
              {currentStatusItem ? currentStatusItem.alias : 'Всі'}
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {SORT_KEYS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.alias}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </li>
      </ul>
    </div>
  );
};

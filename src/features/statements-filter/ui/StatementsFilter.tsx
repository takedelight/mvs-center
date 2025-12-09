import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui';
import { SearchBar } from './SearchBar';
import { ArrowUpDown } from 'lucide-react';
import { SORT_KEYS } from '@/shared/constants';
import { useFilter } from '../hooks/useFilter';

export const StatementsFilter = () => {
  const { setOrder, sortKey, setSortKey } = useFilter();

  return (
    <div className="flex items-center justify-between">
      <SearchBar />

      <ul className="flex items-center gap-3">
        <li>
          <Select
            value={sortKey.value}
            onValueChange={(value) => {
              const found = SORT_KEYS.find((item) => item.value === value);
              if (found) setSortKey(found);
            }}
          >
            <SelectTrigger className="w-40">{sortKey.alias}</SelectTrigger>

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

        <li>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                variant="ghost"
              >
                <ArrowUpDown />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Сортувати за датою створення</p>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};


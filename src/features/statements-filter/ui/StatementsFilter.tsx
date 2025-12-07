import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui';
import { SearchBar } from './SearchBar';
import { ArrowDownWideNarrow, ChevronDown } from 'lucide-react';
import { SORT_KEYS } from '../model/constant/SORT_KEYS';
import { cn } from '@/shared/lib/utils';
import { ALGORITHMS } from '../model/constant/ALGORITHMS';
import { type Dispatch, type SetStateAction } from 'react';

type AlgorithmValue = (typeof ALGORITHMS)[number]['value'];

type SortOrder = 'asc' | 'desc';

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  sortKey: {
    alias: string;
    value: string;
  };

  setSortKey: Dispatch<
    SetStateAction<{
      alias: string;
      value: string;
    }>
  >;
  sortOrder: SortOrder;
  setSortOrder: Dispatch<SetStateAction<SortOrder>>;

  algorithms: AlgorithmValue[];
  setAlgorithms: Dispatch<SetStateAction<AlgorithmValue[]>>;
}

export const StatementsFilter = ({
  algorithms,
  searchValue,
  setAlgorithms,
  setSearchValue,
  setSortKey,
  setSortOrder,
  sortKey,
  sortOrder,
}: Props) => {
  const toggleAlgorithm = (value: AlgorithmValue) => {
    setAlgorithms((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div className="flex items-center justify-between">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

      <ul className="flex items-center gap-3">
        <li>
          <Select
            value={sortKey.value}
            onValueChange={(value) => {
              const selected = SORT_KEYS.find((i) => i.value === value);
              if (selected) setSortKey(selected);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder={sortKey.alias} />
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
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="border-input text-muted-foreground flex items-center border w-[260px] justify-between"
                variant="ghost"
              >
                {algorithms.length === 0
                  ? 'Оберіть алгоритми сортування'
                  : `Обрано: ${algorithms.length}`}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[260px]" align="center">
              {ALGORITHMS.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item.value}
                  checked={algorithms.includes(item.value)}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={() => toggleAlgorithm(item.value)}
                >
                  {item.alias}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                variant="ghost"
              >
                <ArrowDownWideNarrow
                  className={cn(sortOrder === 'asc' && 'rotate-180', 'transition-transform')}
                />
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


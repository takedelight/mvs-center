import { ALGORITHMS } from '@/shared/constants';
import {
  Button,
  ChartTooltipContent,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
} from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { getComparisonResult } from '../model/getComparisonResult';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { ChartContainer } from '@/shared/ui';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface ComparisonResult {
  algorithm: string;
  sorted: {
    result: {
      id: number;
      type: string;
      status: string;
      createdAt: string;
    }[];
    time: string;
    operations: number;
  };
}

export const Comparison = () => {
  const [quantity, setQuantity] = useState(100);
  const [algorithms, setAlgorithms] = useState<string[]>([]);

  const debauncedQuantity = useDebounce<number>(quantity, 500);

  const { data } = useQuery<ComparisonResult[]>({
    queryKey: ['comparison', quantity, algorithms],
    queryFn: () => getComparisonResult(debauncedQuantity, algorithms),
    refetchOnWindowFocus: false,
    enabled: algorithms.length > 0,
  });

  console.log(data);

  const config = {
    time: {
      alias: 'Час виконання',
      color: 'red',
    },
    operations: {
      alias: 'Кількість операцій',
      color: 'blue',
    },
  };

  const chartData = data?.map((d) => ({
    algorithm: d.algorithm,
    time: Number(d.sorted.time.replace('ms', '')),
    operations: d.sorted.operations,
  }));

  return (
    <>
      <div className="mt-4">
        <ul className="flex items-end gap-6">
          <li className="flex flex-col gap-1">
            <span className="font-medium text-sm text-muted-foreground">Кількість елементів</span>

            <div className="relative w-[120px]">
              <Input
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, +e.target.value))}
                type="number"
                min={0}
                className="pr-8"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                шт
              </span>
            </div>
          </li>

          <li className="flex flex-col gap-1">
            <span className="font-medium text-sm text-muted-foreground">Алгоритми сортування</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-between w-[250px] px-3"
                >
                  {algorithms.length > 0 ? `Обрано: ${algorithms.length}` : 'Оберіть алгоритми'}
                  <ChevronDownIcon className="ml-2 h-4 w-4 opacity-60" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[250px]">
                {ALGORITHMS.map((item) => (
                  <DropdownMenuCheckboxItem
                    key={item.value}
                    onSelect={(e) => {
                      e.preventDefault();
                      setAlgorithms((prev) =>
                        prev.includes(item.value)
                          ? prev.filter((i) => i !== item.value)
                          : [...prev, item.value],
                      );
                    }}
                    checked={algorithms.includes(item.value)}
                  >
                    {item.alias}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>

      {chartData && (
        <div className="w-full mt-5 h-[500px]">
          <ChartContainer className="w-full px-3 h-full" config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="algorithm" />

                <YAxis />

                <Tooltip content={<ChartTooltipContent />} />
                <Legend />

                <Line type="basis" dataKey="time" name="Час виконання" stroke="red" />

                <Line type="basis" dataKey="operations" name="Кількість операцій" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}
    </>
  );
};

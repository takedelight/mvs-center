import { ALGORITHMS } from '@/shared/constants';
import {
  Button,
  Card,
  CardContent,
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

import { useDebounce } from '@/shared/hooks/useDebounce';
import { ChartContainer } from '@/shared/ui';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ComparisonResponse {
  total: number;
  result: {
    algorithm: string;
    time: number;
    operations: number;
  };
}

export const Comparison = () => {
  const [quantity, setQuantity] = useState(100);
  const [algorithms, setAlgorithms] = useState<string[]>([]);

  const debouncedQuantity = useDebounce<number>(quantity, 500);

  // Умова: запит йде тільки якщо обрано 2 або більше алгоритми
  const canCompare = algorithms.length >= 2;

  const { data: chartData } = useQuery<ComparisonResponse[]>({
    queryKey: ['comparison', debouncedQuantity, algorithms],
    queryFn: () => getComparisonResult(debouncedQuantity, algorithms),
    refetchOnWindowFocus: false,
    enabled: canCompare && debouncedQuantity > 0,
  });

  const config = {
    time: {
      label: 'Час виконання (мс)',
      color: 'red',
    },
    operations: {
      label: 'Кількість операцій',
      color: 'blue',
    },
  };

  const totalItems = chartData?.[0]?.total ?? 0;

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

          <li>
            Масив:
            <span className="font-medium ml-1">{totalItems} шт</span>
          </li>
        </ul>
      </div>

      <Card className="w-full mt-5 h-[500px] flex items-center justify-center">
        {!canCompare ? (
          <span className="text-muted-foreground font-medium">
            Оберіть 2 алгоритми для порівняння
          </span>
        ) : (
          <CardContent className="w-full h-full p-6">
            <ChartContainer className="w-full px-3 h-full" config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="result.algorithm" />

                  <YAxis yAxisId="left" />

                  <YAxis yAxisId="right" orientation="right" />

                  <Tooltip content={<ChartTooltipContent />} />

                  <Legend />

                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="result.time"
                    name="Час виконання"
                    stroke="red"
                    strokeWidth={2}
                  />

                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="result.operations"
                    name="Кількість операцій"
                    stroke="blue"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        )}
      </Card>
    </>
  );
};

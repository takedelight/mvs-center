import { ALGORITHMS } from '@/shared/constants';
import { Button, Card, CardContent, ChartTooltipContent, Input } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getComparisonResult } from '../model/getComparisonResult';

import { useDebounce } from '@/shared/hooks/useDebounce';
import { ChartContainer } from '@/shared/ui';
import { Check } from 'lucide-react';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const quantityParam = Number(searchParams.get('quantity')) || 100;
  const [quantity, setQuantity] = useState(quantityParam);
  const debouncedQuantity = useDebounce<number>(quantity, 500);

  const algorithmsParam = searchParams.get('alg')
    ? searchParams.get('alg')!.split(',')
    : ['heapSort'];
  const [algorithms, setAlgorithms] = useState<string[]>(algorithmsParam);

  const canCompare = algorithms.length >= 2;
  
  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('quantity', String(debouncedQuantity));
    if (algorithms.length > 0) {
      nextParams.set('algorithm', algorithms.join(','));
    } else {
      nextParams.delete('algorithm');
    }
    setSearchParams(nextParams);
  }, [debouncedQuantity, algorithms]);

  const { data: chartData } = useQuery<ComparisonResponse[]>({
    queryKey: ['admin-tickets', debouncedQuantity, algorithms],
    queryFn: () => getComparisonResult(debouncedQuantity, algorithms),
    refetchOnWindowFocus: false,
    enabled: canCompare && debouncedQuantity > 0,
  });

  const config = {
    time: {
      label: 'Час виконання (мс)',
      color: '#ef4444',
    },
    operations: {
      label: 'Кількість операцій',
      color: '#3b82f6',
    },
  };

  const totalItems = chartData?.[0]?.total ?? 0;

  const handleToggleAlgorithm = (value: string) => {
    setAlgorithms((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  return (
    <>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Кількість елементів</span>
            <div className="relative w-28">
              <Input
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, +e.target.value))}
                type="number"
                min={0}
                className="pr-8 h-9 text-sm rounded-md shadow-sm"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground select-none">
                шт
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <span className="text-xs font-medium text-muted-foreground">Алгоритми сортування</span>
            <ul className="flex flex-wrap items-center gap-2">
              {ALGORITHMS.map((item) => {
                const isActive = algorithms.includes(item.value);
                return (
                  <li key={item.value}>
                    <Button
                      type="button"
                      variant={isActive ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => handleToggleAlgorithm(item.value)}
                      className={`h-9 px-3 text-sm font-normal rounded-md transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-muted text-foreground border-muted-foreground/20 shadow-sm font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {isActive && <Check className="size-3.5 stroke-[2.5]" />}
                      {item.alias}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="text-xs text-muted-foreground font-normal">
          Кількість елементів: <span className="ml-0.5 text-foreground">{totalItems} шт</span>
        </div>
      </div>

      <Card className="w-full mt-5 h-[70vh] flex items-center justify-center border shadow-none rounded-xl bg-background overflow-hidden">
        {!canCompare ? (
          <span className="text-muted-foreground text-sm font-normal">
            Оберіть принаймні 2 алгоритми для порівняння
          </span>
        ) : (
          <CardContent className="w-full h-full p-6">
            <ChartContainer className="w-full h-full" config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    className="stroke-border/60"
                  />
                  <XAxis
                    dataKey="result.algorithm"
                    className="text-[11px] font-medium fill-muted-foreground"
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    yAxisId="left"
                    className="text-[11px] font-medium fill-muted-foreground"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    className="text-[11px] font-medium fill-muted-foreground"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={40}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ className: 'text-xs font-medium pb-4' }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="result.time"
                    name="Час виконання (мс)"
                    stroke="#ef4444"
                    strokeWidth={2.5}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    dot={{ r: 4, stroke: '#ef4444', strokeWidth: 2, fill: 'var(--background)' }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="result.operations"
                    name="Кількість операцій"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    dot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: 'var(--background)' }}
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

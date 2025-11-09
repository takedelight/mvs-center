import { LIMIT } from '@/constants/statements';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Filter } from './ui/Filters';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Loader } from '@/components/ui/loader';

type ApiResponse = {
    time: number;
    comparisions: number;
    method: string;
};

export const StatsPage = () => {
    const [isLimitFilterOpen, setLimitFilterOpen] = useState(true);
    const [isMethodFilterOpen, setMethodFilterOpen] = useState(true);
    const [limit, setLimit] = useState(LIMIT[0].value.toString());
    const [methods, setMethods] = useState<string[]>([]);
    const [isSortedByOpen, setSortedByOpen] = useState(true);
    const [sortedBy, setSortedBy] = useState('createdAt');

    const debauncedMethods = useDebounce(methods, 1000);

    const algorithmParams = new URLSearchParams();
    (function () {
        debauncedMethods.forEach((param) => algorithmParams.append('algorithm', param));
    })();

    const { data, isLoading, isError, refetch } = useQuery<ApiResponse[]>({
        queryKey: ['stats', limit, debauncedMethods, sortedBy],
        queryFn: () =>
            fetch(
                `http://localhost:3000/stats?limit=${limit}&${algorithmParams}&sort_by=${sortedBy}`,
            ).then((res) => res.json()),
        refetchOnWindowFocus: false,
        enabled: debauncedMethods.length > 1,
    });

    const config = {
        time: {
            label: 'Час виконання (ms)',
            color: '#ff0000',
        },
        comparisions: {
            label: 'Кількість порівняння',
            color: '#ff2200',
        },
    };

    return (
        <section className="flex  h-screen overflow-hidden p-2 bg-black/10 items-center justify-center relative">
            <div className="w-[1300px] h-[800px] rounded-sm grid grid-cols-[250px_1fr] bg-neutral-100">
                <Filter
                    isMethodFilterOpen={isMethodFilterOpen}
                    setLimitFilterOpen={setLimitFilterOpen}
                    setMethodFilterOpen={setMethodFilterOpen}
                    limit={limit}
                    setLimit={setLimit}
                    methods={methods}
                    setMethods={setMethods}
                    isSortedByOpen={isSortedByOpen}
                    setSortedByOpen={setSortedByOpen}
                    sortedBy={sortedBy}
                    setSortedBy={setSortedBy}
                    isLimitFilterOpen={isLimitFilterOpen}
                />
                <div className="bg-white  m-3 rounded-md  p-1">
                    {!data && (
                        <div className="h-full flex items-center flex-col  justify-center">
                            <span className="text-muted-foreground">
                                Немає даних для порівняння, буль ласка оберіть декілька алгоритмів
                            </span>
                        </div>
                    )}

                    {isLoading && (
                        <div className="h-full flex items-center flex-col  justify-center">
                            <Loader />
                        </div>
                    )}

                    {!isLoading && !data && (
                        <div className="h-full flex items-center flex-col  justify-center">
                            <span className="text-muted-foreground">
                                Виникла помилка, будь ласка, стпробуйте ще раз
                            </span>
                            <Button onClick={() => refetch()} variant="outline">
                                Спробувати знову
                                <RefreshCw />
                            </Button>
                        </div>
                    )}

                    {data && data.length > 0 && (
                        <ChartContainer config={config}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray={'3 3'} />
                                <Legend />
                                <Tooltip content={<ChartTooltipContent />} />
                                <XAxis dataKey="method" />
                                <YAxis dataKey="comparisions" />
                                <Line type="monotone" dataKey="time" stroke={config.time.color} />
                                <Line
                                    type="monotone"
                                    dataKey="comparisions"
                                    stroke={config.comparisions.color}
                                />
                            </LineChart>
                        </ChartContainer>
                    )}
                </div>
            </div>
        </section>
    );
};

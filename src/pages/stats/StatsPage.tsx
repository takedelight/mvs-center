import { LIMIT } from '@/shared/constants/limit';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Filter } from './ui/Filters';
import {
    ChartContainer,
    ChartTooltipContent,
    Loader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/shared/ui';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '@/shared/ui/button';
import { RefreshCw } from 'lucide-react';
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
                `${import.meta.env.VITE_PUBLIC_API_URL}/stats?limit=${limit}&${algorithmParams}&sort_by=${sortedBy}`,
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
            color: '#0D3B18',
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
                <Tabs
                    defaultValue="chart"
                    className="bg-neutral-100 flex flex-col  gap-2 h-[560px]  m-3 rounded-xl   p-2"
                >
                    <TabsList className="w-full ">
                        <TabsTrigger value="chart">Графік</TabsTrigger>
                        <TabsTrigger value="table">Таблиця</TabsTrigger>
                    </TabsList>

                    <TabsContent value="chart">
                        <div className="bg-neutral-100 rounded-md h-[500px] p-3">
                            {isLoading && (
                                <div className="h-full flex items-center flex-col  justify-center">
                                    <Loader />
                                </div>
                            )}

                            {!isLoading && !data && (
                                <div className="h-full flex items-center flex-col  justify-center">
                                    <span className="text-muted-foreground">Немає даних</span>
                                </div>
                            )}

                            {isError && !data && (
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
                                        <Line
                                            type="monotone"
                                            dataKey="time"
                                            width={2}
                                            strokeWidth={2}
                                            stroke={config.time.color}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="comparisions"
                                            stroke={config.comparisions.color}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="table">
                        {' '}
                        <div className="border  bg-neutral-100 p-3  border-border rounded h-[500px] overflow-auto">
                            <Table className="w-full bg-white h-full divide-y divide-border">
                                <TableHeader>
                                    <TableHead>Метод</TableHead>
                                    <TableHead>Час виконання (ms)</TableHead>
                                    <TableHead>Кількість порівнянь</TableHead>
                                </TableHeader>

                                <TableBody>
                                    {data?.map((item) => (
                                        <TableRow key={item.method}>
                                            <TableCell>{item.method}</TableCell>
                                            <TableCell>{item.time}</TableCell>
                                            <TableCell>{item.comparisions}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ALGORITHMS } from '@/constants/alghoritms';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/ui/loader';
import { Inbox } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { ChartContainer } from '@/components/ui/chart';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { calcPerformance } from '@/helpers/calculatePerformance';

export type ApiResponse = {
    method: string;
    time: number;
    comparisions: number;
};

export const StatsPage = () => {
    const [isOpen, setOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const debouncedCheckedItems = useDebounce<string[]>(checkedItems, 500);

    const { data, isLoading, isError, refetch } = useQuery<ApiResponse[]>({
        queryKey: ['stats', debouncedCheckedItems],
        queryFn: async () => {
            if (!debouncedCheckedItems.length) return [];

            const params = new URLSearchParams();
            debouncedCheckedItems.forEach((alg) => params.append('algorithm', alg));

            const res = await fetch(`http://localhost:3000/stats?${params.toString()}&limit=2200`);
            return res.json();
        },
        enabled: debouncedCheckedItems.length > 0,
        refetchOnWindowFocus: false,
    });

    const performance = useMemo(() => {
        return calcPerformance(data || []);
    }, [data]);

    console.log(performance);

    const handleCheckedChange = (value: string, isChecked: boolean) => {
        setCheckedItems((prev) => (isChecked ? [...prev, value] : prev.filter((v) => v !== value)));
    };

    const config = {
        method: {
            alias: 'Метод',
            color: 'red',
        },
        time: {
            alias: 'Час виконання',
            color: 'black',
        },
        comparisions: {
            alias: 'Кількість порівнянь',
            color: 'green',
        },
    };

    return (
        <section className="h-screen grid place-items-center">
            <div>
                <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground">Оберіть алгоритми для порівняння:</span>

                    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-[150px]" variant="default">
                                {isOpen ? 'Закрити' : 'Відкрити'}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Алгоритми сортування:</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {ALGORITHMS.map((item) => (
                                <DropdownMenuCheckboxItem
                                    key={item.value}
                                    checked={checkedItems.includes(item.value)}
                                    onSelect={(e) => e.preventDefault()}
                                    onCheckedChange={(checked) =>
                                        handleCheckedChange(item.value, checked)
                                    }
                                >
                                    {item.alias}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Card className="mt-2 w-[800px] rounded-sm py-2 h-[500px]">
                    <CardHeader className="px-2">
                        <CardTitle className="text-muted-foreground font-semibold">
                            Графік порівняння роботи алгоритмів сортування:
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="h-full">
                        {isLoading && (
                            <div className=" h-full flex justify-center items-center">
                                <Loader />
                            </div>
                        )}

                        {isError && (
                            <div className="flex justify-center h-full items-center  flex-col">
                                <span className="text-red-500">Щось пішло не так</span>
                                <Button variant="outline" onClick={() => refetch()}>
                                    Перезавантажити
                                </Button>
                            </div>
                        )}

                        {!isLoading && !isError && !data && (
                            <div className="h-full flex flex-col justify-center items-center">
                                <Inbox size={35} />
                                <span>Немає даних для порівняння</span>
                            </div>
                        )}

                        {data && data.length > 0 && (
                            <ChartContainer config={config}>
                                <LineChart data={data}>
                                    <XAxis dataKey="method" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="time"
                                        stroke="#8884d8"
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line type="monotone" dataKey="comparisions" stroke="#82ca9d" />
                                </LineChart>
                            </ChartContainer>
                        )}
                    </CardContent>
                </Card>

                {performance && (
                    <ul>
                        {performance.map((item) => (
                            <li key={item.method}>
                                <span>
                                    {item.method} впорався на {item.efficiency} від найкращого
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

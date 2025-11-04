import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Response, Statement } from '@/types/statement.type.ts';
import { Sorter } from '@/lib/sorter.ts';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';

type SortedData = {
    sortedArray: Statement[];
    time: number;
    comparisons: number;
    complexity: string;
};

const LIMIT = [
    { value: 100, alias: 100 },
    { value: 500, alias: 500 },
    { value: 1000, alias: 1000 },
    { value: 10000, alias: 10000 },
];
const SORT_METHODS = [
    { key: 'heapSort', alias: 'Сортування купою' },
    { key: 'bubbleSort', alias: 'Сортування бульбашкою' },
    { key: 'quickSort', alias: 'Швидке сортування' },
    { key: 'mergeSort', alias: 'Сортування злиттям' },
    { key: 'insertionSort', alias: 'Сортування вставками' },
    { key: 'selectionSort', alias: 'Сортування вибором' },
];

export const StatementTable = () => {
    const [page, setPage] = useState(1);
    const [sortField, setSortField] = useState<'createdAt' | 'priority'>('createdAt');
    const [limit, setLimit] = useState(100);
    const [isOpen, setOpen] = useState(false);
    const [sortedArray, setSortedArray] = useState<null | SortedData>(null);

    const { data, isLoading, isError } = useQuery<Response>({
        queryKey: ['data', page, limit],
        queryFn: () => fetch(`http://localhost:3000/data?limit=${limit}`).then((res) => res.json()),
        refetchOnWindowFocus: false,
        staleTime: 0,
    });

    const tableData = sortedArray?.sortedArray ?? data?.data ?? [];

    const sorter = useMemo(() => new Sorter(data?.data ?? []), [data]);

    const handleSort = (method: string) => {
        const result = sorter[method](sortField);
        setSortedArray(result);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setSortedArray(null);
    };

    return (
        <>
            <div className="flex items-center mb-4 justify-between">
                <div>
                    <span className="text-muted-foreground">Кількість елементів:</span>
                    <ul className="flex items-center gap-1">
                        {LIMIT.map((el) => (
                            <li key={el.alias}>
                                <Button
                                    variant={el.value === limit ? 'default' : 'outline'}
                                    onClick={() => setLimit(el.value)}
                                >
                                    {el.alias}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <span className="text-muted-foreground">Поле за яким сортується:</span>
                    <ul className="flex mt-1 items-center gap-1 ">
                        <li>
                            <Button
                                variant={sortField === 'createdAt' ? 'default' : 'outline'}
                                onClick={() => setSortField('createdAt')}
                            >
                                Дата створення
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant={sortField === 'priority' ? 'default' : 'outline'}
                                onClick={() => setSortField('priority')}
                            >
                                Пріоритет
                            </Button>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Алгоритм сортування:</span>
                    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button>Open</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <ul>
                                {SORT_METHODS.map((item) => (
                                    <DropdownMenuItem>
                                        <li
                                            className="text-center"
                                            onClick={() => handleSort(item.key)}
                                            key={item.alias}
                                        >
                                            {item.alias}
                                        </li>
                                    </DropdownMenuItem>
                                ))}
                            </ul>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="border border-border rounded h-[700px] overflow-auto">
                <Table className="w-full divide-y divide-border">
                    <TableHeader className="sticky top-0 bg-background z-10">
                        <TableRow>
                            <TableHead>Назва</TableHead>
                            <TableHead className="text-center">Тип</TableHead>
                            <TableHead>Клієнт</TableHead>
                            <TableHead>Пріоритет</TableHead>
                            <TableHead className="text-center">Дата створення</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6">
                                    Завантаження...
                                </TableCell>
                            </TableRow>
                        )}

                        {isError && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-red-500">
                                    Помилка при завантаженні
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && data?.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex items-center justify-center flex-col py-6 text-muted-foreground">
                                        <Inbox className="h-8 w-8 mb-2" />
                                        Записів немає
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}

                        {tableData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-center">{item.type}</TableCell>
                                <TableCell>{item.client}</TableCell>
                                <TableCell>{item.priority}</TableCell>
                                <TableCell className="text-center">
                                    {new Date(item.createdAt).toLocaleDateString('uk-UA')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter className="sticky bottom-0 bg-background z-10">
                        <TableRow>
                            <TableCell colSpan={6}>
                                <div className="flex justify-end items-center">
                                    {/*<ul className="flex gap-1 items-center flex-wrap">*/}
                                    {/*    {buttons.map((button) => (*/}
                                    {/*        <li key={button}>*/}
                                    {/*            <Button*/}
                                    {/*                variant="outline"*/}
                                    {/*                disabled={page === button}*/}
                                    {/*                onClick={() => handlePageChange(button)}*/}
                                    {/*            >*/}
                                    {/*                {button}*/}
                                    {/*            </Button>*/}
                                    {/*        </li>*/}
                                    {/*    ))}*/}
                                    {/*</ul>*/}

                                    <p className="text-sm text-muted-foreground">
                                        {/*Сторінка {page} / {data?.totalPages}*/}
                                        Елементів: {data?.total}
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            {sortedArray && (
                <div className="mb-4 text-sm text-muted-foreground text-center">
                    <p>Час сортування: {sortedArray.time} ms</p>
                    <p>Порівнянь: {sortedArray.comparisons}</p>
                    <p>Складність: {sortedArray.complexity}</p>
                </div>
            )}
        </>
    );
};

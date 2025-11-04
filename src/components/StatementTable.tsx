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

type SortedData = {
    sortedArray: Statement[];
    time: number;
    comparisons: number;
    complexity: string;
};

export const StatementTable = () => {
    const [page, setPage] = useState(1);
    const [sortedArray, setSortedArray] = useState<null | SortedData>(null);

    const { data, isLoading, isError } = useQuery<Response>({
        queryKey: ['data', page],
        queryFn: () =>
            fetch(`http://localhost:3001/data?_page=${page}&_per_page=10`).then((res) =>
                res.json(),
            ),
        refetchOnWindowFocus: false,
        staleTime: 0,
    });

    const tableData = sortedArray?.sortedArray ?? data?.data ?? [];

    const buttons = useMemo(() => {
        if (!data) return [];
        return Array.from({ length: data.pages }, (_, i) => i + 1);
    }, [data]);

    const sorter = useMemo(() => new Sorter(data?.data ?? []), [data]);

    const handleSort = (method: keyof Sorter) => {
        const result = sorter[method]();
        setSortedArray(result);
    };

    // Скидання сортування при зміні сторінки
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setSortedArray(null);
    };

    return (
        <>
            <div>
                <span>Поле за яким сортується:</span>
                <ul>
                    <li></li>
                </ul>
            </div>

            <ul className="flex mb-4 justify-center items-center gap-2 ">
                <li>
                    <Button onClick={() => handleSort('heapSort')}>Сортування купою</Button>
                </li>
                <li>
                    <Button onClick={() => handleSort('bubbleSort')}>Сортування бульбашкою</Button>
                </li>
                <li>
                    <Button onClick={() => handleSort('quickSort')}>Швидке сортування</Button>
                </li>
                <li>
                    <Button onClick={() => handleSort('mergeSort')}>Сортування злиттям</Button>
                </li>
                <li>
                    <Button onClick={() => handleSort('insertionSort')}>
                        Сортування вставками
                    </Button>
                </li>
                <li>
                    <Button onClick={() => handleSort('selectionSort')}>Сортування вибором</Button>
                </li>
            </ul>

            {sortedArray && (
                <div className="mb-4 text-sm text-muted-foreground text-center">
                    <p>Час сортування: {sortedArray.time} ms</p>
                    <p>Порівнянь: {sortedArray.comparisons}</p>
                    <p>Складність: {sortedArray.complexity}</p>
                </div>
            )}

            <Table className="border border-border divide-y divide-border">
                <TableHeader>
                    <TableRow>
                        <TableHead>Назва</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Клієнт</TableHead>
                        <TableHead>Пріоритет</TableHead>
                        <TableHead>Дата створення</TableHead>
                        <TableHead>Тривалість (хв)</TableHead>
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
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.client}</TableCell>
                            <TableCell>{item.priority}</TableCell>
                            <TableCell>
                                {new Date(item.createdAt).toLocaleDateString('uk-UA')}
                            </TableCell>
                            <TableCell>{item.duration}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <div className="flex justify-between items-center">
                                <ul className="flex gap-1 items-center flex-wrap">
                                    {buttons.map((button) => (
                                        <li key={button}>
                                            <Button
                                                variant="outline"
                                                disabled={page === button}
                                                onClick={() => handlePageChange(button)}
                                            >
                                                {button}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-sm text-muted-foreground">Сторінка {page}</p>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
};

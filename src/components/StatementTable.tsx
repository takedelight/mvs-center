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
import type { Response } from '@/types/statement.type.ts';

export const StatementTable = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useQuery<Response>({
        queryKey: ['data', page],
        queryFn: () =>
            fetch(`http://localhost:3001/data?_page=${page}&_per_page=10`).then((res) =>
                res.json(),
            ),
        refetchOnWindowFocus: false,
        staleTime: 0,
    });

    const buttons = useMemo(() => {
        if (!data) return [];
        return Array.from({ length: data.pages }, (_, i) => i + 1);
    }, [data?.pages]);

    console.log(buttons);
    return (
        <>
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

                    {data?.data.map((item) => (
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
                                {/*<div className="flex gap-2">*/}
                                {/*    <Button*/}
                                {/*        variant="outline"*/}
                                {/*        disabled={page === 1}*/}
                                {/*        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}*/}
                                {/*    >*/}
                                {/*        <ChevronLeft />*/}
                                {/*    </Button>*/}

                                {/*    <Button*/}
                                {/*        variant="outline"*/}
                                {/*        disabled={!data || page >= data.pages}*/}
                                {/*        onClick={() =>*/}
                                {/*            setPage((prev) => Math.min(prev + 1, data.pages))*/}
                                {/*        }*/}
                                {/*    >*/}
                                {/*        <ChevronRight />*/}
                                {/*    </Button>*/}
                                {/*</div>*/}

                                <ul className="flex gap-1 items-center">
                                    {buttons.map((button) => (
                                        <li key={button}>
                                            <Button
                                                variant="outline"
                                                disabled={page === button}
                                                onClick={() => setPage(button)}
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

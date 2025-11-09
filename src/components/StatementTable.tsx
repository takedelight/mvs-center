import { Table } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { getStatements } from '@/helpers/get-statements';
import { TableHeader } from './table/TableHead';
import { TableBody } from './table/TableBody';
import type { ApiResponse } from '@/types/api.type';
import { TopBar } from './TopBar';
import { useState } from 'react';
import type { SelectedMethod } from '@/types/selected-method.type';
import type { SortedBy } from '@/constants/sorted';

export const StatementTable = () => {
    const [limit, setLimit] = useState(100);
    const [selectedMethod, setSelectedMethod] = useState<SelectedMethod>({
        alias: 'Відкрити',
        value: '',
    });
    const [sortedBy, setSortedBy] = useState<SortedBy>({
        alias: 'Дата створення',
        value: 'createdAt',
    });
    const { data, isLoading, isError, refetch } = useQuery<ApiResponse>({
        queryKey: ['data', limit, selectedMethod.value, sortedBy.value],
        queryFn: () => getStatements(limit, selectedMethod.value, sortedBy.value),
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <TopBar
                setLimit={setLimit}
                limit={limit}
                sortedBy={sortedBy}
                setSortedBy={setSortedBy}
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
            />
            <div className="border border-border rounded max-h-[500px] overflow-auto">
                <Table className="w-full h-full divide-y divide-border">
                    <TableHeader />

                    <TableBody
                        isLoading={isLoading}
                        isError={isError}
                        refetch={refetch}
                        statements={data?.statements ?? null}
                    />
                </Table>
            </div>

            <div className="text-muted-foreground flex justify-end">
                {' '}
                Кількість записів: {data?.length}
            </div>

            {data?.time && data?.comparisions && (
                <div className="flex flex-col gap-1">
                    <span>Метод сортування: {data?.method}</span>
                    <span>Час виконання: {data?.time}</span>
                    <span>Кількість операцій: {data?.comparisions}</span>
                </div>
            )}
        </>
    );
};

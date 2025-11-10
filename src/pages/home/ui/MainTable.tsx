import type { SortedBy } from '@/shared/constants/sorted';
import { getStatements } from '@/shared/helpers/get-statements';
import type { ApiResponse } from '@/shared/types/api.type';
import type { SelectedMethod } from '@/shared/types/selected-method.type';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Table } from '@/shared/ui';
import { TableHeader } from './TableHead';
import { TableBody } from './TableBody';

export const MainTable = () => {
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
            <div className="border border-border rounded h-[80vh] overflow-auto">
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

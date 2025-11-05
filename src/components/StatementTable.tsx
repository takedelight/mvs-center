import { Table } from '@/components/ui/table';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ApiResponse, Statement } from '@/types/statement.type.ts';
import { Sorter } from '@/lib/sorter.ts';
import { TopBar } from '@/components/TopBar.tsx';
import type { SortedValue } from '@/types/sorted.type.ts';
import type { ChartData } from '@/types/chart-data.type';
import { Chart } from './Chart';
import { getStatements } from '@/helpers/get-statements';
import { TableHeader } from './table/TableHead';
import { TableBody } from './table/TableBody';

export type SortedData = {
    sortedArray: Statement[];
    time: number;
    comparisons: number;
    complexity: string;
};

export const StatementTable = () => {
    const [sortField, setSortField] = useState<SortedValue>('createdAt');
    const [limit, setLimit] = useState(100);
    const [chartsData, setChartsData] = useState<ChartData[]>([]);
    const [sortedArray, setSortedArray] = useState<null | SortedData>(null);

    const { data, isLoading, isError, refetch } = useQuery<ApiResponse>({
        queryKey: ['data', limit],
        queryFn: () => getStatements(limit),
        refetchOnWindowFocus: false,
    });

    const sorter = useMemo(() => new Sorter(data?.data ?? []), [data]);
    const tableData = sortedArray?.sortedArray ?? data?.data ?? [];

    return (
        <>
            <TopBar
                limit={limit}
                setLimit={setLimit}
                sortField={sortField}
                sorter={sorter}
                setSortedArray={setSortedArray}
                setSortField={setSortField}
                setChartsData={setChartsData}
            />

            <div className="border border-border rounded max-h-[500px] overflow-auto">
                <Table className="w-full h-full divide-y divide-border">
                    <TableHeader />

                    <TableBody
                        isLoading={isLoading}
                        isError={isError}
                        refetch={refetch}
                        data={tableData}
                    />
                </Table>
            </div>

            {chartsData.length > 0 && <Chart data={chartsData} />}
        </>
    );
};

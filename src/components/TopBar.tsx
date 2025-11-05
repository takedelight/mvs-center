import { Button } from '@/components/ui/button.tsx';
import { type Dispatch, type SetStateAction } from 'react';
import type { SortedValue } from '@/types/sorted.type.ts';
import type { Sorter } from '@/lib/sorter';
import type { SortedData } from './StatementTable';
import type { ChartData } from '@/types/chart-data.type';
import { LimitList } from './LimitList';
import { PriorityList } from './PriorityList';

type Props = {
    limit: number;
    setLimit: Dispatch<SetStateAction<number>>;
    sortField: SortedValue;
    setSortedArray: Dispatch<SetStateAction<SortedData | null>>;
    setSortField: Dispatch<SetStateAction<SortedValue>>;
    setChartsData: Dispatch<SetStateAction<ChartData[]>>;
    sorter: Sorter;
};

export const TopBar = ({
    limit,
    setLimit,
    sortField,
    setSortField,
    sorter,
    setChartsData,
}: Props) => {
    const handleSort = () => {
        const algorithms = [
            { alias: 'Сортування купою', fn: sorter.heapSort },
            { alias: 'Сортування бульбашкою', fn: sorter.bubbleSort },
            { alias: 'Швидке сортування', fn: sorter.quickSort },
            { alias: 'Сортування злиттям', fn: sorter.mergeSort },
            { alias: 'Сортування вставками', fn: sorter.insertionSort },
            { alias: 'Сортування вибором', fn: sorter.selectionSort },
        ];

        const results = algorithms.map(({ alias, fn }) => {
            const { time, comparisons } = fn(sortField);
            return { alias, time, comparision: comparisons };
        });

        setChartsData(results);
    };

    return (
        <div className="flex items-center mb-4 justify-between">
            <LimitList limit={limit} setLimit={setLimit} />

            <PriorityList sortField={sortField} setSortField={setSortField} />

            <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Сортувати:</span>
                <Button onClick={handleSort}>Сортувати</Button>
            </div>
        </div>
    );
};

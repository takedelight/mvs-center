import type { SortedValue } from '@/types/sorted.type';
import { Button } from './ui/button';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
    sortField: SortedValue;
    setSortField: Dispatch<SetStateAction<SortedValue>>;
};
export const PriorityList = ({ setSortField, sortField }: Props) => {
    return (
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
    );
};

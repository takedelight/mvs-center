import { ALGORITHMS } from '@/shared/constants/alghoritms';
import { LIMIT } from '@/shared/constants/limit';
import { SORTED_BY, type SortedBy } from '@/shared/constants/sorted';
import type { SelectedMethod } from '@/shared/types/selected-method.type';
import { Button } from '@/shared/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useState, type Dispatch, type SetStateAction } from 'react';

type Props = {
    selectedMethod: SelectedMethod;
    setSelectedMethod: Dispatch<SetStateAction<SelectedMethod>>;
    limit: number;
    setLimit: Dispatch<SetStateAction<number>>;
    sortedBy: SortedBy;
    setSortedBy: Dispatch<SetStateAction<SortedBy>>;
};
export const TopBar = ({
    selectedMethod,
    setSelectedMethod,
    limit,
    setLimit,
    setSortedBy,
    sortedBy,
}: Props) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="flex justify-between mb-3 items-center">
            <div className="">
                <span>Кількість записів:</span>

                <ul className="flex gap-1 items-center">
                    {LIMIT.map((item) => (
                        <li key={item.value}>
                            <Button
                                onClick={() => setLimit(item.value)}
                                variant={limit === item.value ? 'outline' : 'default'}
                            >
                                {item.alias}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <span>Сортувати за:</span>
                <ul className="flex gap-1 items-center">
                    {SORTED_BY.map((item) => (
                        <li key={item.value}>
                            <Button
                                onClick={() => setSortedBy(item)}
                                variant={sortedBy.value === item.value ? 'outline' : 'default'}
                            >
                                {item.alias}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col">
                <span>Алгоритм сортування:</span>

                <DropdownMenu open={isOpen} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button>{selectedMethod.alias}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <ul>
                            {ALGORITHMS.map((item) => (
                                <DropdownMenuItem
                                    onClick={() => setSelectedMethod(item)}
                                    key={item.value}
                                >
                                    {item.alias}
                                </DropdownMenuItem>
                            ))}
                        </ul>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

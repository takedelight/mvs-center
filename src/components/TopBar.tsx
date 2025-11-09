import { LIMIT } from '@/constants/statements';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useState, type Dispatch, type SetStateAction } from 'react';
import type { SelectedMethod } from '@/types/selected-method.type';
import { SORTED_BY, type SortedBy } from '@/constants/sorted';
import { ALGORITHMS } from '@/constants/alghoritms';

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

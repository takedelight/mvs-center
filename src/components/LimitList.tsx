import type { Dispatch, SetStateAction } from 'react';
import { Button } from './ui/button';
import { LIMIT } from '@/constants/statements';

type Props = {
    limit: number;
    setLimit: Dispatch<SetStateAction<number>>;
};
export const LimitList = ({ limit, setLimit }: Props) => {
    return (
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
    );
};

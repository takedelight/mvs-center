import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ALGORITHMS } from '@/constants/alghoritms';
import { LIMIT } from '@/constants/statements';
import { useDebounce } from '@/hooks/useDebounce';
import { ChevronDown, ChevronUp, MoveLeft, MoveRight } from 'lucide-react';
import { use, useState } from 'react';

export const StatsPage = () => {
    const [isMenuOpen, setMenuOpen] = useState(true);
    const [isLimitFilterOpen, setLimitFilterOpen] = useState(false);
    const [isMethodFilterOpen, setMethodFilterOpen] = useState(false);
    const [limit, setLimit] = useState(LIMIT[0].value.toString());
    const [methods, setMethods] = useState<string[]>(['1', '3']);

    const debauncedMethods = useDebounce(methods, 1000);
    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setMenuOpen((prev) => !prev);
    };

    const handleChange = (value: string, checked: boolean) => {
        setMethods((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
    };

    return (
        <section className="grid h-screen p-2 bg-black/10 place-items-center relative">
            <div className="w-[1300px] h-[800px] rounded-sm grid grid-cols-6 bg-neutral-100">
                <div
                    onClick={() => setMenuOpen(true)}
                    className={`col-start-1 col-end-2 rounded-sm bg-white transition-all ease-in-out duration-150 
          ${isMenuOpen ? 'w-[300px]' : 'w-10'} p-1`}
                >
                    <Button size="icon-sm" onClick={handleOpen} variant="ghost" className="z-10">
                        {isMenuOpen ? <MoveLeft /> : <MoveRight />}
                    </Button>

                    {/*--------------------- Filters -------------------------------------------*/}
                    <div className="px-3 mt-4">
                        <span
                            onClick={() => setLimitFilterOpen((prev) => !prev)}
                            className="text-muted-foreground flex gap-1 items-center select-none font-semibold text-sm transition-all ease-in-out duration-200 hover:text-muted-foreground/80"
                        >
                            {isLimitFilterOpen ? (
                                <ChevronUp size={15} />
                            ) : (
                                <ChevronDown size={15} />
                            )}
                            Кількість елементів:
                        </span>

                        <RadioGroup
                            value={limit}
                            onValueChange={setLimit}
                            className={`transition-[max-height] overflow-hidden flex flex-col gap-1 ml-3 mt-1 ease-in-out duration-300 
                ${isLimitFilterOpen ? 'max-h-40 ' : 'max-h-0'}`}
                        >
                            {LIMIT.map((item) => (
                                <div className="flex gap-1 items-center" key={item.value}>
                                    <RadioGroupItem
                                        value={item.value.toString()}
                                        id={item.value.toString()}
                                    />
                                    <Label htmlFor={item.value.toString()}>{item.value}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="px-3 mt-1">
                        <span
                            onClick={() => setMethodFilterOpen((prev) => !prev)}
                            className="text-muted-foreground flex gap-1 items-center select-none font-semibold text-sm transition-all ease-in-out duration-200 hover:text-muted-foreground/80"
                        >
                            {isMethodFilterOpen ? (
                                <ChevronUp size={15} />
                            ) : (
                                <ChevronDown size={15} />
                            )}
                            Алгоритми для порівняння:
                        </span>

                        <ul
                            className={`transition-[max-height] gap-1 flex flex-col overflow-hidden ml-3 mt-1 ease-in-out duration-300 
                ${isMethodFilterOpen ? 'max-h-40 ' : 'max-h-0'}`}
                        >
                            {ALGORITHMS.map((item) => (
                                <li className="flex items-center gap-2" key={item.value}>
                                    <Checkbox
                                        onCheckedChange={(c) =>
                                            handleChange(item.value, c === true)
                                        }
                                        checked={methods.includes(item.value)}
                                        id={item.value}
                                    />
                                    <Label htmlFor={item.value}>{item.alias}</Label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="col-span-5 flex items-center justify-center  font-bold">
                    http://localhost:5000/data?limit={limit}&method={debauncedMethods.join('&')}
                    &sort_by=createdAt
                </div>
            </div>
        </section>
    );
};

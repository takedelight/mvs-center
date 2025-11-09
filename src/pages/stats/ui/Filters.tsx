import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ALGORITHMS } from '@/constants/alghoritms';
import { SORTED_BY } from '@/constants/sorted';
import { LIMIT } from '@/constants/statements';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Props = {
    isLimitFilterOpen: boolean;
    setLimitFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMethodFilterOpen: boolean;
    setMethodFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    limit: string;
    setLimit: React.Dispatch<React.SetStateAction<string>>;
    methods: string[];
    setMethods: React.Dispatch<React.SetStateAction<string[]>>;
    isSortedByOpen: boolean;
    setSortedByOpen: React.Dispatch<React.SetStateAction<boolean>>;
    sortedBy: string;
    setSortedBy: React.Dispatch<React.SetStateAction<string>>;
};

export const Filter = ({
    isLimitFilterOpen,
    isMethodFilterOpen,
    isSortedByOpen,
    limit,
    methods,
    setLimit,
    setLimitFilterOpen,
    setMethodFilterOpen,
    setMethods,
    setSortedBy,
    sortedBy,
    setSortedByOpen,
}: Props) => {
    const handleChange = (value: string, checked: boolean) => {
        setMethods((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
    };

    return (
        <div className="rounded-sm z-10 w-[250px] p-1 bg-white transition-all ease-in-out duration-150">
            <div className="flex flex-col  mt-4 gap-1 bg-white/20 backdrop-blur-3xl">
                {/* Limit filter */}
                <div className="px-3">
                    <span
                        onClick={() => setLimitFilterOpen((prev) => !prev)}
                        className="flex items-center gap-1 select-none font-semibold text-sm text-muted-foreground transition-all ease-in-out duration-200 hover:text-muted-foreground/80"
                    >
                        {isLimitFilterOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        Кількість елементів:
                    </span>
                    <RadioGroup
                        value={limit}
                        onValueChange={setLimit}
                        className={`flex flex-col gap-1 ml-3 mt-1 overflow-hidden transition-[max-height] ease-in-out duration-300 ${isLimitFilterOpen ? 'max-h-40' : 'max-h-0'}`}
                    >
                        {LIMIT.map((item) => (
                            <div className="flex items-center gap-1" key={item.value}>
                                <RadioGroupItem
                                    value={item.value.toString()}
                                    id={item.value.toString()}
                                />
                                <Label htmlFor={item.value.toString()}>{item.value}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Methods filter */}
                <div className="px-3">
                    <span
                        onClick={() => setMethodFilterOpen((prev) => !prev)}
                        className="flex items-center gap-1 select-none font-semibold text-sm text-muted-foreground transition-all ease-in-out duration-200 hover:text-muted-foreground/80"
                    >
                        {isMethodFilterOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        Алгоритми для порівняння:
                    </span>
                    <ul
                        className={`flex flex-col gap-1 ml-3 mt-1 overflow-hidden transition-[max-height] ease-in-out duration-300 ${isMethodFilterOpen ? 'max-h-40' : 'max-h-0'}`}
                    >
                        {ALGORITHMS.map((item) => (
                            <li className="flex items-center gap-2" key={item.value}>
                                <Checkbox
                                    onCheckedChange={(c) => handleChange(item.value, c === true)}
                                    checked={methods.includes(item.value)}
                                    id={item.value}
                                />
                                <Label htmlFor={item.value}>{item.alias}</Label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SortedBy filter */}
                <div className="px-3">
                    <span
                        onClick={() => setSortedByOpen((prev) => !prev)}
                        className="flex items-center gap-1 select-none font-semibold text-sm text-muted-foreground transition-all ease-in-out duration-200 hover:text-muted-foreground/80"
                    >
                        {isSortedByOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        Поле для сортування:
                    </span>
                    <ul
                        className={`flex flex-col gap-1 ml-3 mt-1 overflow-hidden transition-[max-height] ease-in-out duration-300 ${isSortedByOpen ? 'max-h-40' : 'max-h-0'}`}
                    >
                        <RadioGroup
                            value={sortedBy}
                            onValueChange={setSortedBy}
                            className={`flex flex-col gap-1 mt-1 overflow-hidden transition-[max-height] ease-in-out duration-300 ${isSortedByOpen ? 'max-h-40' : 'max-h-0'}`}
                        >
                            {SORTED_BY.map((item) => (
                                <div className="flex items-center gap-1" key={item.value}>
                                    <RadioGroupItem
                                        value={item.value.toString()}
                                        id={item.value.toString()}
                                    />
                                    <Label htmlFor={item.value.toString()}>{item.alias}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </ul>
                </div>
            </div>
        </div>
    );
};

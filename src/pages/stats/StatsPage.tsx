import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { LIMIT } from '@/constants/statements';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useState, type MouseEvent } from 'react';

export const StatsPage = () => {
    const [isMenuOpen, setMenuOpen] = useState(true);
    const [isLimitFilterOpen, setLimitFilterOpen] = useState(false);
    const [limit, setLimit] = useState(LIMIT);

    const handleOpen = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setMenuOpen((prev) => !prev);
    };

    return (
        <section className=" grid h-screen p-2 relative bg-black/10 place-items-center">
            <div className="w-[1300px] rounded-sm  grid grid-cols-6 bg-neutral-100 h-[800px]">
                <div
                    onClick={() => setMenuOpen(true)}
                    className={`col-start-1  ease-in-out rounded-sm duration-150 transition-all  ${isMenuOpen ? 'w-[300px]' : 'w-10'} p-1 col-end-2 bg-white`}
                >
                    <Button
                        size="icon-sm"
                        onClick={(e) => handleOpen(e)}
                        variant="ghost"
                        className="z-10"
                    >
                        {isMenuOpen ? <MoveLeft /> : <MoveRight />}
                    </Button>

                    <div className=" px-3 mt-4">
                        <div>
                            <span
                                onClick={() => setLimitFilterOpen((prev) => !prev)}
                                className={`text-muted-foreground font-semibold transition-all ease-in-out duration-200 $ text-sm`}
                            >
                                Кількість елементів:
                            </span>

                            <RadioGroup
                                className={`transition-all ease-in-out duration-200 ${isLimitFilterOpen ? 'h-24' : 'h-2'}`}
                                defaultValue={LIMIT[0].value.toString()}
                            >
                                {LIMIT.map((item) => (
                                    <div className="flex gap-1  items-center " key={item.value}>
                                        <RadioGroupItem
                                            value={item.value.toString()}
                                            id={item.value.toString()}
                                        />
                                        <Label htmlFor={item.value.toString()}>{item.value}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

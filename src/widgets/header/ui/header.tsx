import { Link } from 'react-router';
import { UserRound } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui';

export const Header = () => {
    return (
        <header className="shadow-sm py-4">
            <nav className="container mx-auto px-1">
                <Link className={cn(buttonVariants({ variant: 'ghost' }))} to="/signin">
                    <UserRound className="size-5" />
                    Увійти
                </Link>
            </nav>
        </header>
    );
};


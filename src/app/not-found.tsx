import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui';
import { Link } from 'react-router';

export const NotFoundPage = () => {
    return (
        <section className="container flex h-[88vh] flex-col justify-center items-center mx-auto px-1 ">
            <span className="text-5xl">404</span>
            <h1 className="text-2xl"> Сторінку не знайдено</h1>
            <p> Можливо, вона була видалена або адреса введена некоректно.</p>
            <Link to="/" className={cn(buttonVariants({ variant: 'link' }))}>
                На головну
            </Link>
        </section>
    );
};


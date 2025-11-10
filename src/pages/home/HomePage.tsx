import { MainTable } from './ui/MainTable';

export const HomePage = () => {
    return (
        <section className="h-screen grid place-items-center">
            <div className="w-full max-w-5xl">
                <MainTable />
            </div>
        </section>
    );
};

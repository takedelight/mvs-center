import { StatementTable } from '@/components/StatementTable.tsx';

export const App = () => {
    return (
        <section className="h-screen grid place-items-center">
            <div className="w-full max-w-5xl">
                <StatementTable />
            </div>
        </section>
    );
};

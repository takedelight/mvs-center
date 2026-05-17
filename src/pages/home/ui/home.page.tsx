import { CreateTicketForm } from '@/features/create-ticket';
import { lazy } from 'react';

const HomePage = () => {
  return (
    <section className="flex h-[88vh] items-center justify-center">
      <CreateTicketForm />
    </section>
  );
};

export const LazyHomePage = lazy(() => Promise.resolve({ default: HomePage }));

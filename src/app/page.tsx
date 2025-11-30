import { lazy } from 'react';

const App = () => {
  return <></>;
};

export const LazyHomePage = lazy(() => Promise.resolve({ default: App }));

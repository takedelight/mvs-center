import { useEffect, useState } from 'react';

export const useDebouce = (value: string, ms: number) => {
  const [debouncedValue, setDeboucedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboucedValue(value);
    }, ms);

    return () => clearTimeout(timer);
  }, [value, ms]);

  return debouncedValue;
};

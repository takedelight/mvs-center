import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const deleteValue = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    try {
      if (value === initialValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.error(error);
    }
  }, [key, value, initialValue]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | Event) => {
      if (event.type === 'storage' && (event as StorageEvent).key !== key) {
        return;
      }

      try {
        const item = localStorage.getItem(key);
        const newValue = item ? JSON.parse(item) : initialValue;
        setValue(newValue);
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return { value, setValue, deleteValue } as const;
};

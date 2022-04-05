import { useMemo } from 'react';

export const useSearch = <T>(
  data: T[] | undefined,
  text: string,
  [...fields]: Array<keyof T>
) => {
  const searchedData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter((el) => {
      for (const field of fields) {
        const value = el[field];
        if (typeof value === 'string') {
          if (value.indexOf(text) !== -1) {
            return true;
          }
        }
      }
      return false;
    });
  }, [data, text, fields]);

  return { searchedData };
};

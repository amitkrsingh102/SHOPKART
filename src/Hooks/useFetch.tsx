import { useState, useEffect, useMemo } from "react";

// a custom hook to fetch data from a url and return the response in json
// T is the generic type for the useFetch hook
export const useFetch = <T,>(
  url: string
): { data: T | null; done: boolean } => {
  const [data, dataSet] = useState<T | null>(null);
  const [done, doneSet] = useState(false);

  const getData = useMemo(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d: T | null) => {
        dataSet(d);
        doneSet(true);
      });
  }, [url]);

  useEffect(() => {
    getData;
  }, [getData, url]);

  return { data, done };
};

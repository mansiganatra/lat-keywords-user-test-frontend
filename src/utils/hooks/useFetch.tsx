import { useState, useEffect } from 'react';

interface Return {
  res: object | null;
  error: object | string | null;
  isLoading: boolean;
}

const useFetch = (url: string, options?: RequestInit): Return => {
  const [res, setRes] = useState<object | null>(null);
  const [error, setError] = useState<object | string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setRes(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { res, error, isLoading };
};

export default useFetch;

import { useEffect, useState } from "react";

const useFetch = <T>(
  fetchFunc: () => Promise<T>,
  autoFetch: boolean = true
) => {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string | Error>(null);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunc();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : new Error("An error occurred")
      );
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  return { data, loading, error, reset, fetchData };
};
export default useFetch;

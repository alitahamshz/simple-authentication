/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

type ApiFunction<T> = () => Promise<T>;

type UseApiHandlerReturn<T> = {
  data: T | null;
  error: any;
  loading: boolean;
  callApi: () => Promise<void>;
};

export function useApiHandler<T>(
  apiFn: ApiFunction<T>,
  onSuccess?: (data: T) => void
): UseApiHandlerReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFn();
      setData(response);
      onSuccess?.(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, callApi };
}

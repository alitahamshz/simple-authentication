/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useHttp.ts
'use client';

import { useState, useCallback, useRef } from 'react';
import { http } from '@/lib/axiosApi'; // همان רپر Axios که قبلاً ساختیم
import type { AxiosError } from 'axios';

type Method = 'get' | 'post' | 'put' | 'delete';

interface State<T> {
  data?: T;
  isLoading: boolean;
  ok: boolean;
  error?: string;
}

interface UseHttpResult<T, P = any> extends State<T> {
  request: (url: string, payload?: P) => Promise<void>;
  reset: () => void;
}

export function useHttp<T = any, P = any>(
  method: Method
): UseHttpResult<T, P> {
  const [state, setState] = useState<State<T>>({
    data: undefined,
    isLoading: false,
    ok: false,
    error: undefined,
  });
  const isMounted = useRef(true);

  // برای جلوگیری از به‌روزرسانی پس از unmount
  useState(() => () => {
    isMounted.current = false;
  });

  const request = useCallback(
    async (url: string, payload?: P) => {
      setState({ data: undefined, isLoading: true, ok: false, error: undefined });
      try {
        const res = await http[method]<T>(url, payload);
        if (!isMounted.current) return;
        setState({
          data: res.data,
          isLoading: false,
          ok: true,
          error: undefined,
        });
      } catch (err) {
        if (!isMounted.current) return;
        const message =
          (err as AxiosError<{ message?: string }>).response?.data?.message ||
          (err as Error).message ||
          'Unknown error';
        setState({
          data: undefined,
          isLoading: false,
          ok: false,
          error: message,
        });
      }
    },
    [method]
  );

  const reset = useCallback(() => {
    if (!isMounted.current) return;
    setState({ data: undefined, isLoading: false, ok: false, error: undefined });
  }, []);

  return { ...state, request, reset };
}

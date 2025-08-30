/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/fetch/useCustomQuery.ts
"use client";

import { useSession } from "next-auth/react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Params = Record<string, any>;

function buildQueryParams(params?: Params) {
  const query = new URLSearchParams();
  if (!params) return "";

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

const url_setter = (url: string, params?: Params) =>
  `${process.env.NEXT_PUBLIC_API_URL}${url}${buildQueryParams(params)}`;

export function useCustomQuery<T = any>(
  url: string,
  queryKey: string,
  params?: Params,
  options?: UseQueryOptions<T, Error>
) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const router = useRouter();
//   const defaultOptions = {
//     staleTime: 0,
//     cacheTime: 5 * 60 * 1000,
//   };
  return useQuery<T>({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const res = await fetch(url_setter(url, params), {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `${token}` : "",
        },
      });

      if (res.status === 401) {
        toast.error("لطفاً دوباره وارد شوید");
        router.push("/auth/signout");
        throw new Error("Unauthorized");
      }

      if (!res.ok) {
        const text = await res.text();
        toast.error(text || `خطا در دریافت اطلاعات (${res.status})`);
        throw new Error(text);
      }

      return res.json();
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 0,
    // cacheTime: options?.cacheTime ?? 5 * 60 * 1000,
    // ...defaultOptions,
    ...options,
  });
}

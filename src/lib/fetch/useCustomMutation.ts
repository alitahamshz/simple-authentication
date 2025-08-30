/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/fetch/useCustomMutation.ts
'use client';

import { useSession } from "next-auth/react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Params = Record<string, any>;
type Method = "POST" | "PUT" | "DELETE";

function buildQueryParams(params?: Params) {
  if (!params) return "";
  const query = new URLSearchParams();

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
// ${process.env.NEXT_PUBLIC_API_URL}

export function useCustomMutation<T = any>(
  url: string,
  method: Method = "POST",
  params?: Params,
  options?: UseMutationOptions<T, Error, any>
) {
  const { data: session } = useSession();
  const token = session?.accessToken; // ← ساختار session خودتو بررسی کن
  const router = useRouter();

  return useMutation<T, Error, any>({
    mutationFn: async (body) => {
      const res = await fetch(url_setter(url, params), {
        method,
        headers: {
          "Content-Type": "application/json",
           Authorization: token ? `${token}` : "",
        },
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        toast.error("دسترسی ندارید، لطفاً دوباره وارد شوید");
        router.push("/auth/signout");
        throw new Error("Unauthorized");
      }

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.message || `خطا: ${res.status}`);
        throw new Error(result?.message);
      }

      toast.success("عملیات با موفقیت انجام شد");
      return result;
    },
    ...options,
  });
}

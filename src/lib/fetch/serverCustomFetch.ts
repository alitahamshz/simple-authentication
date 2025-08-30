/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const urlSetter = (url: string) => `${process.env.NEXT_PUBLIC_API_URL}${url}`;

type FetchOptions = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  cache?: RequestCache;
};

export async function customServerFetch({
  url,
  method = "GET",
  body,
  cache = "no-store",
}: FetchOptions) {
  const session = await auth();

  // ✅ اگر session نداشت، مستقیم redirect کن
  // if (!session?.accessToken) {
  //   throw redirect("/home");
  // }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `${session?.accessToken}`,
  };

  const fetchUrl = urlSetter(url);

  const options: RequestInit = {
    method,
    cache,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(fetchUrl, options);

  // ✅ اگر 401 بود، redirect کن (throw نه return)
  if (response.status === 401) {
    throw redirect("/auth/signout");
  }

  // ✅ اگر پاسخ غیرموفق بود، لاگ بگیر و null برگردون
  if (!response.ok) {
    try {
      const text = await response.text();
      console.error(`API Error [${response.status}] @ ${url}:`, text);
    } catch (err) {
      console.error(`API Error [${response.status}] @ ${url}:`, err);
    }
    return null;
  }

  // ✅ اگر موفق بود، json برگردون
  try {
    return await response.json();
  } catch (err) {
    console.error("JSON parse failed:", err);
    return null;
  }
}


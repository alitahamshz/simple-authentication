/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/fetchClient.ts
'use server';

import { cookies } from 'next/headers';
import { toast } from 'react-hot-toast';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  successMessage?: string;
  headers?: Record<string, string>;
};

export async function fetchClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('access_token')?.value;

  const { method = 'GET', body, successMessage, headers } = options;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      handleError(response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (typeof window !== 'undefined' && method !== 'GET') {
      toast.success(
        successMessage || `عملیات با موفقیت انجام شد (${response.status})`
      );
    }

    return result as T;
  } catch (error) {
    if (typeof window !== 'undefined') {
      toast.error('خطایی رخ داده است.');
    }
    throw error;
  }
}

function handleError(status: number) {
  if (typeof window === 'undefined') return;

  switch (status) {
    case 400:
      toast.error('درخواست نامعتبر است.');
      break;
    case 401:
      toast.error('لطفاً وارد حساب کاربری خود شوید.');
      break;
    case 403:
      toast.error('شما مجوز دسترسی ندارید.');
      break;
    case 404:
      toast.error('منبع مورد نظر یافت نشد.');
      break;
    case 500:
      toast.error('خطای داخلی سرور.');
      break;
    default:
      toast.error('خطایی رخ داده است.');
  }
}

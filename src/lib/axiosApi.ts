/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/api.ts
import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-hot-toast';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  response => {
    // می‌توانید متناسب با status code پیام موفقیت بدهید
    if (response.status >= 200 && response.status < 300) {
      toast.success(`عملیات با موفقیت انجام شد (${response.status})`);
    }
    console.log({response})
    return response;
  },
  (error: AxiosError) => {
    // اگر پاسخ از سرور آمده
    if (error.response) {
      const code = error.response.status;
      const msg =
        // error?.response?.data?.message ||
        `خطایی با کد ${code} رخ داد`;
      // نمایش پیغام خطا
      toast.error(msg);
      // می‌توانید روی هر کد خاص لوپ کنید یا رفتار متفاوت داشته باشید
      switch (code) {
        case 400:
          // مثال: داده نامعتبر
          break;
        case 401:
          // مثال: نیاز به لاگین
          break;
        case 404:
          // مثال: پیدا نشد
          break;
        // …
      }
    } else {
      // خطای شبکه یا timeout
      toast.error('ارتباط با سرور ممکن نیست');
    }
    return Promise.reject(error);
  }
);

export default api;


export const http = {
  get:    <T>(url: string, params?: any) => api.get<T>(url, { params }),
  post:   <T>(url: string, data?: any) => api.post<T>(url, data),
  put:    <T>(url: string, data?: any) => api.put<T>(url, data),
  delete: <T>(url: string) => api.delete<T>(url),
};
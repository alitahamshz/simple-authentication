/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/axios.ts

import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
// import { cookies } from "next/headers";

// const token = (await cookies()).get("access_token")?.value;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // authorization: `Bearer ${token}`,
  },
  // withCredentials: true, // اگر نیاز به ارسال کوکی یا احراز هویت داری
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // const method = response.config.method?.toUpperCase();
    // اگر successMessage مشخص شده بود، همون رو نمایش بده
    const customMessage = (response.config as any).successMessage;
    // console.log({ method, response });
    // نمایش پیام موفقیت برای متدهایی غیر از GET
    if (typeof window !== "undefined") {
      toast.success(
        customMessage || `عملیات با موفقیت انجام شد (${response.status})`
      );
    }

    return response;
  },
  (error: AxiosError) => {
    if (typeof window !== "undefined") {
      const status = error.response?.status;

      switch (status) {
        case 400:
          toast.error("درخواست نامعتبر است.");
          break;
        case 401:
          toast.error("لطفاً وارد حساب کاربری خود شوید.");
          break;
        case 403:
          toast.error("شما مجوز دسترسی ندارید.");
          break;
        case 404:
          toast.error("منبع مورد نظر یافت نشد.");
          break;
        case 500:
          toast.error("خطای داخلی سرور.");
          break;
        default:
          toast.error("خطایی رخ داده است.");
      }
    }

    return Promise.reject(error);
  }
);

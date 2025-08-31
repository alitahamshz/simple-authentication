import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";

// سفارشی سازی اینترفیس
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  successMessage?: string;
  showToast?: boolean; // فلگ برای کنترل نمایش toast
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as CustomAxiosRequestConfig;
    
    if (typeof window !== "undefined" && config.showToast !== false) {
      toast.success(config.successMessage || "عملیات با موفقیت انجام شد");
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
          toast.error("خطای سرور.");
          break;
        default:
          toast.error("خطایی رخ داده است.");
      }
    }

    return Promise.reject(error);
  }
);
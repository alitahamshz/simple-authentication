"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetOrdersApi } from "@/services/user";
import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function Done() {
    const { data: session } = useSession();
    const isLoggedIn = !!session?.accessToken;
  const { data: orders } = useGetOrdersApi({
    status: "انجام شده",
  },isLoggedIn);
   if (!isLoggedIn) {
    return (
      <div className="w-full bg-white flex flex-col p-3 rounded-2xl mb-4 text-center font-bold text-sm">
        برای مشاهده سفارشات وارد حساب کاربری خود شوید!
      </div>
    );
  }
  if (!orders?.data?.data?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} // قبل از نمایش
        animate={{ opacity: 1, y: 0 }} // بعد از mount
        exit={{ opacity: 0, y: 20 }} // هنگام خروج (اختیاری)
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full bg-white flex flex-col p-3 rounded-2xl mb-4 text-center font-bold text-sm"
      >
        <p>سفارش انجام شده ای ندارید</p>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // قبل از نمایش
      animate={{ opacity: 1, y: 0 }} // بعد از mount
      exit={{ opacity: 0, y: 20 }} // هنگام خروج (اختیاری)
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="w-full bg-white flex flex-col p-3 rounded-2xl mb-4">
        <div className="flex flex-row justify-between mb-3">
          <div className="flex gap-2 text-sm text-[#616161]">
            <span>سفارش: </span>
            <span>12 مرداد 1404</span>
          </div>
        </div>
        <Separator />
        <div className="w-full flex flex-col gap-2 mt-4 mb-4">
          <span className="font-bold">خشکشویی- 8 تکه لباس(26006)</span>
          <span>
            <span className="text-[#616161] text-sm ml-1">مبلغ</span>
            <span>7,200,000</span>
            <span className="text-[#616161] text-sm mr-1 ">تومان</span>
          </span>
          <span>
            <span className="text-[#616161] text-sm ml-1">شعبه </span>
            <span>قصرالدشت</span>
          </span>
        </div>
        <div className="w-full flex justify-between gap-2">
          <Button className="flex-1 bg-[#E4EBF0] rounded-xl text-foreground h-11">
            مشاهده جزییات
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Separator } from "@/components/ui/separator";
import { useGetOrdersApi } from "@/services/user";
import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { formatPrice, toPersianDate } from "@/utils/utils";

export default function Done() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.accessToken;
  const { data: orders } = useGetOrdersApi(
    {
      status: "لغو شده",
    },
    isLoggedIn
  );
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
        <p>سفارش لغو شده ای ندارید</p>
      </motion.div>
    );
  }
  return (
    <>
      {orders?.data?.data?.map((order: any, idx: number) => (
        <div key={idx} className="w-full bg-white flex flex-col p-3 rounded-2xl mb-4 gap-1">
          <div className="flex flex-row justify-between mb-3">
            <div className="flex gap-2 text-sm text-[#616161]">
              <span>سفارش: </span>
              <span>{toPersianDate(order.order_schedule[0].date)}</span>
            </div>
          </div>
          <Separator />
          {/* <div className="w-full flex flex-col gap-2 mt-4 mb-4">
          <span className="font-bold">خشکشویی- 8 تکه لباس(26006)</span>
          <span>
            <span className="text-[#616161] text-sm ml-1">شعبه </span>
            <span>قصرالدشت</span>
          </span>
        </div> */}
          {order.order_item.map((service: any, idx: number) => (
            <div className="w-full flex flex-col gap-2" key={idx}>
              <span className="font-bold">{service.product.name}</span>
              <span>
                <span className="text-[#616161] text-sm ml-1">مبلغ</span>
                <span>{formatPrice(Number(service.price))}</span>
                <span className="text-[#616161] text-sm mr-1 ">تومان</span>
              </span>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

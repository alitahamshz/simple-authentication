/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useState } from "react";
import { DrawerNoneTrigger } from "../common/DrawerNoneTrigger";
import Link from "next/link";
import { useGetOrdersApi, useDeleteOrderApi } from "@/services/user";

import { formatPrice, toPersianDate } from "@/utils/utils";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";

export default function Done() {
  const [open, setOpen] = useState(false);
  const [recordId, setRecordId] = useState<number>();
  console.log({ recordId });
  const { data: session } = useSession();
  const isLoggedIn = !!session?.accessToken;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate, isPending, error, isSuccess, data } =
    useDeleteOrderApi(recordId);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetOrdersApi(
    {
      status: "در حال انجام",
    },
    isLoggedIn
  );

  const setIdForDelete = (id: number) => {
    setRecordId(id);
  };
  const submit = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          if (refetch) refetch();
          setOpen(false);
        },
      }
    );
  };
  if (!isLoggedIn) {
    return (
      <div className="w-full bg-white flex flex-col p-3 rounded-2xl mb-4 text-center font-bold text-sm">
        برای مشاهده سفارشات وارد حساب کاربری خود شوید!
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full bg-white flex flex-col p-3 rounded-2xl mb-4 text-center font-bold text-sm">
        <p>در حال دریافت اطلاعات</p>
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
        className="w-full flex gap-3 flex-col p-3 justify-center items-center rounded-2xl mb-4 text-center font-bold text-sm"
      >
        <Image
          alt="no-order"
          src="/img/icons/no-order.png"
          width={136}
          height={165}
        ></Image>
        <span className="text-xl font-bold">سفارشی درحال انجام نیست</span>
        <span className="font-md text-gray-500">
          ثبت سفارش جدیدی انجام بده و از خدمات ما لذت ببر!
        </span>
        <Link href="/order" className="mt-5">
          <Button size={"lg"} className="text-lg rounded-xl h-11">
            <Plus size={32} />
            ثبت سفارش جدید
          </Button>
        </Link>
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
      {orders?.data?.data?.map((order: any, idx: number) => (
        <div
          key={idx}
          className="w-full bg-white flex flex-col p-3 rounded-2xl mb-4"
        >
          <div className="flex flex-row justify-between mb-3">
            <div className="flex gap-2 items-center">
              {/* <Image
                src="/img/icons/done.png"
                width={24}
                height={24}
                alt="done"
              ></Image> */}
              <div className="bg-grayBg rounded-md px-1">
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 text-grayBg animate-spin dark:text-gray-600 fill-laundry"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>

              <span className="text-[#616161] text-sm">{order.status}</span>
            </div>
            <div className="flex gap-2 text-sm text-[#616161]">
              <span>سفارش: </span>
              <span>{toPersianDate(order.order_schedule[0].date)}</span>
            </div>
          </div>
          <Separator />
          <div className="w-full flex flex-col gap-2 mt-4 mb-4">
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
            {/* <span>
              <span className="text-[#616161] text-sm ml-1">شعبه </span>
              <span>قصرالدشت</span>
            </span> */}
            <span className="mt-4">
              <span className="text-[#616161] text-sm ml-1">آدرس تحویل : </span>
              <span>{order.user_location.address}</span>
            </span>
          </div>
          <div className="w-full flex justify-between gap-2">
            <Button
              onClick={() => {
                setOpen(true);
                setIdForDelete(order?.id);
              }}
              className="flex-1 bg-[#E4EBF0] rounded-xl text-foreground h-11"
            >
              لغو سفارش
            </Button>
            <Link className="flex-1" href="/orders/1">
              <Button className="w-full bg-foreground rounded-xl h-11">
                جزییات سفارش{" "}
              </Button>
            </Link>
          </div>
        </div>
      ))}

      <DrawerNoneTrigger open={open} onOpenChange={setOpen}>
        <div className="w-full flex flex-col text-center items-center justify-center">
          <Image
            src="/img/icons/cancel.png"
            width={156}
            height={156}
            alt="cencel"
          ></Image>
          <span className="font-[900] text-xl mb-2">لغو سفارش ؟</span>
          <span>میخوای سفارشت رو لغو کنی ؟</span>
          <div className="w-full flex justify-between gap-2 p-4">
            <Button
              onClick={() => setOpen(false)}
              className="flex-1 bg-white rounded-xl text-foreground h-11"
            >
              خیر، برگرد
            </Button>
            <Button
              disabled={isPending}
              onClick={() => submit()}
              className="flex-1 bg-foreground rounded-xl h-11"
            >
              {isPending && (
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 text-white animate-spin dark:text-gray-600 fill-laundry"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              بله، لغو کن{" "}
            </Button>
          </div>
        </div>
      </DrawerNoneTrigger>
    </motion.div>
  );
}

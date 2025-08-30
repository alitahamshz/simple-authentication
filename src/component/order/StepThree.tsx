/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import { Plus } from "lucide-react";
// import AddressForm from "./AddressForm";
import { DrawerNoneTrigger } from "../common/DrawerNoneTrigger";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useUserAddressesApi } from "@/services/user";
const AddressForm = dynamic(() => import("./AddressForm"), {
  ssr: false,
});
import { useSession } from "next-auth/react";

export default function AddressSelection({
  selectedAddressId,
  onSelectAddress,
}: {
  selectedAddressId: string | null;
  onSelectAddress: (addressId: string) => void;
}) {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.accessToken;
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: addresses, isLoading, isSuccess, refetch } = useUserAddressesApi(undefined,isLoggedIn);
  console.log({ addresses });
  const [open, setOpen] = React.useState<boolean>(false);
   if (!isLoggedIn) {
    return (
      <div className="text-center text-gray-800 font-semibold">
        برای مشاهده و انتخاب آدرس باید وارد حساب کاربری شوید.
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // قبل از نمایش
      animate={{ opacity: 1, y: 0 }} // بعد از mount
      exit={{ opacity: 0, y: 20 }} // هنگام خروج (اختیاری)
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        آدرس خود را انتخاب کنید
      </h2>
      <div className="space-y-4">
        {addresses?.data?.length ? (
          addresses?.data?.map((address: any) => (
            <div
              key={address.id}
              className={`border rounded-xl p-5 transition-all cursor-pointer
              ${
                selectedAddressId === address.id
                  ? "border-laundry"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => onSelectAddress(address.id)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-800">
                  {address.title}
                </h3>
                {selectedAddressId === address.id && (
                  <div className="bg-laundry text-white text-xs px-2 py-1 rounded-full">
                    انتخاب شده
                  </div>
                )}
              </div>
              <p className="mt-2 text-gray-600">{address.address}</p>
              <p className="mt-2 text-sm text-gray-500">
                تلفن: {address.phone}
              </p>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center">تاکنون آدرسی ثبت نکرده اید!</div>
        )}

        <div
          onClick={() => setOpen(true)}
          className="bg-[#E4EBF0] border border-dashed rounded-xl p-5 text-center flex justify-center gap-2 cursor-pointer hover:bg-gray-50"
        >
          <Plus />
          <span className=" font-medium"> افزودن آدرس جدید</span>
        </div>
        <DrawerNoneTrigger
          dismissible={false}
          closeable
          open={open}
          onOpenChange={setOpen}
          className="bg-white !h-screen !max-h-[100%] !rounded-none"
        >
          <div className="h-full w-full">
            <AddressForm refetch={refetch} setOpen={(value) => setOpen(value)}/>
          </div>
        </DrawerNoneTrigger>
      </div>
    </motion.div>
  );
}

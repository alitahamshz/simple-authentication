
"use client";

import React from "react";
import { Plus } from "lucide-react";
import { DrawerNoneTrigger } from "@/component/common/DrawerNoneTrigger"
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
const AddressForm = dynamic(() => import('@/component/order/AddressForm'), {
    ssr: false,
});

import { useUserAddressesApi } from "@/services/user"
// import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton"
import CustomButton from "@/component/common/CustomButton";

type addressType = { id: number, address: string, lat: number, long: number, detail: string }

export default function AddressSelection() {
    // const { data: session } = useSession();
    const [open, setOpen] = React.useState<boolean>(false)
    const [editData, setEditData] = React.useState<addressType | null>()
    const { data, isLoading, refetch } = useUserAddressesApi();


    return (
        <motion.div
            className="pb-26 pt-26 mx-auto w-[90%] max-w-[480px]"
            initial={{ opacity: 0, y: 20 }}   // قبل از نمایش
            animate={{ opacity: 1, y: 0 }}    // بعد از mount
            exit={{ opacity: 0, y: 20 }}     // هنگام خروج (اختیاری)
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <h2 className="text-xl font-bold text-gray-800 mb-6">
                آدرس های شما
            </h2>
            <div className="space-y-4  bg-white px-2 py-4 w-full rounded-2xl">
                {isLoading && (
                    <>
                        <Skeleton className="h-[130px] w-full rounded-lg" />
                        <Skeleton className="h-[130px] w-full rounded-lg" />
                        <Skeleton className="h-[130px] w-full rounded-lg" />
                    </>

                )}
                {!isLoading && data?.data?.map((address: addressType) => (
                    <div
                        key={address.id}
                        className={`border flex flex-col w-full gap-4 rounded-xl p-5 transition-all cursor-pointer`}

                    >
                        <p className="mt-2 text-gray-600">
                            {address.address}</p>
                        <p className="mt-2 text-gray-600">
                            <span className="font-bold">
                                توضیحات:{" "}
                            </span>
                            {address?.detail}</p>
                        <div className="flex flex-row justify-between gap-4">
                            <CustomButton onClick={() => {
                                setOpen(true)
                                setEditData(address)
                            }} className="flex-1 bg-grayBg text-foreground rounded-2xl font-bold" defaultText="ویرایش" loadingText="" isLoading={false} />
                            <CustomButton className="flex-1 rounded-2xl  font-bold" defaultText="حذف" loadingText="" isLoading={false} />
                        </div>
                    </div>
                ))}
                <div onClick={() => {
                    setEditData(null)
                    setOpen(true)
                }
                } className="bg-[#fff] w-full h-11 border border-laundry border-dashed rounded-lg p-2 text-center flex justify-center gap-2 cursor-pointer hover:bg-gray-50">
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
                    <div
                        className="h-full w-full"
                    >
                        <AddressForm editData={editData} setOpen={setOpen} refetch={refetch} />
                    </div>
                </DrawerNoneTrigger>

            </div>
        </motion.div>
    );
}

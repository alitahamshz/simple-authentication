
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon, LogOut, Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import SignOutButton from "./SignOutButton";
import { auth } from "@/lib/auth";
import { getUserInfoApi } from "@/services/public";
import { DrawerDemo } from "@/component/common/Drawer";
import Link from "next/link";

export default async function Profile() {
  const data = await getUserInfoApi();
  const session = await auth();
  if (!session?.accessToken) return <p>برای مشاهده این بخش باید وارد شوید</p>;

  return (
    <>
      <div className="flex flex-col bg-white rounded-2xl mt-24 mb-24 p-4 mx-auto w-[90%] max-w-[480px]">
        <div className="w-full flex flex-row justify-between items-center mb-4">
          <div className="flex flex-col gap-2">
            <span className="font-[900]">
              {session?.user?.first_name && session?.user?.last_name
                ? session?.user?.first_name + " " + session?.user?.last_name
                : "کاربر مهمان"}
            </span>
            <span className="font-[900]">{session?.user?.id}</span>
            <span className="font-[900]">{data?.data?.phone_number}</span>
            <div className="flex items-center justify-center gap-1">
              <Image
                src="/img/icons/star.png"
                width={18}
                height={18}
                alt="start"
              ></Image>
              <span className="text-[#616161]">امتیاز شما : 214</span>
            </div>
          </div>
          <Link href='/profile/user' className="ml-2">
          <Pencil className="text-gray-700" />
          </Link>
        </div>

        <Separator className="bg-[#E4EBF0]" />

        <div className="w-full flex flex-row justify-between items-center py-5">
          <Link className="w-full flex justify-between" href='/profile/addresses'>
          <span className="text-md">آدرس های من</span>
          <ChevronLeftIcon />
          </Link>
        </div>
        <Separator className="bg-[#E4EBF0]" />
        <div className="w-full flex flex-row justify-between items-center py-5">
          <span className="text-md">کیف پول</span>
          <ChevronLeftIcon />
        </div>
        <Separator className="bg-[#E4EBF0]" />
        <div className="w-full flex flex-row justify-between items-center py-5">
          <span className="text-md">سفارشات در حال انجام</span>
          <ChevronLeftIcon />
        </div>
        <Separator className="bg-[#E4EBF0]" />
        <div className="w-full flex flex-row justify-between items-center py-5">
          <span className="text-md">پشتبانی و سوالات متداول</span>
          <ChevronLeftIcon />
        </div>
        <Separator className="bg-[#E4EBF0]" />
        <div className="w-full flex flex-row justify-between items-center py-5">
          <span className="text-md">قوانین و حریم خصوصی</span>
          <ChevronLeftIcon />
        </div>
        <Separator className="bg-[#E4EBF0]" />
        <DrawerDemo
          trigger={
            <div className="w-full flex flex-row justify-between items-center py-5">
              <span className="text-md text-laundry font-[900]">خروج</span>
              <LogOut />
            </div>
          }
        >
          <SignOutButton />
        </DrawerDemo>
      </div>
    </>
  );
}

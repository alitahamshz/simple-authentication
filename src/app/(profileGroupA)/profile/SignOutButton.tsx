"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";
// import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col justify-between items-center py-5 px-8 gap-3">
      <p className="font-[900] text-xl">
        آیا میخواهید خارج شوید؟
      </p>
      <p className="text-center text-gray-500">
        با خروج از حساب، همچنان اطلاعات شما محفوظ می‌ماند. برای ورود دوباره، فقط کافیست شماره موبایل‌تان را وارد کنید.
      </p>
      <div className="w-full flex flex-row gap-2">
        {/* <Button className="flex flex-1 flex-row text-md h-11 rounded-lg text-foreground bg-gray-300">
          <span className="text-lg ">برگشت</span>
          
        </Button> */}
        <Button onClick={() =>router.push('/auth/signout')} className="flex flex-1 flex-row text-md h-11 rounded-lg">
          <span className="text-lg">خروج از حساب کاربری</span>
          <LogOut size={36} />
        </Button>

      </div>
    </div>
  );
}

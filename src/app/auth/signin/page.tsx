/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import SignInForm from "@/component/auth/signin/LoginForm";

export default function SignIn() {
  const [phone_number, setPhone_number] = useState("");
  const [user, setUser] = useState<number | undefined>();

  return (
    <div className="bg-[#E4EBF0] dark:bg-gray-900 px-6 flex flex-row justify-center items-center h-screen">
      <div className="w-lg bg-white dark:bg-gray-800 rounded-4xl flex flex-col items-center py-10 px-4 gap-4 shadow-xl">
        <Image src="/img/logo.png" width={114} height={40} alt="bitime"></Image>
        <span className="font-bold text-[22px]">ورود/ثبت نام</span>
       
          <SignInForm
            onSuccess={function (
              flag: number,
              phone: string,
              userId?: number
            ): void {
              console.log({ flag });
              setPhone_number(phone);
              setUser(userId);
              // throw new Error("Function not implemented.");
            }}
          />
       
       
        
      </div>
    </div>
  );
}

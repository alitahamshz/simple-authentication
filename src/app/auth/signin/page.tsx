"use client";

import Image from "next/image";
import React from "react";
import SignInForm from "@/component/auth/signin/LoginForm";
import ProtectedRoute from "@/component/common/ProtectedRoute";
export default function SignIn() {
  return (
    <ProtectedRoute requireAuth={false}>
      <div className="bg-[#E4EBF0] dark:bg-gray-900 px-6 flex flex-row justify-center items-center h-screen">
        <div className="w-lg bg-white dark:bg-gray-800 rounded-4xl flex flex-col items-center py-10 px-4 gap-4 shadow-xl">
          <Image
            src="/img/logo.png"
            width={114}
            height={40}
            alt="bitime"
          ></Image>
          <span className="font-bold text-[22px]">ورود/ثبت نام</span>

          <SignInForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}

// import {
//   BellRing,
//   UserRound
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
import React, { ReactNode } from "react";
import Navigation from "@/component/common/Navigation";
// import ThemeSwitcher from '@/component/theme/ThemeSwitcher';
import Header from "@/component/common/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-full flex flex-col items-center bg-[#e4ebf0] gap-10">
        <Header />
        {children}
        <Navigation />
      </div>
    </>
  );
}

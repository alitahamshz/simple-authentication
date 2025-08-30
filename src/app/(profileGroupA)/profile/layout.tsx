
// import Image from "next/image";
// import Link from "next/link";
import React, { ReactNode } from "react";
import Navigation from "@/component/common/Navigation";
import Header from "@/component/common/Header";
// import ThemeSwitcher from '@/component/theme/ThemeSwitcher';
export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen items-center bg-[#E4EBF0] gap-10">

        <Header />

        {children}

        <Navigation />


      </div>
    </>
  );
}

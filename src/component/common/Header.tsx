import { BellRing, CircleUserRound, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@/lib/auth";
import { DrawerDemo } from "./Drawer";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const session = await auth();
  console.log("Session:", session);
  return (
    <>
      <div
        id="StickyHeader"
        className="fixed top-2 z-20 shadow-xl max-w-[480px] w-[90%] flex flex-row justify-between m-3 bg-white p-4 rounded-xl"
      >
        {session?.accessToken && (
          // <Link href="/profile">
          //   <UserRound size={28} className="bg-gray-200 user-ring-animation" />
          // </Link>
          <Link href="/profile">

            <UserRound
              size={30}
              className="bg-gray-200 p-1 rounded-full relative z-10 shadow border-green-500 border-2"
            />

          </Link>
        )}
        {!session?.accessToken && (
          <DrawerDemo
            trigger={
              <UserRound size={28} className="bg-gray-200 p-1 rounded-md" />
            }
          >
            <div className="flex flex-col w-full justify-center items-center py-8 px-2 gap-4">
              <CircleUserRound size={'48px'} className="text-laundry text-[48px] rounded-full shadow" />
              <p className="font-[700] text-lg">
                برای استفاده از تمامی امکانات وارد شوید.
              </p>
              <Link href={"/auth/signin"}>
                <Button className="px-8 h-11 font-[900] font-md">ورود به بی تایم</Button>
              </Link>
            </div>
          </DrawerDemo>

        )}
        <Link href="/home">
        <Image src="/img/logo.png" width={110} height={25} alt="bitime"></Image>
        </Link>
        <div className="flex gap-1">
          {/* <ThemeSwitcher /> */}
          <Link href="/notifications" className={`${!session?.accessToken && "hidden"}`}>
            <BellRing size={28} className="bg-gray-200 p-1 rounded-md" />
          </Link>
        </div>
      </div>
    </>
  );
}

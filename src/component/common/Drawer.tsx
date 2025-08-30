"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
export function DrawerDemo({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  return (
    <Drawer >
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[550px] w-[100%] bg-[#E4EBF0]">
        <DrawerTitle>
        </DrawerTitle>
        {children}
      </DrawerContent>
    </Drawer>
  );
}

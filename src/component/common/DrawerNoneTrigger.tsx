"use client"

import * as React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer"
import { X } from "lucide-react"
import clsx from "clsx"
// import { useRealViewportHeight } from "@/hooks/useRealViewportHeight";

export function DrawerNoneTrigger({
  children,
  open,
  onOpenChange,
  dismissible,
  closeable,
  className
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  dismissible?:boolean
  closeable?:boolean
  className?:string
}) {
    // const realHeight = useRealViewportHeight();

  return (
    <Drawer open={open} onOpenChange={onOpenChange} dismissible={dismissible}>
      <DrawerContent 
      // style={{height: realHeight}}
      className={clsx(
          "mx-auto max-w-[550px] w-full rounded-t-[30px] bg-[#E4EBF0]", // ← پیش‌فرض
          className // ← اگر چیزی از بیرون اومده، اضافه میشه
        )}
      >
       {closeable && 
          <X onClick ={() => onOpenChange(false)} className="p-1 bg-black rounded-full text-white mr-2"/>
          }
       
        <DrawerTitle />
        {children}
      </DrawerContent>
    </Drawer>
  )
}

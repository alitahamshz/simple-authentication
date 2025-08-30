"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface SheetWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open:boolean) => void;
}

export function DesktopDrawer({
  title,
  description,
  children,
  open,
  onOpenChange,
}: SheetWrapperProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* اگر میخوای، اینجا میتونی trigger هم بذاری */}
      <SheetContent side="left" className="p-6">
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

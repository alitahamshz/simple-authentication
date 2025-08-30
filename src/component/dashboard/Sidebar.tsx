/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenuItems } from "./MenuItems";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const menuItems = getMenuItems(session?.user?.role || null);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-white px-2 flex flex-col dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="relative p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 
              10 10 10 10-4.48 10-10S17.52 2 
              12 2zm-1 15v-4H8l4-5 4 5h-3v4h-2z"
            />
          </svg>
          {!collapsed && <h1 className="text-xl font-bold">پنل ادمین</h1>}
        </Link>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed((p) => !p)}
          className="hidden md:flex ml-auto w-6 h-6 absolute -left-5 top-20 bg-background rounded-full border-dotted border-primary border-[2px]"
        >
          {collapsed ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" className="w-full px-2">
          {menuItems.map((group) => (
            <div key={group.group} className="py-2">
              {!collapsed && (
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  {group.group}
                </h2>
              )}

              {group.items.map((item: any) => {
                const baseBtn = (
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={`w-full gap-3 text-sm font-medium my-1 ${
                      collapsed ? "justify-center px-2" : "justify-start"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {!collapsed && item.name}
                  </Button>
                );

                // case 1: آیتم معمولی
                if (!item.subItems) {
                  return (
                    <Link href={item.href} key={item.name}>
                      {collapsed ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>{baseBtn}</TooltipTrigger>
                            <TooltipContent side="right">
                              {item.name}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        baseBtn
                      )}
                    </Link>
                  );
                }

                // case 2: آیتم با زیرمنو
                return collapsed ? (
                  <Popover key={item.name}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>{baseBtn}</PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right">{item.name}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <PopoverContent
                      side="right"
                      align="start"
                      className="w-48 p-2"
                    >
                      {item.subItems.map((sub: any) => (
                        <Link href={sub.href} key={sub.name}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm font-normal"
                          >
                            {sub.name}
                          </Button>
                        </Link>
                      ))}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <AccordionItem value={item.name} key={item.name} className="border-b-0">
                    <AccordionTrigger className="text-md font-medium hover:no-underline hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-2 py-2">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6">
                      {item.subItems.map((sub: any) => (
                        <Link href={sub.href} key={sub.name}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm font-normal"
                          >
                            {sub.name}
                          </Button>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </div>
          ))}
        </Accordion>
      </div>
    </aside>
  );
}

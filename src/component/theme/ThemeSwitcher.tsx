"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ModeToggle() {
  const [status, setStatus] = useState("light");
  const { setTheme } = useTheme();

  return (
    <>
      <Button onClick={status === "dark" ? () => {
        setStatus("light")
        setTheme("light")
      } : () => {
        setStatus("dark")
        setTheme("dark")
      }} variant="ghost" size="icon" className="w-7 h-7">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 opacity-100 transition-all dark:-rotate-90 dark:opacity-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 opacity-0 transition-all dark:rotate-0 dark:opacity-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}

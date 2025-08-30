"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LoadingButtonProps = {
  isLoading: boolean;
  defaultText: string;
  loadingText: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export  const CustomButton = ({
  isLoading,
  defaultText,
  loadingText = "درحال ارسال...",
  icon,
  onClick,
  type = "submit", // پیش‌فرض: submit
  disabled = false,
  className,
}: LoadingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={isLoading || disabled}
      className={cn("flex items-center gap-2 w-full", className)}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {defaultText}
        </>
      )}
    </Button>
  );
};
export default CustomButton;
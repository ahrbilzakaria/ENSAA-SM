import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "py-2 px-4 rounded-md font-semibold hover:bg-gray-500 hover:text-white active:text-black",
        className
      )}
    >
      {children}
    </button>
  );
}

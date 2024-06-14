import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={cn(
        "py-2 px-4 rounded-md font-semibold hover:bg-gray-500 hover:text-white active:text-black",
        className
      )}
    >
      {children}
    </button>
  );
}

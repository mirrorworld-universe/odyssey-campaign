"use client";
import { useEffect, useState } from "react";
import { Trophy } from "../../icons/Trophy";
import { formatAddress } from "../../store/account";
import { cn } from "@/lib/utils";

export function NotificationBar({ children, className }: any) {
  const handleAnimationEnd = () => {};

  useEffect(() => {}, []);

  return (
    <div
      className={cn(
        "w-full h-11 flex justify-center items-center bg-[#0000FF] text-base font-normal text-white fade-out",
        className
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      {children ? (
        <div className="flex flex-row justify-center items-center gap-1 text-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}

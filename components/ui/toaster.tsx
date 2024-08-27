"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useToast();

  const typeClassName: any = {
    success: "border-[#00FF94]",
    warning: "border-[#FBB042]",
    fail: "border-[#FF0000]",
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              "bg-[#1A1A1A] border-t-0 border-b-0 border-r-0 border-solid border-[#FBB042] border-l-4 md:border-l-5 p-4 md:p-5 md:pr-14 rounded-none",
              typeClassName[(description as any).props?.role || "success"]
            )}
            duration={3000}
          >
            <div className="grid gap-4 md:gap-1">
              {title && (
                <ToastTitle className="text-white text-sm md:text-base font-semibold leading-none md:leading-normal">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-white/60 text-xs md:text-sm leading-none md:leading-normal">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

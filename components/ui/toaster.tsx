"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useToast();

  const typeClassName: any = {
    success: "border-[#00FF94]",
    warning: "border-[#FBB042]",
    fail: "border-[#FF0000]"
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              "bg-bg-popup border-[#FBB042] border-0 border-l-4 rounded-none px-6 py-4",
              typeClassName[(description as any).props?.role || "success"]
            )}
            duration={3000}
          >
            <div className="flex-v gap-1">
              {title && (
                <ToastTitle className="sonic-title2 text-primary">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="sonic-body3 text-tertary">
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

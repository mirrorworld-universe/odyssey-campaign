"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardSize } from "@/app/components/Basic/Card";
import { Close } from "@/app/icons/Close";
import { cn, isMobileViewport } from "@/lib/utils";

export function Rules({ show, onClose, children }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseRulesDialog = () => {
    onClose(false);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  return (
    <>
      {/* shadow */}
      {isOpen && (
        <div
          className={cn(
            "flex bg-black/80 fixed z-20 top-0 bottom-0 right-0 left-0 transition-opacity duration-300"
          )}
          onClick={handleCloseRulesDialog}
        ></div>
      )}

      {/* content */}
      {
        <div
          className={cn(
            "w-full fixed md:static z-20 bottom-0 left-0 right-0 m-auto bg-[#111] md:bg-transparent px-4 md:px-0 pb-6 md:pb-0 transition-transform duration-300",
            isOpen || !isMobileViewport() ? "translate-y-0" : "translate-y-full"
          )}
        >
          <h3 className="md:hidden flex flex-row justify-between py-4">
            <span className="text-base text-white/50 font-semibold font-orbitron">
              Rules
            </span>
            <span onClick={handleCloseRulesDialog}>
              <Close
                width={24}
                height={24}
                color="white"
                className="opacity-30 cursor-pointer"
              />
            </span>
          </h3>
          <Card
            name="Rules"
            size={CardSize.Medium}
            className="max-w-[1024px] px-4 py-6 rounded-lg md:px-10 md:py-10 md:rounded-xl"
            nameClassName="bg-[#000] hidden md:block"
            contentClassName="text-xs md:text-xl text-white/60 leading-loose md:leading-relaxed font-manrope font-normal"
          >
            {children}
          </Card>
        </div>
      }
    </>
  );
}

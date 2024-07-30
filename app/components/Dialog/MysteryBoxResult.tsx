"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Ring } from "@/app/icons/Ring";
import { useMysteryBoxInfo, useMysteryBoxResultModal } from "@/app/store/task";

export function MysteryBoxResultDialog() {
  const { isOpen, onOpen, onClose } = useMysteryBoxResultModal();
  const { mysteryBoxOpenAmount } = useMysteryBoxInfo();

  const handleConfirm = () => {
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[calc(100%_-_32px)] w-full md:w-[440px] bg-[#1A1A1A] border-none p-6 md:p-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron">
            <p className="flex flex-row justify-center items-center gap-3 text-white text-[40px] md:text-5xl font-semibold font-orbitron">
              <Ring color="#FBB042" className="w-14 md:w-16 h-14 md:h-16" />x{" "}
              {mysteryBoxOpenAmount}
            </p>
            <span className="text-white text-2xl font-semibold font-orbitron mt-8">
              Congratulation
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-base text-center mt-4">
            You received total of {mysteryBoxOpenAmount} rings.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-12 mt-10 md:mt-12">
          <Button
            className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

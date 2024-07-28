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
import { Gift } from "@/app/icons/Gift";
import { useRouter } from "next/navigation";
import { useSetUpFinishModal } from "@/app/store/tutorials";
import { Close } from "@/app/icons/Close";

export function SetUpFinishDialog() {
  const { isOpen, onOpen, onClose } = useSetUpFinishModal();
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/task");
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-full w-full md:w-[468px] max-h-full h-full md:h-auto bg-[#1A1A1A] border-none p-4 md:p-8">
        <AlertDialogHeader className="">
          <p className="flex md:hidden justify-between items-center pb-4">
            <span className="text-white/50 text-sm uppercase font-orbitron font-semibold">
              Connect Wallet
            </span>
            <span className="cursor-pointer hover:opacity-80" onClick={onClose}>
              <Close color="rgba(255, 255, 255, .5)" />
            </span>
          </p>
          <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron pt-4">
            <p className="flex flex-row gap-3 text-white text-5xl font-semibold font-orbitron">
              <img
                src="/images/icons/done.svg"
                className="w-14 md:w-16 h-14 md:h-16"
              />
            </p>
            <span className="text-white text-[20px] md:text-2xl font-semibold font-orbitron mt-8">
              Congratulations
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-sm md:text-base text-center mt-4">
            You have completed the wallet setup. Start your journey now! If you
            have any questions, feel free to check out our{" "}
            <a
              className="text-[#25A3ED] hover:underline"
              href="/task#how-to-play"
            >
              beginner's guide
            </a>{" "}
            and{" "}
            <a className="text-[#25A3ED] hover:underline" href="/task#faq">
              FAQs
            </a>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4 mt-12 fixed md:static left-4 right-4 bottom-4">
          <Button
            className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-base font-bold font-orbitron transition-colors duration-300"
            onClick={handleConfirm}
          >
            Task Center
          </Button>
          <Button
            className="hidden md:block w-full h-12 bg-transparent hover:bg-transparent text-white/30 font-orbitron hover:opacity-80 active:opacity-50 transition-colors duration-300"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

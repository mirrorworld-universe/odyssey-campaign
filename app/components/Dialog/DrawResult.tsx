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
import { Trophy } from "@/app/icons/Trophy";
import { useMysteryBoxInfo, useMysteryBoxResultModal } from "@/app/store/task";
import { useDrawResultModal, useLotteryInfo } from "@/app/store/lottery";

export function DrawResultDialog() {
  const { isOpen, onOpen, onClose } = useDrawResultModal();
  const { lotteryRewardsAmount } = useLotteryInfo();

  const handleConfirm = () => {
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[440px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron">
            <p className="flex flex-row justify-center items-center gap-3 text-white text-5xl font-semibold font-orbitron">
              <Trophy width={64} height={64} color="#FBB042" />x{" "}
              {lotteryRewardsAmount}
            </p>
            <span className="text-white text-2xl font-semibold font-orbitron mt-8">
              Congratulation
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-base text-center mt-4">
            You received total of {lotteryRewardsAmount} rings.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-12 mt-12">
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

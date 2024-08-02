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
import {
  useDrawConfirmModal,
  useDrawRecordModal,
  useLotteryInfo,
} from "@/app/store/lottery";
import { Casino } from "@/app/icons/Casino";

export function DrawConfirmDialog() {
  const { isOpen, onOpen, onClose } = useDrawConfirmModal();
  const { lotteryDrawPrice, lotteryDrawAmount } = useLotteryInfo();
  const {
    isOpen: isOpenRecordModal,
    onOpen: onOpenRecordModal,
    onClose: onCloseRecordModal,
  } = useDrawRecordModal();

  const handleConfirm = () => {
    onOpenRecordModal();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[468px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron">
            <p className="flex flex-row justify-center items-center gap-3 text-white text-5xl font-semibold font-orbitron pt-4">
              <Casino
                width={64}
                height={64}
                color="#FBB042"
                className="animate-spin-light"
              />
            </p>
            <span className="text-white text-2xl font-semibold font-orbitron mt-8">
              Place the Bet
            </span>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col gap-12 mt-12">
          <div className="flex flex-col items-center gap-5 text-lg text-white font-normal">
            <div className="w-full flex justify-between">
              <span>Number of draws</span>
              <span className="font-semibold">{lotteryDrawAmount || 0}</span>
            </div>
            <div className="w-full flex justify-between">
              <span>Lottery Price</span>
              <span className="font-semibold">
                1 <i className="text-sm not-italic">Draw</i> ={" "}
                {lotteryDrawPrice || 0}{" "}
                <i className="text-sm not-italic">SOL</i>
              </span>
            </div>
            <div className="w-full flex justify-between">
              <span>Total Spent</span>
              <span className="font-bold">
                {isNaN(lotteryDrawAmount * lotteryDrawPrice)
                  ? 0
                  : lotteryDrawAmount * lotteryDrawPrice}{" "}
                SOL
              </span>
            </div>
          </div>

          {/* buttons */}
          <div className="flex flex-col gap-4">
            <Button
              className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
            <Button
              className="w-full h-12 bg-transparent hover:bg-transparent text-white/50 font-orbitron hover:opacity-80 active:opacity-50 transition-colors duration-300"
              onClick={onClose}
            >
              Wait a minute
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

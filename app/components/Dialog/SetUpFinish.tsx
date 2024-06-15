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

export function SetUpFinishDialog() {
  const { isOpen, onOpen, onClose } = useMysteryBoxResultModal();
  const { mysteryBoxRewardsAmount } = useMysteryBoxInfo();
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/task");
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[440px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron">
            <p className="flex flex-row gap-3 text-white text-[48px] font-semibold font-orbitron">
              <Gift width={64} height={64} color="#FBB042" />
            </p>
            <span className="text-white text-[24px] font-semibold font-orbitron mt-8">
              Congratulations
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-[16px] text-center mt-4">
            You have completed the wallet setup. Start your journey now! If you
            have any questions, feel free to check out our{" "}
            <a
              className="text-[#25A3ED] hover:underline"
              href="/task"
              target="_blank"
            >
              beginner's guide
            </a>{" "}
            and{" "}
            <a
              className="text-[#25A3ED] hover:underline"
              href="/task"
              target="_blank"
            >
              FAQs
            </a>
            . wallets for now. Your support will enrich the Solana ecosystem!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-12 mt-12">
          <Button
            className="w-full height-[48px] bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300"
            onClick={handleConfirm}
          >
            -
          </Button>
        </div>
        <div className="flex flex-col gap-12 mt-12">
          <Button
            className="w-full height-[48px] bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300"
            onClick={handleConfirm}
          >
            Task Center
          </Button>

          <Button
            className="w-full height-[48px] bg-transparent hover:bg-transparent text-white/50 font-orbitron"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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

export function MoreWalletDialog() {
  const { isOpen, onOpen, onClose } = useMysteryBoxResultModal();
  const { mysteryBoxRewardsAmount } = useMysteryBoxInfo();

  const handleConfirm = () => {
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
              More Wallet Support Coming Soon!
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-[16px] text-center mt-4">
            As Sonic is the first Solana Gaming Layer 2, more wallet support is
            coming. We recommend using{" "}
            <a
              className="text-[#25A3ED] hover:underline"
              href="https://www.backpack.app/"
              target="_blank"
            >
              Backpack
            </a>{" "}
            or{" "}
            <a
              className="text-[#25A3ED] hover:underline"
              href="https://nightly.app/"
              target="_blank"
            >
              Nightly
            </a>{" "}
            wallets for now. Your support will enrich the Solana ecosystem!
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
            Switch Wallet
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

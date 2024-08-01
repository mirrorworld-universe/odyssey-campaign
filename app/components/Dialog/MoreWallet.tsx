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
import { Gift } from "@/app/icons/Gift";
import { useMoreWalletModal } from "@/app/store/tutorials";
import { useWalletModal } from "@/app/store/account";
import { useWallet } from "@solana/wallet-adapter-react";
import { Close } from "@/app/icons/Close";

export function MoreWalletDialog() {
  const { publicKey, wallet, signTransaction } = useWallet();
  const { isOpen, onOpen, onClose } = useMoreWalletModal();
  const {
    isOpen: isOpenWalletDialog,
    onOpen: onOpenWalletDialog,
    onClose: onCloseWalletDialog,
  } = useWalletModal();

  const handleSwitchWallet = () => {
    onOpenWalletDialog();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-full w-full md:w-[470px] max-h-full h-full md:h-auto bg-[#1A1A1A] border-none p-4 md:p-8">
        <AlertDialogHeader className="">
          <p className="flex md:hidden justify-between items-center pb-4">
            <span className="text-white/50 text-sm uppercase font-orbitron font-semibold">
              Connect Wallet
            </span>
            <span className="cursor-pointer hover:opacity-80" onClick={onClose}>
              <Close color="rgba(255, 255, 255, .5)" />
            </span>
          </p>
          <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron">
            <p className="flex flex-row gap-3 text-white text-5xl font-semibold font-orbitron">
              <img
                src="/images/icons/info.svg"
                className="w-14 md:w-16 h-14 md:h-16"
              />
            </p>
            <span className="text-white text-[20px] md:text-2xl font-semibold font-orbitron mt-8 text-center">
              More Wallet Support Coming Soon!
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-sm md:text-base text-center mt-4">
            <p>
              {wallet?.adapter.name} doesn't support Sonic yet, so you can't
              complete tasks or claim rewards through this wallet.{" "}
            </p>
            <p>
              As Sonic is the first Solana Gaming Layer 2, more wallet support
              is coming. We recommend using{" "}
              <a
                className="text-[#25A3ED] hover:underline"
                href="https://www.okx.com/web3"
                target="_blank"
              >
                OKX Wallet
              </a>{" "}
              or{" "}
              <a
                className="text-[#25A3ED] hover:underline"
                href="https://nightly.app/"
                target="_blank"
              >
                Nightly
              </a>{" "}
              or{" "}
              <a
                className="text-[#25A3ED] hover:underline"
                href="https://www.backpack.app/"
                target="_blank"
              >
                Backpack
              </a>{" "}
              wallets for now. Your support will enrich the Solana ecosystem!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4 mt-12 fixed md:static left-4 right-4 bottom-4">
          <Button
            className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300"
            onClick={handleSwitchWallet}
          >
            Switch Wallet
          </Button>
          <Button
            className="hidden md:block w-full h-12 bg-transparent hover:bg-transparent text-white/50 font-orbitron"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

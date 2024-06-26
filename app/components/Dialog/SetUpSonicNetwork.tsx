"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
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
import {
  useSetUpFinishModal,
  useSetUpNetworkModal,
} from "@/app/store/tutorials";

export function SetUpSonicNetworkDialog() {
  const { publicKey, wallet, signTransaction } = useWallet();
  const { isOpen, onOpen, onClose } = useSetUpNetworkModal();
  const {
    isOpen: isOpenSetUpFinishWalletDialog,
    onOpen: onOpenSetUpFinishWalletDialog,
    onClose: onCloseSetUpFinishWalletDialog,
  } = useSetUpFinishModal();

  const setUpUrls: any = {
    nightly: "https://blog.sonic.game/sonic-network-settings---nightly-wallet",
    backpack:
      "https://blog.sonic.game/sonic-network-settings---backpack-wallet",
  };

  const handleConfirm = () => {
    onOpenSetUpFinishWalletDialog();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[470px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-start items-center text-white text-[32px] font-orbitron">
            <span className="text-white text-[32px] font-semibold font-orbitron">
              Set Up Sonic Network
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-base text-left mt-4">
            Set up Sonic network for your {wallet?.adapter.name} wallet
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-row items-center justify-center gap-14 mt-12">
          <img
            src="/images/icons/sonic-white.png"
            alt=""
            className="w-12 h-12"
          />
          <span className="inline-flex flex-row justify-between items-center w-11 h-11">
            <i className="inline-block w-[8px] h-[8px] bg-[#5f5f5f] rounded-[50%] animate-loading-before"></i>
            <i className="inline-block w-[8px] h-[8px] bg-[#5f5f5f] rounded-[50%] animate-loading"></i>
            <i className="inline-block w-[8px] h-[8px] bg-[#5f5f5f] rounded-[50%] animate-loading-after"></i>
          </span>
          <img src={wallet?.adapter.icon} alt="" className="w-12 h-12" />
        </div>
        <div className="flex flex-col gap-12 mt-12">
          <ul className="flex flex-col gap-6 list-decimal text-white text-lg font-semibold pl-[18px]">
            <li className="s">
              Open this network{" "}
              <a
                href={
                  setUpUrls[wallet?.adapter.name.toLowerCase() || "nightly"]
                }
                target="_blank"
                className="text-[#25A3ED] hover:underline underline-offset-2"
              >
                settings doc
              </a>
            </li>
            <li>Setup Sonic network</li>
          </ul>
        </div>
        <div className="flex flex-col gap-12 mt-12">
          <Button
            className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-base font-bold font-orbitron transition-colors duration-300"
            onClick={handleConfirm}
          >
            I already finished the setup
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

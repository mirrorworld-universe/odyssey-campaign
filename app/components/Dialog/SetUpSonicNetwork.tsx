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
  useSetupInfo,
  useWhitelistModal,
} from "@/app/store/tutorials";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import { networks } from "@/app/data/config";

export function SetUpSonicNetworkDialog() {
  const { publicKey, wallet, signTransaction } = useWallet();
  const { address } = useAccountInfo();
  const { isOpen, onOpen, onClose } = useSetUpNetworkModal();
  const { status, setStatus } = useSetupInfo();
  const { networkId } = useNetworkInfo();
  const {
    isOpen: isOpenSetUpFinishWalletDialog,
    onOpen: onOpenSetUpFinishWalletDialog,
    onClose: onCloseSetUpFinishWalletDialog,
  } = useSetUpFinishModal();
  const {
    isOpen: isOpenWhitelistDialog,
    onOpen: onOpenWhitelistDialog,
    onClose: onCloseWhitelistDialog,
  } = useWhitelistModal();

  const setUpUrls: any = {
    nightly: {
      devnet: "https://blog.sonic.game/sonic-network-settings---nightly-wallet",
      testnet:
        "https://blog.sonic.game/sonic-frontier-network-settings---nightly-wallet",
    },
    backpack: {
      devnet:
        "https://blog.sonic.game/sonic-network-settings---backpack-wallet",
      testnet:
        "https://blog.sonic.game/sonic-frontier-network-settings---backpack-wallet",
    },
  };

  const handleConfirmInTestnet = () => {
    onOpenWhitelistDialog();
    onClose();
  };

  const handleConfirm = () => {
    setStatus({
      ...status,
      [address]: "done",
    });
    onOpenSetUpFinishWalletDialog();
    onClose();
  };

  const StageTag = () => (
    <div className="text-[#fbb042] text-[10px] bg-[#fbb0421a] px-1 py-[2px]">
      Stage 2
    </div>
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-full w-full md:w-[470px] max-h-full h-full md:h-auto bg-[#1A1A1A] border-none p-4 md:p-8 items-start">
        <AlertDialogHeader className="">
          <p className="block md:hidden text-white/50 text-sm uppercase font-orbitron font-semibold text-left pb-4">
            Connect Wallet
          </p>
          <AlertDialogTitle className="mt-4 md:mt-0 flex flex-row gap-2 justify-start items-center text-white text-[32px]">
            <span className="text-white text-2xl md:text-[32px] font-semibold font-orbitron">
              Set Up Network
            </span>
            {networkId === "testnet" ? <StageTag /> : null}
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden md:static text-white/60 text-base text-left mt-4">
            Set up Sonic {networkId === "testnet" ? "Frontier" : "Origin"}{" "}
            network for your {wallet?.adapter.name} wallet
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-row items-center justify-center gap-14 mt-[96px] md:mt-12">
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

        <div className="flex flex-col gap-12 mt-[96px] md:mt-12">
          <ul className="flex flex-col gap-6 list-decimal text-white text-lg font-semibold pl-[18px]">
            <li className="s">
              Open this network{" "}
              <a
                href={
                  setUpUrls[wallet?.adapter.name.toLowerCase() || "nightly"]
                    ? setUpUrls[
                        wallet?.adapter.name.toLowerCase() || "nightly"
                      ][networkId || "devnet"]
                    : "https://blog.sonic.game/sonic-network-settings---nightly-wallet"
                }
                target="_blank"
                className="text-[#25A3ED] hover:underline underline-offset-2"
              >
                settings doc
              </a>
            </li>
            <li>
              Setup {networkId === "testnet" ? "Frontier" : "Origin"} network
            </li>
            <li>Continue to the next step</li>
          </ul>
        </div>
        <div className="flex flex-col gap-12 mt-12 fixed md:static left-4 right-4 bottom-4">
          <Button
            className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-base font-bold font-orbitron transition-colors duration-300"
            onClick={
              networkId === "testnet" ? handleConfirmInTestnet : handleConfirm
            }
          >
            Continue
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

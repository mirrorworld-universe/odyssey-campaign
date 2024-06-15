"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { Gift } from "@/app/icons/Gift";
import { Ring } from "@/app/icons/Ring";
import {
  useMysteryBoxConfirmModal,
  useMysteryBoxInfo,
  useMysteryBoxRecordModal,
  useMysteryBoxResultModal,
} from "@/app/store/task";
import { cn } from "@/lib/utils";
import { useAccountInfo } from "@/app/store/account";
import { confirmTransaction, sendLegacyTransaction } from "@/lib/transactions";
import {
  getMysteryboxHistory,
  getMysteryboxTx,
  openMysterybox,
} from "@/app/data/reward";

let txHash = "";

export function MysteryBoxConfirmDialog() {
  const { isOpen, onOpen, onClose } = useMysteryBoxConfirmModal();
  const { publicKey, wallet, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { address, token } = useAccountInfo();
  const { mysteryBoxAmount, setMysteryBoxRewardsAmount } = useMysteryBoxInfo();
  const {
    isOpen: isOpenRecordModal,
    onOpen: onOpenRecordModal,
    onClose: onCloseRecordModal,
  } = useMysteryBoxRecordModal();
  const {
    isOpen: isOpenResultModal,
    onOpen: onOpenResultModal,
    onClose: onCloseResultModal,
  } = useMysteryBoxResultModal();

  const [isOpeningMysterybox, setIsOpeningMysterybox] = useState(false);
  const openGroupData: any[] = [
    {
      id: 1,
      text: "Open",
      amount: 1,
      active: true,
    },
    {
      id: 2,
      text: "Open All",
      amount: mysteryBoxAmount,
    },
  ];
  const [openGroup, setOpenGroup] = useState<any[]>(openGroupData);

  useEffect(() => {
    if (mysteryBoxAmount) {
      openGroupData[1].amount = mysteryBoxAmount;
      setOpenGroup(openGroupData);
    }
  }, [mysteryBoxAmount]);

  const handleOptionChanged = (group: any) => {
    openGroupData.forEach((item) => {
      item.active = item.id === group.id;
    });
    setOpenGroup(openGroupData);
  };

  const handleConfirm = () => {
    const currentAmount = openGroup.find((group) => group.active)?.amount;
    if (currentAmount > 1) {
      onOpenRecordModal();
      onClose();
    } else {
      handleOpenMysterybox();
    }
  };

  const handleOpenMysterybox = () => {
    if (isOpeningMysterybox) {
      return;
    }
    setIsOpeningMysterybox(true);
    mutationBuildTx.mutate();
  };

  const triggerTransaction = async (transactionString: string) => {
    if (!publicKey || !signTransaction) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const tx = Transaction.from(Buffer.from(transactionString, "base64"));
      const { txid, slot } = await sendLegacyTransaction(
        connection,
        // @ts-ignore
        wallet?.adapter,
        tx,
        "confirmed"
      );

      if (!txid) {
        throw new Error("Could not retrieve transaction hash");
      }

      txHash = txid;

      const result = await confirmTransaction(connection, txHash, "confirmed");

      if (result.value.err) {
        throw new Error(result.value.err.toString());
      }

      mutationOpenMysteryBox.mutate();
    } catch (error) {
      console.error("Transaction failed:", error);
    }

    setIsOpeningMysterybox(false);
  };

  const mutationOpenMysteryBox = useMutation({
    mutationKey: ["openMysteryBox", address],
    mutationFn: () =>
      openMysterybox({
        token,
        hash: txHash,
      }),
    onSuccess({ data, status }) {
      if (data.success) {
        setMysteryBoxRewardsAmount(data.amount);
        toast({
          description: "The Mystery Box has been opened successfully.",
        });
        onOpenResultModal();
        onClose();
      }
    },
  });

  const mutationBuildTx = useMutation({
    mutationKey: ["buildMysteryboxTx", address],
    mutationFn: () => getMysteryboxTx({ token }),
    onSuccess: async ({ data }) => {
      const transactionString = data.hash;
      triggerTransaction(transactionString);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[467px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron">
            <p className="flex flex-row gap-3 text-white text-[48px] font-semibold font-orbitron">
              <Gift width={64} height={64} color="#FBB042" />x{" "}
              {openGroup.find((group) => group.active)?.amount}
            </p>
            <span className="text-white text-[24px] font-semibold font-orbitron mt-8">
              Open Mystery Box
            </span>
          </AlertDialogTitle>
          {mysteryBoxAmount > 1 ? (
            <AlertDialogDescription className="text-[#717171] text-[16px] text-center mt-4">
              Please select the number of Mystery Box you would like to open.
            </AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>

        {/* options */}
        <div className="flex flex-col gap-4 mt-8">
          {openGroup.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={cn(
                "group flex flex-row justify-between text-[16px] rounded border border-solid px-5 py-4 cursor-pointer hover:border-[#FBB042] transition-colors",
                group.active
                  ? "border-[#FBB042] bg-[#FBB042]/10"
                  : "border-white/50 bg-transparent"
              )}
              onClick={() => handleOptionChanged(group)}
            >
              <span className={group.active ? "text-[#FBB042]" : "text-white"}>
                {group.text}
              </span>
              <div
                className={cn(
                  "inline-flex flex-row items-center gap-[2px] font-orbitron",
                  group.active ? "text-[#FBB042]" : "text-white"
                )}
              >
                {group.amount} x{" "}
                <Gift
                  width={20}
                  height={20}
                  color={group.active ? "#FBB042" : "#FFFFFF"}
                />
              </div>
            </div>
          ))}
        </div>

        {/* tip */}
        {openGroup.find((group) => group.active)?.amount > 1 ? (
          <p className="flex flex-row gap-2 mt-4">
            <img className="w-5 h-5 mt-[2px]" src="/images/icons/report.svg" />
            <span className="text-[#FBB042] text-[16px]">
              You need to sign {mysteryBoxAmount} times in your wallet to unlock
              all mystery box rewards.
            </span>
          </p>
        ) : null}

        {/* buttons */}
        <div className="flex flex-col gap-4 mt-12">
          <Button
            disabled={isOpeningMysterybox}
            className={cn(
              "transition-all duration-300  cursor-pointer",
              isOpeningMysterybox
                ? "bg-[#0000FF] hover:bg-[#0000FF]/80 opacity-60"
                : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
            )}
            onClick={handleConfirm}
          >
            {isOpeningMysterybox && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span className="text-white text-[14px] font-orbitron">Open</span>
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

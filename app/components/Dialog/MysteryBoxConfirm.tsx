"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { getMysteryboxTx, openMysterybox } from "@/app/data/reward";
import { Gift } from "@/app/icons/Gift";
import { Ring } from "@/app/icons/Ring";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import {
  useMysteryBoxConfirmModal,
  useMysteryBoxInfo,
  useMysteryBoxRecordModal,
  useMysteryBoxResultModal
} from "@/app/store/task";
import { confirmTransaction, sendLegacyTransaction } from "@/lib/transactions";
import { cn } from "@/lib/utils";
import { InfoLogo } from "@/app/logos/InfoLogo";

let txHash = "";

export function MysteryBoxConfirmDialog() {
  const { isOpen, onOpen, onClose } = useMysteryBoxConfirmModal();
  const { publicKey, wallet, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { address, token } = useAccountInfo();
  const { networkId } = useNetworkInfo();
  const { mysteryBoxAmount, setMysteryBoxOpenAmount } = useMysteryBoxInfo();
  const {
    isOpen: isOpenRecordModal,
    onOpen: onOpenRecordModal,
    onClose: onCloseRecordModal
  } = useMysteryBoxRecordModal();
  const {
    isOpen: isOpenResultModal,
    onOpen: onOpenResultModal,
    onClose: onCloseResultModal
  } = useMysteryBoxResultModal();

  const [isOpeningMysterybox, setIsOpeningMysterybox] = useState(false);
  const openGroupData: any[] = [
    {
      id: 1,
      text: "Open",
      amount: 1,
      active: true
    },
    {
      id: 2,
      text: "Open All",
      amount: mysteryBoxAmount
    }
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
        "processed"
      );

      if (!txid) {
        throw new Error("Could not retrieve transaction hash");
      }

      txHash = txid;

      const result = await confirmTransaction(connection, txHash, "confirmed");

      mutationOpenMysteryBox.mutate();
    } catch (error) {
      console.error("Transaction failed:", error);
      setIsOpeningMysterybox(false);
      toast({
        description: <div role="success">Transaction failed.</div>
      });
    }
  };

  const mutationOpenMysteryBox = useMutation({
    mutationKey: ["openMysteryBox", address],
    mutationFn: () =>
      openMysterybox({
        token,
        hash: txHash,
        networkId
      }),
    onSuccess({ data, status }) {
      if (data.success) {
        setMysteryBoxOpenAmount(data.amount);
        toast({
          title: "Open Mystery Box",
          description: (
            <p role="success" className="block">
              You've received{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                {data.amount} x ring{data.amount === 1 ? "" : "s"}
                <Ring width={12} height={12} color="#FBB042" className="mx-1" />
              </span>
              . Collect more rings in the Sonic Odyssey!
            </p>
          )
        });
        onOpenResultModal();
        onClose();
      }
    },
    onError: () => {
      toast({
        description: (
          <div role="fail">Oops! There's a little hiccup on server!</div>
        )
      });
    },
    onSettled: () => {
      setIsOpeningMysterybox(false);
    }
  });

  const mutationBuildTx = useMutation({
    mutationKey: ["buildMysteryboxTx", address],
    mutationFn: () => getMysteryboxTx({ token, networkId }),
    onSuccess: async ({ data }) => {
      const transactionString = data.hash;
      triggerTransaction(transactionString);
    }
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="px-6 md:p-0 md:max-w-[360px] w-full text-primary">
        <div className="flex-v bg-bg-popup justify-center gap-6 md:gap-8 p-6 text-center">
          <div className="flex-center gap-3 sonic-headline1 md:sonic-headline0 font-orbitron mt-4">
            <Gift color="#FBB042" className="size-14 md:size-16" />
            <span>x</span>
            {openGroup.find((group) => group.active)?.amount}
          </div>

          <div className="flex-v gap-4">
            <h2 className="sonic-headline5 md:sonic-headline4 font-orbitron">
              {" "}
              Open Mystery Box
            </h2>
            <p className="sonic-body3 text-tertary">
              Please select the number of Mystery Box you would like to open.
            </p>
          </div>

          <div className="flex-v gap-4">
            {/* options */}
            {openGroup.map((group, groupIndex) => (
              <div
                key={groupIndex}
                onClick={() => handleOptionChanged(group)}
                className={cn(
                  "px-5 h-14 border rounded flex justify-between items-center sonic-title2 cursor-pointer hover:border-gold-yellow transition-colors",
                  group.active
                    ? "border-gold-yellow bg-gold-yellow/10 text-gold-yellow"
                    : "border-line"
                )}
              >
                <p>{group.text}</p>
                <div className="flex-center gap-0.5">
                  {group.amount} x{" "}
                  <Gift
                    color={group.active ? "#FBB042" : "#FFFFFF"}
                    className="size-5"
                  />
                </div>
              </div>
            ))}
            {/* options end */}
            {/* tip */}
            {openGroup.find((group) => group.active)?.amount > 1 ? (
              <div className="sonic-title3 text-gold-yellow text-left flex gap-2">
                <InfoLogo className="size-5 shrink-0" />
                You need to sign in your wallet {mysteryBoxAmount} times to
                unlock all mystery box rewards.
              </div>
            ) : null}
            {/* tip end */}
          </div>

          <div className="flex-v gap-2 mt-2 md:mt-auto">
            <Button
              disabled={isOpeningMysterybox}
              className="sonic-title2"
              onClick={handleConfirm}
              variant="primary"
              size={"lg"}
            >
              {isOpeningMysterybox ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Open
            </Button>
            <Button
              className="sonic-title2"
              onClick={onClose}
              variant="cancel"
              size={"lg"}
            >
              Cancel
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

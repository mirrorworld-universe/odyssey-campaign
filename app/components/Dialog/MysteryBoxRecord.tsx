"use client";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift } from "@/app/icons/Gift";
import { Ring } from "@/app/icons/Ring";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import { useMysteryBoxInfo, useMysteryBoxRecordModal } from "@/app/store/task";
import {
  getMysteryboxHistory,
  getMysteryboxTx,
  openMysterybox
} from "@/app/data/reward";
import { confirmTransaction, sendLegacyTransaction } from "@/lib/transactions";
import { Card, CardSize } from "../Basic/Card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

let txHash = "";
let currentRecord: any = {
  link: "",
  quantity: 0
};
let boxRecords: any[] = [];

let boxAmount = 0;

export function MysteryBoxRecordDialog() {
  const { publicKey, wallet, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { address, token } = useAccountInfo();
  const { isOpen, onOpen, onClose } = useMysteryBoxRecordModal();
  const { mysteryBoxAmount } = useMysteryBoxInfo();
  const { networkId } = useNetworkInfo();

  const [mysteryBoxRecords, setMysteryBoxRecords] = useState<any[]>([]);
  const [hasRefused, setHasRefused] = useState(false);

  const shortUrl = (url: string) =>
    `${url.substring(0, 12)}...${url.substring(url.length - 4, url.length)}`;

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
    } catch (error: any) {
      // if (
      //   error.code === 4001 ||
      //   error.message.includes("User rejected the request")
      // ) {
      //   console.log("User rejected the transaction");
      // } else {
      console.error("Transaction failed:", error);
      // }
      setHasRefused(true);
    }

    // setIsOpeningMysterybox(false);
  };

  const { data: dataMysteryBoxHistory, isLoading: loadingMysteryBoxHistory } =
    useQuery({
      queryKey: ["queryMysteryBoxHistory", address],
      queryFn: () => getMysteryboxHistory({ token }),
      enabled: !!address && !!token
    });

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
        boxRecords[boxRecords.length - 1] = {
          loaded: true,
          quantity: data.amount,
          link: `https://explorer.sonic.game/tx/${txHash}${
            networkId === "testnet" ? "?cluster=testnet" : ""
          }`
        };
        setMysteryBoxRecords([...boxRecords]);
        openMysteryBoxes();
      }
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

  const openMysteryBoxes = () => {
    if (boxAmount <= 0) {
      return;
    }
    boxAmount--;
    boxRecords.push(currentRecord);
    setMysteryBoxRecords([...boxRecords]);
    mutationBuildTx.mutate();
  };

  const handleConfirm = () => {
    boxRecords = [];
    setMysteryBoxRecords(boxRecords);
    onClose();
  };

  const handleContinue = () => {
    boxRecords = boxRecords.slice(0, boxRecords.length - 1);
    setMysteryBoxRecords(boxRecords);
    setHasRefused(false);
    openMysteryBoxes();
  };

  const handleStop = () => {
    boxRecords = boxRecords.filter((record: any) => record.loaded === true);
    setMysteryBoxRecords(boxRecords);
    setHasRefused(false);
  };

  useEffect(() => {
    if (isOpen && mysteryBoxAmount) {
      boxAmount = mysteryBoxAmount;
      openMysteryBoxes();
    }
  }, [mysteryBoxAmount, isOpen]);

  useEffect(() => {
    if (mysteryBoxRecords.length) {
      // scroll to bottom
      const $recordBox = document.getElementById("recordBox");
      if ($recordBox) {
        $recordBox.scrollTop = $recordBox.scrollHeight;
      }
    }
  }, [mysteryBoxRecords]);

  return (
    <AlertDialog open={false} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[calc(100%_-_32px)] w-full md:w-[440px] bg-[#1A1A1A] border-none p-6 md:p-8">
        <AlertDialogHeader className="">
          {mysteryBoxRecords.every((record) => record.loaded === true) ? (
            <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron">
              <p className="flex flex-row justify-center items-center gap-3 text-white text-5xl font-semibold font-orbitron">
                <Ring color="#FBB042" className="w-14 md:w-16 h-14 md:h-16" />x{" "}
                {mysteryBoxRecords.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </p>
              <span className="text-white text-2xl font-semibold font-orbitron mt-8">
                {mysteryBoxRecords.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                ) > 0
                  ? "Congratulation"
                  : "Done"}
              </span>
            </AlertDialogTitle>
          ) : (
            <AlertDialogTitle className="flex flex-row justify-center items-center text-white text-[32px] font-orbitron">
              <Gift color="#FBB042" className="w-8 md:w-10 h-8 md:h-10 mr-2" />
              <span className="text-white text-2xl md:text-[32px] font-semibold font-orbitron">
                Rings Record
              </span>
            </AlertDialogTitle>
          )}
          <AlertDialogDescription
            className={cn(
              "text-[#717171] text-sm md:text-base mt-4",
              mysteryBoxRecords.every((record) => record.loaded === true)
                ? "text-center"
                : "text-center"
            )}
          >
            {/* `In these XX draws, you won XX times and received a total of XX rings.` */}
            {mysteryBoxRecords.every((record) => record.loaded === true)
              ? `You have received a total of ${mysteryBoxRecords.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )} rings.`
              : "Please click the corresponding number of signature confirmations in the plugin wallet."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col">
          {mysteryBoxRecords.length ? (
            <Card
              size={CardSize.List}
              className="rounded-lg mt-10 md:mt-12"
              nameClassName="bg-[#1A1A1A]"
            >
              <div className="flex flex-col text-sm">
                {/* title */}
                <div className="flex flex-row justify-between text-white/60 pb-3 px-6">
                  <span className="">#Draw</span>
                  <span className="">Transaction Link</span>
                  <span className="">Result</span>
                </div>
                {/* item */}
                <ScrollArea>
                  <div
                    id="recordBox"
                    className="w-full flex flex-col max-h-[280px] gap-5 overflow-y-auto pt-2 pl-3 pr-6"
                  >
                    {mysteryBoxRecords.map((box: any, boxIndex: number) => (
                      <div
                        key={boxIndex}
                        className="flex flex-row justify-between text-white"
                      >
                        <div className="inline-flex flex-row justify-start items-center gap-1 w-[42px]">
                          <Loader2
                            size={16}
                            color="rgba(255, 255, 255, 0.30)"
                            className={cn(
                              "animate-spin",
                              box?.loaded ? "opacity-0" : "opacity-100"
                            )}
                          />
                          <span className="text-white text-sm">
                            {boxIndex + 1 < 10
                              ? `0${boxIndex + 1}`
                              : boxIndex + 1}
                          </span>
                        </div>
                        {box?.loaded && (
                          <div className="">
                            <a
                              className="text-[#25A3ED] hover:underline"
                              href={box.link}
                              target="_blank"
                            >
                              {shortUrl(box.link)}
                            </a>
                          </div>
                        )}
                        {box?.loaded && (
                          <div className="inline-flex items-center justify-center gap-1">
                            <Ring width={16} height={16} color="#FBB042" /> x{" "}
                            {box.quantity}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          ) : null}

          {hasRefused && mysteryBoxRecords.some((record) => !record.loaded) ? (
            <>
              {/* tip */}
              <p className="flex flex-row gap-2 mt-4">
                <img
                  className="w-5 h-5 mt-[2px]"
                  src="/images/icons/report.svg"
                />
                <span className="text-[#FBB042] text-base">
                  Detected a wallet signature issue. Would you like to stop or
                  continue opening mystery boxes?
                </span>
              </p>
              {/* continue */}
              <Button
                className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300 mt-12"
                onClick={handleContinue}
              >
                Continue
              </Button>
              {/* stop */}
              <Button
                className="w-full h-12 bg-[#F74242]/10 hover:bg-[#F74242]/20 active:bg-[#F74242]/5 text-[#F74242] font-orbitron border border-solid border-[#F74242]/40 hover:border-[#F74242] active:border-[#F74242]/10 transition-colors duration-300 mt-4"
                onClick={handleStop}
              >
                Stop
              </Button>
            </>
          ) : null}

          {mysteryBoxRecords.every((record) => record.loaded === true) ? (
            <Button
              className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300 mt-10 md:mt-12"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          ) : null}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

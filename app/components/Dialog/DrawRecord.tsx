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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Ring } from "@/app/icons/Ring";
import { useAccountInfo } from "@/app/store/account";
import {
  useDrawRecordModal,
  useDrawResultModal,
  useLotteryInfo,
} from "@/app/store/lottery";
import { confirmTransaction, sendLegacyTransaction } from "@/lib/transactions";
import { Card, CardSize } from "../Basic/Card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Casino } from "@/app/icons/Casino";
import { drawLottery, getLotteryTx } from "@/app/data/lottery";

let txHash = "";
let currentRecord: any = {
  link: "",
  quantity: 0,
};
let drawRecords: any[] = [];

let drawAmount = 0;

export function DrawRecordDialog() {
  const { publicKey, wallet, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { address, token } = useAccountInfo();
  const { isOpen, onOpen, onClose } = useDrawRecordModal();
  const {
    isOpen: isOpenResultModal,
    onOpen: onOpenResultModal,
    onClose: onCloseResultModal,
  } = useDrawResultModal();
  const { lotteryDrawPrice, lotteryDrawAmount } = useLotteryInfo();

  const [lotteryDrawRecords, setLotteryDrawRecords] = useState<any[]>([]);
  const [hasRefused, setHasRefused] = useState(false);

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

      const result = await confirmTransaction(connection, txHash, "processed");

      if (result.value.err) {
        throw new Error(result.value.err.toString());
      }

      mutationDrawLottery.mutate();
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
  };

  const mutationDrawLottery = useMutation({
    mutationKey: ["drawLottery", address],
    mutationFn: () =>
      drawLottery({
        token,
        hash: txHash,
      }),
    onSuccess({ data, status }) {
      if (data.success) {
        toast({
          title: "Draw Lottery",
          description: (
            <p className="block">
              You've received{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                {data.amount} x ring{data.amount === 1 ? "" : "s"}
                <Ring width={12} height={12} color="#FBB042" className="mx-1" />
              </span>
              . Collect more rings in the Sonic Odyssey!
            </p>
          ),
        });
        drawRecords[drawRecords.length - 1] = {
          loaded: true,
          quantity: data.amount,
          link: `https://explorer.sonic.game/tx/${txHash}`,
        };
        setLotteryDrawRecords([...drawRecords]);
        drawLotteries();
      }
    },
  });

  const mutationBuildTx = useMutation({
    mutationKey: ["buildLotteryTx", address],
    mutationFn: () => getLotteryTx({ token }),
    onSuccess: async ({ data }) => {
      const transactionString = data.hash;
      triggerTransaction(transactionString);
    },
  });

  const drawLotteries = () => {
    if (drawAmount <= 0) {
      return;
    }
    drawAmount--;
    drawRecords.push(currentRecord);
    setLotteryDrawRecords([...drawRecords]);
    mutationBuildTx.mutate();
  };

  const handleContinue = () => {
    drawRecords = drawRecords.slice(0, drawRecords.length - 1);
    setLotteryDrawRecords(drawRecords);
    setHasRefused(false);
    drawLotteries();
  };

  const handleStop = () => {
    drawRecords = drawRecords.filter((record: any) => record.loaded === true);
    setLotteryDrawRecords(drawRecords);
    setHasRefused(false);
  };

  const handleConfirm = () => {
    drawRecords = [];
    setLotteryDrawRecords(drawRecords);
    onOpenResultModal();
    onClose();
  };

  useEffect(() => {
    if (isOpen && lotteryDrawAmount) {
      drawAmount = lotteryDrawAmount;
      drawLotteries();
    }
  }, [lotteryDrawAmount, isOpen]);

  useEffect(() => {
    if (lotteryDrawRecords.length) {
      // scroll to bottom
      const $recordBox = document.getElementById("recordBox");
      if ($recordBox) {
        $recordBox.scrollTop = $recordBox.scrollHeight;
      }
    }
  }, [lotteryDrawRecords]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[440px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          {lotteryDrawRecords.every((record) => record.loaded === true) ? (
            <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron">
              <p className="flex flex-row justify-center items-center gap-3 text-white text-5xl font-semibold font-orbitron">
                <Ring width={64} height={64} color="#FBB042" />x{" "}
                {lotteryDrawRecords.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </p>
              <span className="text-white text-2xl font-semibold font-orbitron mt-8">
                {lotteryDrawRecords.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                ) > 0
                  ? "Congratulation"
                  : "Done"}
              </span>
            </AlertDialogTitle>
          ) : (
            <AlertDialogTitle className="flex flex-row justify-center items-center text-white text-[32px] font-orbitron">
              <Casino width={40} height={40} color="#FBB042" className="mr-2" />
              <span className="text-white text-[32px] font-semibold font-orbitron">
                Draw Record
              </span>
            </AlertDialogTitle>
          )}
          <AlertDialogDescription
            className={cn(
              "text-[#717171] text-base mt-4",
              lotteryDrawRecords.every((record) => record.loaded === true)
                ? "text-center"
                : "text-center"
            )}
          >
            {/* `In these XX draws, you won XX times and received a total of XX rings.` */}
            {lotteryDrawRecords.every((record) => record.loaded === true)
              ? `You have received a total of ${lotteryDrawRecords.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )} rings.`
              : "Please click the corresponding number of signature confirmations in the plugin wallet."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col">
          {lotteryDrawRecords.length ? (
            <Card
              size={CardSize.List}
              className="mt-12"
              nameClassName="bg-[#1A1A1A]"
            >
              <div className="flex flex-col text-sm">
                {/* title */}
                <div className="flex flex-row justify-between text-white/60 pb-3 px-6">
                  <span className="">#Draw</span>
                  <span className="">Block Number</span>
                  <span className="">Result</span>
                </div>
                {/* item */}
                <ScrollArea>
                  <div
                    id="recordBox"
                    className="w-full flex flex-col max-h-[280px] gap-5 overflow-y-auto pt-2 pl-3 pr-6"
                  >
                    {lotteryDrawRecords.map((box: any, boxIndex: number) => (
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
                              href={box.block_number}
                              target="_blank"
                            >
                              {box.block_number}
                            </a>
                          </div>
                        )}
                        {box?.loaded && (
                          <div className="inline-flex items-center justify-center gap-1">
                            <Ring width={16} height={16} color="#FBB042" /> x{" "}
                            {box.hash === txHash ? (
                              <span className="text-sm text-[#FBB042]">
                                Win
                              </span>
                            ) : (
                              <span className="text-sm text-white/30">
                                Lose
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          ) : null}

          {hasRefused && lotteryDrawRecords.some((record) => !record.loaded) ? (
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

          {lotteryDrawRecords.every((record) => record.loaded === true) ? (
            <Button
              className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300 mt-12"
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

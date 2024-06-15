"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  Commitment,
  Connection,
} from "@solana/web3.js";
import { Gift } from "@/app/icons/Gift";
import { Button } from "@/components/ui/button";
import { useAccountInfo } from "@/app/store/account";
import {
  fetchCheckinStatus,
  fetchCheckinTransaction,
  fetchFinishCheckin,
} from "@/app/data/task";

import { Card, CardSize } from "../Card";
import base58 from "bs58";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  confirmTransaction,
  sendLegacyTransaction,
  sendSignedTransaction,
} from "@/lib/transactions";
import { toast } from "@/components/ui/use-toast";

let transactionHash = "";

export function CheckIn() {
  const totalDays = 14;
  const wordings = ["1 - 7", "8 - 14", "over 14"];
  const linearGradients = [
    "from-[#00F] to-[#25A3ED]",
    "from-[#00F] via-[#25A3ED] to-[#90D2F9]",
    "from-[#FBB042] to-[#FF5C00]",
  ];

  const { address, token } = useAccountInfo();
  const { connection } = useConnection();
  const { publicKey, wallet, signTransaction } = useWallet();

  const [isChekingIn, setIsChekingIn] = useState(false);
  const [hasChecked, setHasChecked] = useState(true);
  const [transactionString, setTransactionString] = useState("");
  const [checkInDays, setCheckInDays] = useState(0);

  const getPartition = () => {
    const partitionLength = totalDays / 3;
    return checkInDays <= partitionLength
      ? 0
      : checkInDays <= 2 * partitionLength
      ? 1
      : 2;
  };

  const sleep = async (ms: number) => {
    return new Promise((r) => setTimeout(r, ms));
  };

  const triggerTransaction = async () => {
    if (!publicKey || !signTransaction) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const tx = Transaction.from(Buffer.from(transactionString, "base64"));

      // const signedTransaction = await signTransaction(tx);
      // const txHash = await connection.sendRawTransaction(
      //   signedTransaction.serialize()
      // );

      // const connection = new Connection("https://devnet.sonic.game");

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

      transactionHash = txid;

      const result = await confirmTransaction(
        connection,
        transactionHash,
        "finalized"
      );

      if (result.value.err) {
        throw new Error(result.value.err.toString());
      }

      mutationCheckIn.mutate();
    } catch (error) {
      console.error("Transaction failed:", error);
    }

    setIsChekingIn(false);
  };

  const {
    data: dataCheckInInfo,
    isLoading: loadingCheckInInfo,
    refetch: refetchCheckInInfo,
  } = useQuery({
    queryKey: ["queryCheckInInfo", address],
    queryFn: () => fetchCheckinStatus({ token }),
    enabled: !!token,
  });

  const getTransactionHash = useMutation({
    mutationKey: ["mutationCheckInTransactionInfo", address],
    mutationFn: () => fetchCheckinTransaction({ token }),
    onSuccess({ data }) {
      if (data?.hash) {
        setTransactionString(data.hash);
        triggerTransaction();
      } else {
        setIsChekingIn(false);
      }
    },
  });

  const mutationCheckIn = useMutation({
    mutationKey: ["mutationCheckIn", address],
    mutationFn: () => fetchFinishCheckin({ token, hash: transactionHash }),
    onSuccess({ data, status }) {
      if (data.checked) {
        setHasChecked(true);
        refetchCheckInInfo();
        toast({
          description: "Checked in successfully.",
        });
      }
    },
  });

  useEffect(() => {
    const checkInInfo = dataCheckInInfo?.data;
    if (checkInInfo) {
      const { checked, accumulative_days } = checkInInfo;
      setHasChecked(checked);
      setCheckInDays(accumulative_days);
    }
  }, [dataCheckInInfo]);

  const handleCheckIn = () => {
    if (!hasChecked && !isChekingIn) {
      setIsChekingIn(true);
      getTransactionHash.mutate();
    }
  };

  return (
    <>
      {/* rules */}
      <Card name="Rules" size={CardSize.Medium} className="">
        <ul className="list-disc text-[20px] font-normal leading-relaxed pl-6">
          <li className="">
            Request test SOL first.{" "}
            <a
              className="text-[#25A3ED] hover:underline"
              href="https://faucet.sonic.game/#/"
              target="_blank"
            >
              Request here.
            </a>
          </li>
          <li className="">
            Click <i>Check-in</i> button to complete the task and automatically
            receive the corresponding reward.
          </li>
          <li className="">
            If you miss a day, the reward count will reset and start over.
          </li>
          <li className="">
            Rewards Detail:
            <ul className="flex flex-col">
              <li>
                a. Check in for 1-7 days to earn{" "}
                <span className="inline-flex items-center text-[#FBB042]">
                  1 x <Gift color="#FBB042" className="mx-[2px]" /> Ring Monitor
                </span>
                .
              </li>
              <li>
                b. Check in for 8-14 days to earn{" "}
                <span className="inline-flex items-center text-[#FBB042]">
                  2 x <Gift color="#FBB042" className="mx-[2px]" /> Ring
                  Monitors
                </span>
                .
              </li>
              <li>
                c. Check in for over 14 days to earn{" "}
                <span className="inline-flex items-center text-[#FBB042]">
                  3 x <Gift color="#FBB042" className="mx-[2px]" /> Ring
                  Monitors
                </span>
                .
              </li>
            </ul>
          </li>
        </ul>
      </Card>

      {/* main */}
      <Card size={CardSize.Medium} className="mt-20">
        <div className="flex flex-col gap-16">
          {/* wordings */}
          <p className="text-white text-[29px] font-orbitron font-semibold">
            You have checked in for
            <span className="text-[#FBB042] text-[56px] px-[16px]">
              {checkInDays}
            </span>
            {checkInDays === 1 ? "day" : "days"}
          </p>
          {/* progress */}
          <div className="w-full">
            <div className="w-full h-[12px] bg-[#242424] rounded shadow-[0_3px_3px_0_rgba(0,0,0,0.25)] relative">
              <div
                className={cn(
                  "rounded h-[12px] bg-gradient-to-r absolute",
                  linearGradients[getPartition()]
                )}
                style={{
                  width: `${(checkInDays / totalDays) * 100}%`,
                }}
              ></div>
              <div
                className={cn(
                  "rounded h-[12px] bg-gradient-to-r absolute blur-[6px]",
                  linearGradients[getPartition()]
                )}
                style={{
                  width: `${(checkInDays / totalDays) * 100}%`,
                }}
              ></div>
            </div>
            <ul className="flex flex-row justify-between text-white/50 text-[24px] font-semibold font-orbitron mt-6">
              <li className="c">1 day</li>
              <li className="c">{totalDays / 2} days</li>
              <li className="c">{totalDays} days</li>
            </ul>
          </div>
          {/* tools */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-[20px] text-white font-orbitron font-semibold">
              {
                wordings[
                  checkInDays > 0
                    ? Math.ceil(checkInDays / (totalDays / 2)) - 1
                    : 0
                ]
              }{" "}
              days Rewards:{" "}
              <span className="inline-flex items-center text-[#FBB042] font-orbitron">
                x {Math.ceil(checkInDays / (totalDays / 2)) || 1}{" "}
                <Gift color="#FBB042" className="mx-[4px]" />
              </span>
            </p>
            <Button
              className={`w-[177px] h-[48px] text-white text-[16px] font-semibold font-orbitron transition-colors duration-300 ${
                hasChecked
                  ? "bg-[#888888] hover:bg-[#888888]"
                  : isChekingIn
                  ? "bg-[#0000FF]/80 hover:bg-[#0000FF]/80"
                  : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
              }`}
              disabled={hasChecked || isChekingIn}
              onClick={handleCheckIn}
            >
              {isChekingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Check-in
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

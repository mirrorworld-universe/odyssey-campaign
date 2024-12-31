"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Backpack as IconBackpack } from "@/app/icons/Backpack";
import { Gift } from "@/app/icons/Gift";
import { OKXTransparent as IconOKXTransparent } from "@/app/icons/OKXTransparent";

import {
  fetchCheckinStatus,
  fetchCheckinTransaction,
  fetchFinishCheckin
} from "@/app/data/task";
import {
  useAccountInfo,
  useNetworkInfo,
  useSystemInfo
} from "@/app/store/account";
import { Button } from "@/components/ui/button";

import { WalletList } from "@/app/wallet/wallet-list";
import { toast } from "@/components/ui/use-toast";
import { trackClick } from "@/lib/track";
import { confirmTransaction, sendLegacyTransaction } from "@/lib/transactions";
import {
  cn,
  hasExtraWalletBonus,
  isInWalletCampaignTime,
  walletCampaignEndTime,
  walletCampaignStartTime
} from "@/lib/utils";
import { UTCDate } from "@date-fns/utc";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Card, CardSize } from "../Basic/Card";
import { Rules } from "./Rules";
import { BybitLogo } from "@/app/logos/BybitLogo";
import { getFaucetUrl } from "@/app/data/config";

let transactionHash = "";
let currentToken = "";

export function CheckIn() {
  const totalDays = 14;
  const maxRewardsAmount = 3;
  const wordings = ["1 - 7", "8 - 14", "over 14"];
  const linearGradients = [
    "from-[#00F] to-[#25A3ED]",
    "from-[#00F] via-[#25A3ED] to-[#90D2F9]",
    "from-[#FBB042] to-[#FF5C00]"
  ];

  const { isInMaintenance } = useSystemInfo();
  const { address, token } = useAccountInfo();
  const { connection } = useConnection();
  const { publicKey, wallet, signTransaction } = useWallet();
  const { networkId } = useNetworkInfo();

  const [isChekingIn, setIsChekingIn] = useState(false);
  const [hasChecked, setHasChecked] = useState(true);
  const [checkInDays, setCheckInDays] = useState(0);

  const [showRules, setShowRules] = useState(false);

  const walletIcons: any = {
    okx: <IconOKXTransparent className="w-full h-full" color="white" />,
    backpack: <IconBackpack className="w-full h-full" color="white" />,
    bybit: <BybitLogo />
  };

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

  const triggerTransaction = async (transactionString: string) => {
    if (!publicKey || !signTransaction) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const tx = Transaction.from(Buffer.from(transactionString, "base64"));
      const balance = await connection.getBalance(publicKey);
      const fee = await connection.getFeeForMessage(tx.compileMessage());

      if (fee.value && fee.value > balance) {
        toast({
          title: "Insufficient SOL Balance",
          description: (
            <div role="fail">
              Your SOL balance on Sonic Frontier V1 is insufficient to complete
              this transaction. Click{" "}
              <a
                className="text-link hover:text-primary-blue"
                target="_blank"
                href={`https://faucet.sonic.game/#/?network=testnet.v1&wallet=${publicKey.toBase58()}`}
              >
                here
              </a>{" "}
              to claim test SOL.
            </div>
          )
        });
        setIsChekingIn(false);
        return;
      }

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
        "confirmed"
      );

      mutationCheckIn.mutate();
    } catch (error) {
      console.error("Transaction failed:", error);
    }

    setIsChekingIn(false);
  };

  const {
    data: dataCheckInInfo,
    isLoading: loadingCheckInInfo,
    refetch: refetchCheckInInfo
  } = useQuery({
    queryKey: ["queryCheckInInfo", address],
    queryFn: () => fetchCheckinStatus({ token, networkId }),
    enabled: !!token
  });

  const getTransactionHash = useMutation({
    mutationKey: ["buildCheckinTx", address],
    mutationFn: () => fetchCheckinTransaction({ token, networkId }),
    onSuccess({ data }) {
      if (data?.hash) {
        triggerTransaction(data.hash);
      } else {
        setIsChekingIn(false);
      }
    }
  });

  const mutationCheckIn = useMutation({
    mutationKey: ["mutationCheckIn", address],
    mutationFn: () =>
      fetchFinishCheckin({ token, hash: transactionHash, networkId }),
    onSuccess({ data, status }) {
      if (data.checked) {
        setHasChecked(true);
        refetchCheckInInfo();
        let rewards =
          Math.ceil((data.accumulative_days || 1) / (totalDays / 2)) || 1;
        if (
          isInWalletCampaignTime(networkId) &&
          hasExtraWalletBonus(wallet, networkId)
        ) {
          rewards++;
        }
        toast({
          title: '"Check-in" task completed.',
          description: (
            <p role="success" className="block">
              You've received{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                {rewards} x mystery {rewards === 1 ? "box" : "boxes"}
                <Gift width={12} height={12} color="#FBB042" className="mx-1" />
              </span>
              . Open it in the navbar to exchange for rings.
            </p>
          )
        });
      }
    }
  });

  const computedMaxRewards = () => {
    return isInWalletCampaignTime(networkId) &&
      hasExtraWalletBonus(wallet, networkId)
      ? maxRewardsAmount + 1
      : maxRewardsAmount;
  };

  const computedRewardsByDays = () => {
    const rewards = Math.ceil(checkInDays / (totalDays / 2)) || 1;
    return isInWalletCampaignTime(networkId) &&
      hasExtraWalletBonus(wallet, networkId)
      ? rewards + 1
      : rewards;
  };

  const ExtraBonusTip = ({ transparent, className }: any) =>
    hasExtraWalletBonus(wallet, networkId) ? (
      <div
        className={cn(
          "inline-flex flex-row items-center gap-1 md:gap-2",
          transparent ? "opacity-30" : "",
          className
        )}
      >
        <div className={cn("inline-flex")}>
          {
            walletIcons[
              WalletList.find(
                (currentWallet: any) =>
                  currentWallet.name === wallet?.adapter.name
              )?.id
            ]
          }
        </div>
        <span className="text-white text-sm font-semibold font-manrope">
          Bonus added
        </span>
      </div>
    ) : (
      <div
        className={cn(
          "inline-flex flex-row items-center gap-1 md:gap-2",
          transparent ? "opacity-30" : "",
          className
        )}
      >
        <span className="text-white text-sm font-semibold font-manrope">
          Extra bonus for:
        </span>
        <div className="inline-flex flex-row-reverse justify-center items-center gap-2">
          {WalletList.filter(
            (wallet: any) =>
              wallet.hasExtraBonus &&
              wallet.hasExtraBonus[networkId || "devnet"]
          )
            .map((wallet: any) => wallet.id)
            .map((bonus: any, bonusIndex: number) => (
              <div className={cn("inline-flex")} key={bonusIndex}>
                {walletIcons[bonus]}
              </div>
            ))}
        </div>
      </div>
    );

  useEffect(() => {
    const checkInInfo = dataCheckInInfo?.data;
    if (checkInInfo) {
      const { checked, accumulative_days } = checkInInfo;
      setHasChecked(checked);
      setCheckInDays(accumulative_days);
    }
  }, [dataCheckInInfo]);

  useEffect(() => {
    if (token && token !== currentToken) {
      currentToken = token;
      refetchCheckInInfo();
    }
  }, [token]);

  const handleCheckIn = () => {
    if (!hasChecked && !isChekingIn && !isInMaintenance) {
      setIsChekingIn(true);
      getTransactionHash.mutate();
    }
    trackClick({ text: "Check-in" });
  };

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        Check-in
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="list-disc font-normal pl-6">
            <li className="">
              Request test SOL first.{" "}
              <a
                className="text-[#25A3ED] hover:underline"
                href={getFaucetUrl(networkId)}
                target="_blank"
              >
                Request here.
              </a>
            </li>
            <li className="">
              Click "Check-in" button to complete the task and automatically
              receive the corresponding reward.
            </li>
            <li className="">
              If you miss a day, the reward count will reset and start over. The
              check-in time is updated starting at 0:00 UTC.
            </li>
            <li className="">
              Rewards Detail:
              <ul className="flex flex-col">
                <li>
                  a. Check in for 1-7 days to earn{" "}
                  <span className="inline-flex items-center text-[#FBB042]">
                    1 x{" "}
                    <Gift
                      color="#FBB042"
                      className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                    />{" "}
                    Ring Mystery Box
                  </span>
                  .
                </li>
                <li>
                  b. Check in for 8-14 days to earn{" "}
                  <span className="inline-flex items-center text-[#FBB042]">
                    2 x{" "}
                    <Gift
                      color="#FBB042"
                      className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                    />{" "}
                    Ring Mystery Boxes
                  </span>
                  .
                </li>
                <li>
                  c. Check in for over 14 days to earn{" "}
                  <span className="inline-flex items-center text-[#FBB042]">
                    3 x{" "}
                    <Gift
                      color="#FBB042"
                      className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                    />{" "}
                    Ring Mystery Boxes
                  </span>
                  .
                </li>
              </ul>
              {/* <li>
                The duration for the extra bonus for Bybit Wallet is from{" "}
                {format(new UTCDate(walletCampaignStartTime), "PPP")} to{" "}
                {format(new UTCDate(walletCampaignEndTime), "PPP")}
              </li> */}
            </li>
          </ul>
        </Rules>

        {/* main */}
        <Card
          size={CardSize.Medium}
          className="max-w-[1024px] md:mt-20 w-full relative p-6 md:p-10 rounded-none md:rounded-xl"
          nameClassName="bg-[#000]"
        >
          <div className="flex flex-col gap-8 md:gap-16">
            {/* wordings */}
            <p className="text-white text-sm md:text-[29px] font-orbitron font-semibold">
              You have checked in for
              <span className="text-[#FBB042] text-[32px] md:text-[56px] px-2 md:px-4">
                {checkInDays}
              </span>
              {checkInDays === 1 ? "day" : "days"}
            </p>

            {/* progress */}
            <div className="w-full">
              <div className="w-full h-[6px] md:h-3 bg-[#242424] rounded shadow-[0_3px_3px_0_rgba(0,0,0,0.25)] relative">
                <div
                  className={cn(
                    "rounded h-[6px] md:h-3 bg-gradient-to-r absolute",
                    linearGradients[getPartition()]
                  )}
                  style={{
                    width: `${
                      checkInDays > totalDays
                        ? 100
                        : (checkInDays / totalDays) * 100
                    }%`
                  }}
                ></div>
                <div
                  className={cn(
                    "rounded h-[6px] md:h-3 bg-gradient-to-r absolute blur-[6px]",
                    linearGradients[getPartition()]
                  )}
                  style={{
                    width: `${
                      checkInDays > totalDays
                        ? 100
                        : (checkInDays / totalDays) * 100
                    }%`
                  }}
                ></div>
              </div>
              <ul className="flex flex-row justify-between text-white/50 text-xs md:text-2xl font-semibold font-orbitron mt-3 md:mt-6">
                <li className="c">1 day</li>
                <li className="c">{totalDays / 2} days</li>
                <li className="c">{totalDays} days</li>
              </ul>
            </div>

            {/* tools */}
            <div className="hidden md:flex flex-row items-center justify-between">
              {/* left */}
              <div className="flex flex-col gap-2 text-sm md:text-xl text-white font-orbitron font-semibold">
                <p>
                  {
                    wordings[
                      checkInDays > 0
                        ? Math.ceil(checkInDays / (totalDays / 2)) - 1
                        : 0
                    ]
                  }{" "}
                  days Rewards:{" "}
                  <span className="inline-flex items-center text-[#FBB042] font-orbitron">
                    x{" "}
                    {checkInDays > totalDays
                      ? computedMaxRewards()
                      : computedRewardsByDays()}{" "}
                    <Gift
                      color="#FBB042"
                      className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px] md:mx-1"
                    />
                  </span>
                </p>
                {isInWalletCampaignTime(networkId) ? <ExtraBonusTip /> : null}
              </div>
              {/* right */}
              <Button
                className={`hidden md:inline-flex w-[177px] h-12 text-white text-base font-semibold font-orbitron transition-colors duration-300 ${
                  hasChecked || isInMaintenance || isChekingIn
                    ? "bg-[#0000FF]/80 hover:bg-[#0000FF] opacity-30"
                    : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
                }`}
                disabled={hasChecked || isChekingIn}
                onClick={handleCheckIn}
              >
                {isChekingIn && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Check-in
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex md:hidden flex-col gap-4 text-sm md:text-xl text-white font-orbitron font-semibold mt-4">
          <p>
            {
              wordings[
                checkInDays > 0
                  ? Math.ceil(checkInDays / (totalDays / 2)) - 1
                  : 0
              ]
            }{" "}
            days Rewards:{" "}
            <span className="inline-flex items-center text-[#FBB042] font-orbitron">
              x{" "}
              {checkInDays > totalDays
                ? computedMaxRewards()
                : computedRewardsByDays()}{" "}
              <Gift color="#FBB042" className="w-4 h-4 mx-[2px] md:mx-1" />
            </span>
          </p>
          {isInWalletCampaignTime(networkId) ? <ExtraBonusTip /> : null}
        </div>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row items-center gap-4 fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-2/6 h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
        <Button
          className={`w-4/6 h-12 text-white text-base font-semibold font-orbitron transition-colors duration-300 ${
            hasChecked || isInMaintenance || isChekingIn
              ? "bg-[#0000FF]/80 hover:bg-[#0000FF] opacity-30"
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
  );
}

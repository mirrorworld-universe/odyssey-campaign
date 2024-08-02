"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Gift } from "@/app/icons/Gift";
import { Check } from "@/app/icons/Check";
import { OKX as IconOKX } from "@/app/icons/OKX";
import { Backpack as IconBackpack } from "@/app/icons/Backpack";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Card, CardSize } from "../Basic/Card";
import {
  useAccountInfo,
  useNetworkInfo,
  useSystemInfo,
} from "@/app/store/account";
import {
  claimMilestoneRewards,
  getMilestoneDailyInfo,
} from "@/app/data/reward";
import { trackClick } from "@/lib/track";
import { cn, isMobileViewport } from "@/lib/utils";
import { Rules } from "./Rules";
import { WalletList } from "@/app/wallet/wallet-list";

let currentToken = "";

const walletIcons: any = {
  okx: <IconOKX className="w-full h-full" color="white" />,
  backpack: <IconBackpack className="w-full h-full" color="white" />,
};

export function MileStone() {
  const totalAmount = 100;
  const linearGradients = [
    "from-[#00F] to-[#25A3ED]",
    "from-[#00F] via-[#25A3ED] to-[#90D2F9]",
    "from-[#FBB042] to-[#FF5C00]",
  ];
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [claimStage, setClaimStage] = useState(1);
  const [stageList, setStageList] = useState<any>({});

  const [showRules, setShowRules] = useState(false);
  const [currentStageKey, setCurrentStageKey] = useState("stage_1");
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const { isInMaintenance } = useSystemInfo();
  const { address, token } = useAccountInfo();
  const { networkId } = useNetworkInfo();
  const { wallet } = useWallet();

  const hasExtraWalletBonus = () => {
    return (
      WalletList.find(
        (currentWallet: any) => currentWallet.name === wallet?.adapter.name
      )?.hasExtraBonus &&
      WalletList.find(
        (currentWallet: any) => currentWallet.name === wallet?.adapter.name
      )?.hasExtraBonus[networkId || "devnet"]
    );
  };

  const getPartition = () => {
    return transactionAmount <= stageList["stage_1"]?.quantity
      ? 0
      : transactionAmount <= stageList["stage_2"]?.quantity
      ? 1
      : 2;
  };

  const {
    data: dataMilestoneDailyInfo,
    isLoading: loadingMilestoneDailyInfo,
    refetch: refetchMilestoneDailyInfo,
  } = useQuery({
    queryKey: ["queryMilestoneDailyInfo", address],
    queryFn: () => getMilestoneDailyInfo({ token, networkId }),
    enabled: !!token,
  });

  const mutationClaimRewards = useMutation({
    mutationFn: () =>
      claimMilestoneRewards({ token, stage: claimStage, networkId }),
    onSuccess: ({ data, status }) => {
      if (data.claimed) {
        const currentStageKey = Object.keys(stageList)[claimStage - 1];
        setStageList({
          ...stageList,
          ...{
            [currentStageKey]: {
              ...stageList[currentStageKey],
              ...{ claimed: true },
            },
          },
        });
        toast({
          title: '"TX Milestone" task completed.',
          description: (
            <p className="block">
              You completed {stageList[currentStageKey].quantity} transactions
              milestone today and received{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                {hasExtraWalletBonus()
                  ? stageList[currentStageKey].rewards + 1
                  : stageList[currentStageKey].rewards}{" "}
                x mystery boxes
                <Gift color="#FBB042" className="w-3 h-3 mx-[2px]" />
              </span>
              . Open it in the navbar to exchange for rings.
            </p>
          ),
        });
      }
    },
  });

  useEffect(() => {
    const data = dataMilestoneDailyInfo?.data;
    if (data) {
      const { total_transactions, stage_info } = data;
      setTransactionAmount(total_transactions);
      setStageList(stage_info);
      setCurrentStageKey(
        Object.keys(stage_info).filter((key) => stage_info[key].claimed)[0] ||
          "stage_1"
      );
      setCurrentStageIndex(
        Object.keys(stage_info).findIndex((key) => stage_info[key].claimed) > -1
          ? Object.keys(stage_info).findIndex((key) => stage_info[key].claimed)
          : 0
      );
    }
  }, [dataMilestoneDailyInfo]);

  useEffect(() => {
    if (token && token !== currentToken) {
      currentToken = token;
      refetchMilestoneDailyInfo();
    }
  }, [token]);

  const handleClaimGifts = (stageKey: string, stageIndex: number) => {
    if (
      stageList[stageKey].claimed ||
      transactionAmount < stageList[stageKey].quantity ||
      isInMaintenance
    ) {
      return;
    }
    setClaimStage(stageIndex + 1);
    mutationClaimRewards.mutate();
    trackClick({ text: "TX Milestone" });
  };

  const ExtraBonusTip = ({ transparent, className }: any) =>
    hasExtraWalletBonus() ? (
      <p
        className={cn(
          "inline-flex flex-row items-center gap-1 md:gap-2",
          transparent ? "opacity-30" : "",
          className
        )}
      >
        <span className={cn("inline-flex w-3 h-3 md:w-[14px] md:h-[14px]")}>
          {
            walletIcons[
              WalletList.find(
                (currentWallet: any) =>
                  currentWallet.name === wallet?.adapter.name
              )?.id
            ]
          }
        </span>
        <span className="text-white text-xs md:text-sm font-semibold font-manrope">
          Bonus added
        </span>
      </p>
    ) : (
      <p
        className={cn(
          "inline-flex flex-row items-center gap-1 md:gap-2",
          transparent ? "opacity-30" : "",
          className
        )}
      >
        <span className="text-white text-xs md:text-sm font-semibold font-manrope">
          Extra bonus for:
        </span>
        <span className="inline-flex flex-row-reverse justify-center items-center gap-2">
          {WalletList.filter(
            (wallet: any) =>
              wallet.hasExtraBonus &&
              wallet.hasExtraBonus[networkId || "devnet"]
          )
            .map((wallet: any) => wallet.id)
            .map((bonus: any) => (
              <div
                className={cn("inline-flex w-3 h-3 md:w-[14px] md:h-[14px]")}
              >
                {walletIcons[bonus]}
              </div>
            ))}
        </span>
      </p>
    );

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        TX Milestone
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
              Any task and on-chain interaction will generate a corresponding
              transaction record, abbreviated as tx.
            </li>
            <li className="">
              Accumulate the corresponding number of tx to earn rewards.
            </li>
            <li className="">
              <span className="inline-flex items-center text-[#FBB042]">
                Claim rewards manually
              </span>{" "}
              by clicking the button below. Unclaimed rewards will be forfeited
              at the end of the day(UTC Time).
            </li>
            <li className="">
              Rewards Detail:
              <ul className="flex flex-col">
                <li>
                  a. Complete 10 transactions to earn{" "}
                  <span className="inline-flex items-center text-[#FBB042]">
                    2 x{" "}
                    <Gift
                      color="#FBB042"
                      className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                    />{" "}
                    Ring Mystery Box
                  </span>
                  .
                </li>
                <li>
                  b. Complete 50 transactions to earn{" "}
                  <span className="inline-flex items-center text-[#FBB042]">
                    4 x{" "}
                    <Gift
                      color="#FBB042"
                      className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                    />{" "}
                    Ring Mystery Boxes
                  </span>
                  .
                </li>
                <li>
                  c. Complete 100 transactions to earn{" "}
                  <span className="inline-flex items-center text-[#FBB042]">
                    6 x{" "}
                    <Gift
                      color="#FBB042"
                      className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                    />{" "}
                    Ring Mystery Boxes
                  </span>
                  .
                </li>
              </ul>
            </li>
          </ul>
        </Rules>

        {/* main */}
        <Card
          size={CardSize.Medium}
          className="max-w-[1024px] md:mt-20 w-full relative p-6 md:p-10 rounded-lg md:rounded-xl"
          nameClassName="bg-[#000]"
        >
          <div className="flex flex-col gap-1 md:gap-16">
            {/* wordings */}
            <p className="text-white text-sm md:text-[30px] font-orbitron font-semibold">
              You have made
              <span className="text-[#FBB042] text-[28px] md:text-[56px] px-2 md:px-4">
                {transactionAmount <= 100 ? transactionAmount : "100+"}
              </span>
              {transactionAmount === 1 ? "transaction" : "transactions"} today.
            </p>

            {/* progress */}
            <div className="w-full h-[6px] md:h-3 bg-[#242424] rounded shadow-[0_3px_3px_0_rgba(0,0,0,0.25)] relative mt-9 md:mt-0">
              <div
                className={cn(
                  "rounded h-[6px] md:h-3 bg-gradient-to-r absolute",
                  linearGradients[getPartition()]
                )}
                style={{
                  width: `${
                    transactionAmount > totalAmount
                      ? 100
                      : (transactionAmount / totalAmount) * 100
                  }%`,
                }}
              ></div>
              <div
                className={cn(
                  "rounded h-[6px] md:h-3 bg-gradient-to-r blur-[6px] absolute",
                  linearGradients[getPartition()]
                )}
                style={{
                  width: `${
                    transactionAmount > totalAmount
                      ? 100
                      : (transactionAmount / totalAmount) * 100
                  }%`,
                }}
              ></div>
              <ul className="w-full flex flex-row justify-between text-white/50 text-2xl font-semibold font-orbitron absolute -top-4 md:-top-6">
                {Object.keys(stageList).map(
                  (stageKey: string, stageIndex: number) => (
                    <li
                      key={stageIndex}
                      className="inline-flex rounded-[50%] border-4 md:border-8 border-solid border-[#222222] mx-[9px] md:mx-[52px]"
                    >
                      {transactionAmount < stageList[stageKey].quantity ? (
                        <span className="w-7 md:w-12 h-7 md:h-12 inline-flex justify-center items-center text-white text-xs md:text-xl font-bold bg-[#4C4C4C] rounded-[50%]">
                          {stageList[stageKey].quantity}
                        </span>
                      ) : (
                        <Check width={48} height={48} />
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* tools */}
            <div className="flex flex-row items-center justify-between">
              {Object.keys(stageList).map(
                (stageKey: string, stageIndex: number) =>
                  stageList[stageKey].claimed ? (
                    isMobileViewport() ? (
                      <p
                        key={stageIndex}
                        className="inline-flex flex-col items-center gap-1 text-xs md:text-xl font-orbitron font-semibold mt-5"
                      >
                        <span className="inline-flex items-center text-[#FBB042] font-orbitron">
                          x{" "}
                          {hasExtraWalletBonus()
                            ? stageList[stageKey].rewards + 1
                            : stageList[stageKey].rewards}{" "}
                          <Gift
                            color="#FBB042"
                            className="w-3 h-3 md:w-5 md:h-5 mx-1"
                          />
                        </span>
                        <span className="text-white">Claimed</span>
                      </p>
                    ) : (
                      <p
                        key={stageIndex}
                        className="text-xs md:text-xl text-white font-orbitron font-semibold"
                      >
                        Received:{" "}
                        <span className="inline-flex items-center text-[#FBB042] font-orbitron">
                          x{" "}
                          {hasExtraWalletBonus()
                            ? stageList[stageKey].rewards + 1
                            : stageList[stageKey].rewards}{" "}
                          <Gift
                            color="#FBB042"
                            className="w-3 h-3 md:w-5 md:h-5 mx-1"
                          />
                        </span>
                      </p>
                    )
                  ) : isMobileViewport() ? (
                    <div className="inline-flex flex-col">
                      <p
                        key={stageIndex}
                        className="inline-flex flex-col items-center gap-1 text-xs md:text-xl font-orbitron font-semibold mt-5"
                      >
                        <span className="inline-flex items-center min-w-13 text-[#FBB042] font-orbitron">
                          x{" "}
                          {hasExtraWalletBonus()
                            ? stageList[stageKey].rewards + 1
                            : stageList[stageKey].rewards}{" "}
                          <Gift
                            color="#FBB042"
                            className="w-3 h-3 md:w-5 md:h-5 mx-1"
                          />
                        </span>
                      </p>
                      <ExtraBonusTip transparent={false} />
                    </div>
                  ) : (
                    <div className="inline-flex flex-col justify-center items-center gap-3">
                      <Button
                        key={stageIndex}
                        className={`w-[177px] h-12 text-white text-base font-semibold font-orbitron bg-[#0000FF] transition-colors duration-300 ${
                          transactionAmount < stageList[stageKey].quantity ||
                          isInMaintenance
                            ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                            : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 cursor-pointer"
                        }`}
                        onClick={() => handleClaimGifts(stageKey, stageIndex)}
                      >
                        Claim x{" "}
                        {hasExtraWalletBonus()
                          ? stageList[stageKey].rewards + 1
                          : stageList[stageKey].rewards}{" "}
                        <Gift color="#FFFFFF" className="mx-1" />
                      </Button>
                      <ExtraBonusTip
                        transparent={
                          transactionAmount < stageList[stageKey].quantity ||
                          isInMaintenance
                        }
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row gap-3 fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-2/6 h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
        <Button
          className={cn(
            "w-4/6 h-12 text-white text-base font-semibold font-orbitron bg-[#0000FF] transition-colors duration-300",
            transactionAmount < stageList[currentStageKey]?.quantity ||
              isInMaintenance
              ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
              : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 cursor-pointer"
          )}
          onClick={() => handleClaimGifts(currentStageKey, currentStageIndex)}
        >
          Claim x{" "}
          {hasExtraWalletBonus()
            ? stageList[currentStageKey]?.rewards + 1
            : stageList[currentStageKey]?.rewards}{" "}
          <Gift color="#FFFFFF" className="mx-1" />
        </Button>
      </div>
    </div>
  );
}

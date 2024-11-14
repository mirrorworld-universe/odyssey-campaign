"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Backpack as IconBackpack } from "@/app/icons/Backpack";
import { Check } from "@/app/icons/Check";
import { Gift } from "@/app/icons/Gift";
import { OKXTransparent as IconOKXTransparent } from "@/app/icons/OKXTransparent";

import { getFaucetUrl } from "@/app/data/config";
import { BybitLogo } from "@/app/logos/BybitLogo";
import {
  useAccountInfo,
  useNetworkInfo,
  useSystemInfo
} from "@/app/store/account";
import { WalletList } from "@/app/wallet/wallet-list";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { http } from "@/lib/http";
import { trackClick } from "@/lib/track";
import {
  cn,
  hasExtraWalletBonus,
  isInWalletCampaignTime,
  isMobileViewport
} from "@/lib/utils";
import { Card, CardSize } from "../Basic/Card";
import { Rules } from "./Rules";

let currentToken = "";

const walletIcons: any = {
  okx: <IconOKXTransparent className="w-full h-full" color="white" />,
  backpack: <IconBackpack className="w-full h-full" color="white" />,
  bybit: <BybitLogo />
};

export function BridgeChallenge() {
  const totalAmount = 5;
  const linearGradients = [
    "from-[#00F] to-[#25A3ED]",
    "from-[#00F] via-[#25A3ED] to-[#90D2F9]",
    "from-[#FBB042] to-[#FF5C00]"
  ];
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [claimStage, setClaimStage] = useState(1);
  const [stageList, setStageList] = useState<any>({});

  const [showRules, setShowRules] = useState(false);
  const [currentStageKey, setCurrentStageKey] = useState("stage_1");
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [nextStageKey, setNextStageKey] = useState("stage_1");
  const [nextStageIndex, setNextStageIndex] = useState(0);

  const { isInMaintenance } = useSystemInfo();
  const { address, token } = useAccountInfo();
  const { networkId } = useNetworkInfo();
  const { wallet } = useWallet();

  const getPartition = () => {
    return transactionAmount <= stageList["stage_1"]?.quantity
      ? 0
      : transactionAmount <= stageList["stage_2"]?.quantity
      ? 1
      : 2;
  };

  const { data: dataMilestoneDailyInfo, refetch: refetchMilestoneDailyInfo } =
    useQuery({
      queryKey: ["/bridge-campaign/state/daily", address],
      queryFn: () => http.get("/bridge-campaign/state/daily"),
      enabled: !!token,
      refetchOnWindowFocus: true
    });

  const mutationClaimRewards = useMutation({
    mutationFn: () =>
      http.post("/bridge-campaign/reward/claim", { stage: claimStage }),
    onSuccess: ({ data, status }) => {
      if (data.claimed) {
        const currentStageKey = Object.keys(stageList)[claimStage - 1];
        setStageList({
          ...stageList,
          ...{
            [currentStageKey]: {
              ...stageList[currentStageKey],
              ...{ claimed: true }
            }
          }
        });
        let rewards = stageList[currentStageKey].rewards;
        if (
          isInWalletCampaignTime(networkId) &&
          hasExtraWalletBonus(wallet, networkId)
        ) {
          rewards++;
        }
        toast({
          title: '"TX Milestone" task completed.',
          description: (
            <p role="success" className="block">
              You completed {stageList[currentStageKey].quantity} transactions
              milestone today and received{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                {rewards} x mystery boxes
                <Gift color="#FBB042" className="w-3 h-3 mx-[2px]" />
              </span>
              . Open it in the navbar to exchange for rings.
            </p>
          )
        });
      }
    }
  });

  const findNextUnclaimedStageKey = (stages: any[]) => {
    let lastClaimedStage = null;
    for (const [key, value] of Object.entries(stages)) {
      if (value.claimed) {
        lastClaimedStage = key;
      } else if (lastClaimedStage) {
        return key;
      }
    }
    return Object.keys(stages)[0];
  };

  const findNextUnclaimedStageIndex = (stages: any[]) => {
    const keys = Object.keys(stages);
    let lastIndex = 0;
    keys.forEach((key: any, index: number) => {
      if (stages[key].claimed) {
        lastIndex = index;
      }
    });
    return lastIndex + 1;
  };

  useEffect(() => {
    const data = dataMilestoneDailyInfo?.data;
    if (data) {
      const { total_count, stage_info } = data;
      setTransactionAmount(total_count);
      setStageList(stage_info);
      // current stage
      setCurrentStageKey(
        Object.keys(stage_info).filter((key) => stage_info[key].claimed)[0] ||
          "stage_1"
      );
      setCurrentStageIndex(
        Object.keys(stage_info).findIndex((key) => stage_info[key].claimed) > -1
          ? Object.keys(stage_info).findIndex((key) => stage_info[key].claimed)
          : 0
      );
      // next stage
      setNextStageKey(findNextUnclaimedStageKey(stage_info));
      setNextStageIndex(findNextUnclaimedStageIndex(stage_info));
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
    isInWalletCampaignTime(networkId) &&
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
            .map((bonus: any) => (
              <div className={cn("inline-flex")}>{walletIcons[bonus]}</div>
            ))}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        Bridge Challenge
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[611px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="list-disc font-normal pl-6 text-secondary">
            <li className="">
              Request test SOL first.{" "}
              <a
                href={getFaucetUrl()}
                target="_blank"
                className="text-link hover:text-primary-blue transition-colors"
              >
                Request here
              </a>
              .
            </li>
            <li>
              Complete{" "}
              <a
                href="https://bridge-staging.sonic.game/"
                target="_blank"
                className="text-link hover:text-primary-blue transition-colors"
              >
                Bridge
              </a>{" "}
              transaction, claim rewards manually by clicking the button below.
            </li>
            <li className="">
              Complete at least 5 successful bridge transactions from both side,
              and refresh page to claim the corresponding rewards.
            </li>
            <li className="">
              Complete 1 bridge transaction to earn{" "}
              <span className="inline-flex items-center text-gold-yellow">
                1 x{" "}
                <Gift
                  color="#FBB042"
                  className="size-3 md:w-[18px] md:h-[18px] mx-[2px]"
                />{" "}
                Ring Mystery Boxes
              </span>
            </li>
            <li className="">
              Complete 5 bridge transactions to earn{" "}
              <span className="inline-flex items-center text-gold-yellow">
                3 x{" "}
                <Gift
                  color="#FBB042"
                  className="size-3 md:w-[18px] md:h-[18px] mx-[2px]"
                />{" "}
                Ring Mystery Boxes
              </span>
            </li>
          </ul>
        </Rules>

        {/* main */}
        <Card
          size={CardSize.Medium}
          className="max-w-[1024px] md:mt-20 w-full relative p-6 md:p-10 rounded-none"
          nameClassName="bg-[#000]"
        >
          <div className="flex flex-col gap-1 md:gap-16">
            {/* wordings */}
            <p className="text-white text-sm md:text-[30px] font-orbitron font-semibold">
              You have made
              <span className="text-gold-yellow sonic-title2 md:sonic-headline0 px-2 md:px-4">
                {transactionAmount}
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
                  }%`
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
                  }%`
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
                        <Check className="w-7 md:w-12 h-7 md:h-12 inline-flex" />
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
                          {isInWalletCampaignTime(networkId) &&
                          hasExtraWalletBonus(wallet, networkId)
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
                          {isInWalletCampaignTime(networkId) &&
                          hasExtraWalletBonus(wallet, networkId)
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
                    <div className="inline-flex flex-col" key={stageIndex}>
                      <p
                        key={stageIndex}
                        className="inline-flex flex-col items-center gap-1 text-xs md:text-xl font-orbitron font-semibold mt-5"
                      >
                        <span className="inline-flex items-center min-w-13 text-[#FBB042] font-orbitron">
                          x{" "}
                          {isInWalletCampaignTime(networkId) &&
                          hasExtraWalletBonus(wallet, networkId)
                            ? stageList[stageKey].rewards + 1
                            : stageList[stageKey].rewards}{" "}
                          <Gift
                            color="#FBB042"
                            className="w-3 h-3 md:w-5 md:h-5 mx-1"
                          />
                        </span>
                      </p>
                      {isInWalletCampaignTime(networkId) ? (
                        <ExtraBonusTip
                          transparent={false}
                          className="hidden md:inline-flex"
                        />
                      ) : null}
                    </div>
                  ) : (
                    <div
                      className="inline-flex flex-col justify-center items-center gap-3"
                      key={stageIndex}
                    >
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
                        Claim x {stageList[stageKey].rewards}
                        {/* {isInWalletCampaignTime(networkId) &&
                        hasExtraWalletBonus(wallet, networkId)
                          ? stageList[stageKey].rewards + 1
                          : stageList[stageKey].rewards}{" "} */}
                        <Gift color="#FFFFFF" className="mx-1" />
                      </Button>
                      {/* {isInWalletCampaignTime(networkId) ? (
                        <ExtraBonusTip
                          transparent={
                            transactionAmount < stageList[stageKey].quantity ||
                            isInMaintenance
                          }
                          className="hidden md:inline-flex"
                        />
                      ) : null} */}
                    </div>
                  )
              )}
            </div>
          </div>
        </Card>

        {/* {isInWalletCampaignTime(networkId) ? (
          <ExtraBonusTip className="inline-flex md:hidden mt-4" />
        ) : null} */}
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row gap-3 fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-20 shrink-0 h-12 border border-solid border-line bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
        <Button
          className={cn(
            "grow h-12 text-white text-base font-semibold font-orbitron bg-[#0000FF] transition-colors duration-300",
            stageList[nextStageKey]?.claimed ||
              transactionAmount < stageList[nextStageKey]?.quantity ||
              isInMaintenance
              ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
              : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 cursor-pointer"
          )}
          onClick={() => handleClaimGifts(nextStageKey, nextStageIndex)}
        >
          Claim x{" "}
          {isInWalletCampaignTime(networkId) &&
          hasExtraWalletBonus(wallet, networkId)
            ? stageList[nextStageKey]?.rewards + 1
            : stageList[nextStageKey]?.rewards}{" "}
          <Gift color="#FFFFFF" className="mx-1" />
        </Button>
      </div>
    </div>
  );
}
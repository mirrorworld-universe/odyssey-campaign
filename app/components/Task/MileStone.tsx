"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Gift } from "@/app/icons/Gift";
import { Button } from "@/components/ui/button";
import { Card, CardSize } from "../Basic/Card";
import { useAccountInfo, useSystemInfo } from "@/app/store/account";
import {
  claimMilestoneRewards,
  getMilestoneDailyInfo,
} from "@/app/data/reward";
import { Check } from "@/app/icons/Check";
import { toast } from "@/components/ui/use-toast";
import { trackClick } from "@/lib/track";
import { cn } from "@/lib/utils";
import { Rules } from "./Rules";

let currentToken = "";

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

  const { isInMaintenance } = useSystemInfo();
  const { address, token } = useAccountInfo();

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
    queryFn: () => getMilestoneDailyInfo({ token }),
    enabled: !!token,
  });

  const mutationClaimRewards = useMutation({
    mutationFn: () => claimMilestoneRewards({ token, stage: claimStage }),
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
                {stageList[currentStageKey].rewards} x mystery boxes
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
          </ul>
        </Rules>

        {/* main */}
        <Card
          size={CardSize.Medium}
          className="max-w-[1024px] md:mt-20 w-full relative p-6 md:p-10 rounded-lg md:rounded-xl"
          nameClassName="bg-[#000]"
        >
          <div className="flex flex-col gap-10 md:gap-16">
            {/* wordings */}
            <p className="text-white text-sm md:text-[30px] font-orbitron font-semibold">
              You have made
              <span className="text-[#FBB042] text-[28px] md:text-[56px] px-2 md:px-4">
                {transactionAmount <= 100 ? transactionAmount : "100+"}
              </span>
              {transactionAmount === 1 ? "transaction" : "transactions"} today.
            </p>

            {/* progress */}
            <div className="w-full h-3 bg-[#242424] rounded shadow-[0_3px_3px_0_rgba(0,0,0,0.25)] relative">
              <div
                className={cn(
                  "rounded h-3 bg-gradient-to-r absolute",
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
                  "rounded h-3 bg-gradient-to-r blur-[6px] absolute",
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
              <ul className="w-full flex flex-row justify-between text-white/50 text-2xl font-semibold font-orbitron absolute -top-6">
                {Object.keys(stageList).map(
                  (stageKey: string, stageIndex: number) => (
                    <li
                      key={stageIndex}
                      className="rounded-[50%] border-2 border-solid border-[#222222] mx-[52px]"
                    >
                      {transactionAmount < stageList[stageKey].quantity ? (
                        <span className="w-12 h-12 inline-flex justify-center items-center text-white text-xs md:text-xl font-bold bg-[#4C4C4C] rounded-[50%]">
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
                    <p
                      key={stageIndex}
                      className="text-xs md:text-xl text-white font-orbitron font-semibold"
                    >
                      Received:{" "}
                      <span className="inline-flex items-center text-[#FBB042] font-orbitron">
                        x {stageList[stageKey].rewards}{" "}
                        <Gift
                          color="#FBB042"
                          className="w-3 h-3 md:w-5 md:h-5 mx-1"
                        />
                      </span>
                    </p>
                  ) : (
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
                      Claim x {stageList[stageKey].rewards}{" "}
                      <Gift color="#FFFFFF" className="mx-1" />
                    </Button>
                  )
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-full h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
      </div>
    </div>
  );
}

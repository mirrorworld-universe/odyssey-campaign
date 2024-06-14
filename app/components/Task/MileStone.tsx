"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Gift } from "@/app/icons/Gift";
import { Button } from "@/components/ui/button";
import { Card, CardSize } from "../Card";
import { useAccountInfo } from "@/app/store/account";
import {
  claimMilestoneRewards,
  getMilestoneDailyInfo,
} from "@/app/data/reward";
import { Check } from "@/app/icons/Check";
import { toast } from "@/components/ui/use-toast";

export function MileStone() {
  const totalAmount = 100;
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [claimStage, setClaimStage] = useState(1);
  const [stageList, setStageList] = useState<any>({});
  const [hasChecked, setHasChecked] = useState(true);

  const { address, token } = useAccountInfo();

  const { data: dataMilestoneDailyInfo, isLoading: loadingMilestoneDailyInfo } =
    useQuery({
      queryKey: ["queryMilestoneDailyInfo", address],
      queryFn: () => getMilestoneDailyInfo({ token }),
      enabled: !!token,
    });

  const mutationClaimRewards = useMutation({
    mutationFn: () => claimMilestoneRewards({ token, stage: claimStage }),
    onSuccess: ({ data }) => {
      if (data.success) {
        toast({
          title: "Congratulations",
          description: "Claimed successfully.",
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

  const handleClaimGifts = (stageKey: string, stageIndex: number) => {
    if (
      stageList[stageKey].claimed ||
      transactionAmount < stageList[stageKey].quantity
    ) {
      return;
    }
    setClaimStage(stageIndex + 1);
    mutationClaimRewards.mutate();
  };

  return (
    <>
      {/* rules */}
      <Card name="Rules" size={CardSize.Medium} className="">
        <ul className="list-disc text-[20px] font-normal leading-relaxed pl-6">
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
            by clicking the button below. Unclaimed rewards will be forfeited at
            the end of the day.
          </li>
        </ul>
      </Card>

      {/* main */}
      <Card size={CardSize.Medium} className="mt-20">
        <div className="flex flex-col gap-16">
          {/* wordings */}
          <p className="text-white text-[29px] font-orbitron font-semibold">
            You have made
            <span className="text-[#FBB042] text-[56px] px-[16px]">
              {transactionAmount}
            </span>
            {transactionAmount === 1 ? "transaction" : "transactions"} today.
          </p>

          {/* progress */}
          <div className="w-full h-[12px] bg-[#242424] rounded shadow-[0_3px_3px_0_rgba(0,0,0,0.25)] relative">
            <div
              className="rounded h-[12px] bg-gradient-to-r from-[#00F] via-[#25A3ED] to-[#90D2F9] absolute"
              style={{
                width: `${(transactionAmount / totalAmount) * 100}%`,
              }}
            ></div>
            <div
              className="rounded h-[12px] bg-gradient-to-r from-[#00F] via-[#25A3ED] to-[#90D2F9] blur-[6px] absolute"
              style={{
                width: `${(transactionAmount / totalAmount) * 100}%`,
              }}
            ></div>
            <ul className="w-full flex flex-row justify-between text-white/50 text-[24px] font-semibold font-orbitron absolute -top-6">
              {Object.keys(stageList).map(
                (stageKey: string, stageIndex: number) => (
                  <li className="rounded-[50%] border-[8px] border-solid border-[#222222] mx-[52px]">
                    {transactionAmount < stageList[stageKey].quantity ? (
                      <span className="w-[48px] h-[48px] inline-flex justify-center items-center text-white text-xl font-bold bg-[#4C4C4C] rounded-[50%]">
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
                  <p className="text-[20px] text-white font-orbitron font-semibold">
                    Received:{" "}
                    <span className="inline-flex items-center text-[#FBB042] font-orbitron">
                      x {stageList[stageKey].rewards}{" "}
                      <Gift color="#FBB042" className="mx-[4px]" />
                    </span>
                  </p>
                ) : (
                  <Button
                    className={`w-[177px] h-[48px] text-white text-[16px] font-semibold font-orbitron bg-[#0000FF] transition-colors duration-300 ${
                      transactionAmount < stageList[stageKey].quantity
                        ? "hover:bg-[#0000FF] opacity-30"
                        : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
                    }`}
                    onClick={() => handleClaimGifts(stageKey, stageIndex)}
                  >
                    Claim x {stageList[stageKey].rewards}{" "}
                    <Gift color="#FFFFFF" className="mx-[4px]" />
                  </Button>
                )
            )}
          </div>
        </div>
      </Card>
    </>
  );
}

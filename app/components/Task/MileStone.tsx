"use client";
import { useState } from "react";
import { Gift } from "@/app/icons/Gift";
import { Button } from "@/components/ui/button";
import { Card, CardSize } from "../Card";

export function MileStone() {
  const totalAmount = 100;
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [hasChecked, setHasChecked] = useState(true);

  const handleClaimGifts = () => {};

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
              className="rounded h-[12px] bg-red-300"
              style={{
                width: `${(transactionAmount / totalAmount) * 100}%`,
              }}
            ></div>
            <ul className="w-full flex flex-row justify-between text-white/50 text-[24px] font-semibold font-orbitron absolute -top-3">
              <li className="c">1 day</li>
              <li className="c">{totalAmount / 2} days</li>
              <li className="c">{totalAmount} days</li>
            </ul>
          </div>
          {/* tools */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-[20px] text-white font-orbitron font-semibold">
              Received:{" "}
              <span className="inline-flex items-center text-[#FBB042] font-orbitron">
                x 10 <Gift color="#FBB042" className="mx-[4px]" />
              </span>
            </p>
            <Button
              className={`w-[177px] h-[48px] text-white text-[16px] font-semibold font-orbitron transition-colors duration-300 ${
                hasChecked
                  ? "bg-[#888888] hover:bg-[#888888]"
                  : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
              }`}
              onClick={handleClaimGifts}
            >
              Claim x 50 <Gift color="#FFFFFF" className="mx-[4px]" />
            </Button>
            <Button
              className={`w-[177px] h-[48px] text-white text-[16px] font-semibold font-orbitron transition-colors duration-300 ${
                hasChecked
                  ? "bg-[#888888] hover:bg-[#888888]"
                  : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
              }`}
              onClick={handleClaimGifts}
            >
              Claim x 100 <Gift color="#FFFFFF" className="mx-[4px]" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

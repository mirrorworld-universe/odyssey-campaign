"use client";
import { Gift } from "@/app/icons/Gift";
import { Card, CardSize } from "../Card";
import { Ring } from "@/app/icons/Ring";
import { useState } from "react";
import { prettyNumber } from "@/lib/utils";

export function RingLottery() {
  const totalRing = 100000000;
  const [currentRing, setCurrentRing] = useState(0);

  return (
    <>
      {/* rules */}
      <Card name="Rules" size={CardSize.Medium} className="">
        <ul className="list-disc text-[20px] font-normal leading-relaxed pl-6">
          <li className="">
            Request test SOL first.{" "}
            <a href="" className="text-[#25A3ED] hover:underline">
              Request here.
            </a>
          </li>
          <li className="">
            Enter the number of times you want to draw to participate in the
            lottery.
          </li>
          <li className="">
            Each block will have only one winner, and each winner will win 1
            ring!
          </li>
          <li className="">
            The lottery price and the number of rings follow a bonding curve.
            Check the{" "}
            <a href="" className="text-[#25A3ED] hover:underline">
              Price Table
            </a>{" "}
            here.
          </li>
        </ul>
      </Card>

      {/* minted rings */}
      <Card name="Minted Rings" size={CardSize.Medium} className="mt-20">
        <div className="flex flex-row justify-between items-center">
          <Ring width={56} height={56} color="#FBB042" />
          <span className="text-white text-[48px] font-semibold font-orbitron">
            {`${prettyNumber(currentRing)}/${prettyNumber(totalRing)}`}
          </span>
        </div>
      </Card>

      <div className="flex flex-row gap-20 mt-20">
        {/* winner board */}
        <Card name="Winner Board" size={CardSize.Medium}>
          <div className="flex flex-row justify-between items-center">
            <Ring width={56} height={56} color="#FBB042" />
            <span className="text-white text-[48px] font-semibold font-orbitron">
              {`${prettyNumber(currentRing)}/${prettyNumber(totalRing)}`}
            </span>
          </div>
        </Card>

        {/* draw */}
        <Card size={CardSize.Medium}>
          <div className="flex flex-row justify-between items-center">
            <Ring width={56} height={56} color="#FBB042" />
            <span className="text-white text-[48px] font-semibold font-orbitron">
              {`${prettyNumber(currentRing)}/${prettyNumber(totalRing)}`}
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}

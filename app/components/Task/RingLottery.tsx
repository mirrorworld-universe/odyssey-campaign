"use client";
import { Gift } from "@/app/icons/Gift";
import { Card, CardSize } from "../Card";
import { Ring } from "@/app/icons/Ring";
import { useState } from "react";
import { prettyNumber } from "@/lib/utils";
import { Arrow } from "@/app/icons/Arrow";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            <a
              className="text-[#25A3ED] hover:underline"
              href="https://faucet.sonic.game/#/"
              target="_blank"
            >
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
        <Card name="Winner Board" size={CardSize.Medium} className="w-[470px]">
          <div className="flex flex-row justify-between items-center"></div>
        </Card>

        {/* draw */}
        <Card size={CardSize.Medium} className="w-[470px]">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row justify-between">
              <span className="text-white text-[20px] font-orbitron">
                Number of draws
              </span>
              <div className="flex items-center">
                <Select>
                  <SelectTrigger className="bg-transparent text-white text-[18px] font-semibold">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
                        (number) => (
                          <SelectItem value={number.toString()} key={number}>
                            {number}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

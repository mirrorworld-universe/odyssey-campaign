"use client";
import { Gift } from "@/app/icons/Gift";
import { Card, CardSize } from "../Card";

export function RingLottery() {
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

      {/* main */}
      <Card size={CardSize.Medium} className="mt-20"></Card>
    </>
  );
}

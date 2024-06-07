"use client";
import { Gift } from "@/app/icons/Gift";
import { Card, CardSize } from "../Card";

export function MileStone() {
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
      <Card size={CardSize.Medium} className="mt-20"></Card>
    </>
  );
}

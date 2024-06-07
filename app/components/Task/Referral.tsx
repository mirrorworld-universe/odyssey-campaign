"use client";
import { Gift } from "@/app/icons/Gift";
import { Card, CardSize } from "../Card";

export function Referral() {
  return (
    <>
      {/* rules */}
      <Card name="Rules" size={CardSize.Medium} className="">
        <ul className="list-disc text-[20px] font-normal leading-relaxed pl-6">
          <li className="">
            Copy Copy the invite code and send it to a friend. If the friend
            successfully completes the "Meet Sonic" task, they will be
            considered successfully activated, and you will receive the
            corresponding reward.
          </li>
          <li className="">
            For each successfully invited friend, you will receive{" "}
            <span className="inline-flex items-center text-[#FBB042]">
              4 x <Gift color="#FBB042" className="mx-[2px]" /> Ring Monitors
            </span>{" "}
            automatically.
          </li>
        </ul>
      </Card>

      {/* main */}
      <Card size={CardSize.Medium} className="mt-20"></Card>
    </>
  );
}

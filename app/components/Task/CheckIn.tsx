"use client";
import { Gift } from "@/app/icons/Gift";
import { Card, CardSize } from "../Card";

export function CheckIn() {
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
            Click “check-in” button to complete the task and automatically
            receive the corresponding reward.
          </li>
          <li className="">
            If you miss a day, the reward count will reset and start over.
          </li>
          <li className="">
            Rewards Detail:
            <ul className="flex flex-col">
              <li>
                a. Check in for 1-7 days to earn{" "}
                <span className="inline-flex items-center text-[#FBB042]">
                  1 x <Gift color="#FBB042" className="mx-[2px]" /> Ring Monitor
                </span>
                .
              </li>
              <li>
                b. Check in for 8-14 days to earn{" "}
                <span className="inline-flex items-center text-[#FBB042]">
                  2 x <Gift color="#FBB042" className="mx-[2px]" /> Ring
                  Monitors
                </span>
                .
              </li>
              <li>
                c. Check in for over 14 days to earn{" "}
                <span className="inline-flex items-center text-[#FBB042]">
                  3 x <Gift color="#FBB042" className="mx-[2px]" /> Ring
                  Monitors
                </span>
                .
              </li>
            </ul>
          </li>
        </ul>
      </Card>

      {/* main */}
      <Card size={CardSize.Medium} className="mt-20"></Card>
    </>
  );
}

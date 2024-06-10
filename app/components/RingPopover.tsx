import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Ring } from "../icons/Ring";
import { Arrow } from "../icons/Arrow";
import { Gift } from "../icons/Gift";
import { Card, CardSize } from "./Card";
import { prettyNumber } from "@/lib/utils";

export default function RingPopover({ ring = 0, ringMonitor = 0 }: any) {
  const [ringAmount, setRingAmount] = useState(ring);
  const [ringMonitorAmount, setRingMonitorAmount] = useState(ringMonitor);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <Ring width={24} height={24} color="#FBB042" />
          <span className="text-white text-[16px] font-orbitron font-semibold">
            {prettyNumber(ringAmount)}
          </span>
          <Arrow width={24} height={24} color="white" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] bg-[#1B1B1B] border-none rounded-[8px] px-0 py-0">
        {/* balance */}
        <div className="flex px-[16px] py-[24px]">
          <Card
            name="Current Balance"
            nameClassName="bg-[#1B1B1B]"
            size={CardSize.Small}
          >
            <div className="flex flex-row justify-between">
              <div className="flex items-center">
                <Gift width={16} height={16} color="#FBB042" className="mr-1" />{" "}
                <span className="text-white text-[16px] font-orbitron font-semibold">
                  {ringMonitorAmount}
                </span>
              </div>
              <div className="flex items-center">
                <Ring width={16} height={16} color="#FBB042" className="mr-1" />{" "}
                <span className="text-white text-[16px] font-orbitron font-semibold">
                  {ringAmount}
                </span>
              </div>
            </div>
          </Card>
        </div>
        {/* claim history */}
        <div className="flex flex-col px-[16px] py-[8px] font-orbitron border-t border-solid border-white/10">
          <div className="text-white text-[14px] py-[8px]">Claim History</div>
          <div className="flex flex-row justify-between text-white/50 text-[12px] py-[8px]">
            <div className="flex items-center">
              Claimed x 3{" "}
              <Gift
                width={12}
                height={12}
                color="rgba(255,255,255,.5)"
                className="mx-[2px]"
              />
            </div>
            <div className="flex items-center">
              + 12{" "}
              <Ring
                width={12}
                height={12}
                color="rgba(255,255,255,.5)"
                className="mx-[2px]"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

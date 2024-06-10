import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ring } from "../icons/Ring";
import { prettyNumber } from "@/lib/utils";
import { Arrow } from "../icons/Arrow";
import { Gift } from "../icons/Gift";

export default function RingDropdown({ ring = 0, ringMonitor = 0 }: any) {
  const [ringAmount, setRingAmount] = useState(ring);
  const [ringMonitorAmount, setRingMonitorAmount] = useState(ringMonitor);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <Ring width={24} height={24} color="#FBB042" />
          <span className="text-white text-[16px] font-orbitron font-semibold">
            {prettyNumber(ringAmount)}
          </span>
          <Arrow width={24} height={24} color="white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[320px] bg-[#1B1B1B]">
        <DropdownMenuItem className="flex flex-col">
          <div className="flex px-[16px] py-[24px]"></div>
          <div className="flex flex-col px-[16px] py-[8px] font-orbitron">
            <div className="text-white text-[14px] py-[8px]">Claim History</div>
            <div className="flex flex-row justify-between text-white/50 py-[8px]">
              <div className="flex">
                Claimed x 3 <Gift />
              </div>
              <div className="flex">
                + 12 <Ring />
              </div>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

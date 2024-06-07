"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Gift } from "@/app/icons/Gift";
import { Button } from "@/components/ui/button";
import { useAccountInfo } from "@/app/store/account";
import { fetchCheckinStatus } from "@/app/data/task";

import { Card, CardSize } from "../Card";

export function CheckIn() {
  const { address, token } = useAccountInfo();

  const [hasChecked, setHasChecked] = useState(true);
  const [checkInDays, setCheckInDays] = useState(0);

  const { data: dataCheckInInfo, isLoading: loadingCheckInInfo } = useQuery({
    queryKey: ["queryCheckInInfo", address],
    queryFn: () => fetchCheckinStatus({ token }),
    enabled: !!token,
  });

  // const mutationCheckIn = useMutation({
  //   mutationKey: ["mutationCheckIn", address],
  //   mutationFn: () => fetchCheckinStatus({ token }),
  //   onSuccess(data) {

  //   },
  // });

  useEffect(() => {
    const checkInInfo = dataCheckInInfo?.data;
    if (checkInInfo) {
      const { checked, accumulative_days } = checkInInfo;
      setHasChecked(checked);
      setCheckInDays(accumulative_days);
    }
  }, [dataCheckInInfo]);

  const handleCheckIn = () => {
    // if (!hasChecked) {
    //   mutationCheckIn.mutate();
    // }
  };

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
      <Card size={CardSize.Medium} className="mt-20">
        <div className="flex flex-col gap-16">
          {/* wordings */}
          <p className="text-white text-[29px] font-orbitron font-semibold">
            You have checked in for{" "}
            <span className="text-[#FBB042] text-[56px]">{checkInDays}</span>{" "}
            {checkInDays === 1 ? "day" : "days"}
          </p>
          {/* progress */}
          <div className="w-full">
            <div className="w-full h-[12px] bg-[#242424] rounded shadow-[0_3px_3px_0_rgba(0,0,0,0.25)]"></div>
            <ul className="flex flex-row justify-between text-white/50 text-[24px] font-semibold font-orbitron mt-6">
              <li className="c">1 day</li>
              <li className="c">7 days</li>
              <li className="c">14 days</li>
            </ul>
          </div>
          {/* tools */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-[20px] text-white font-orbitron font-semibold">
              8 - 14 days Rewards:{" "}
              <span className="inline-flex items-center text-[#FBB042] font-orbitron">
                x 1 <Gift color="#FBB042" className="mx-[4px]" />
              </span>
            </p>
            <Button
              className="w-[177px] h-[48px] text-white font-orbitron bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 transition-colors duration-300"
              onClick={handleCheckIn}
            >
              Check-in
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

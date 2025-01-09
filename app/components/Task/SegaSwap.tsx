"use client";
import { useState } from "react";

import { Card, CardSize } from "@/app/components/Basic/Card";
import { Gift } from "@/app/icons/Gift";
import {
  useAccountInfo,
  useSystemInfo,
  useWalletModal
} from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useBreakpoint } from "@/app/hooks";
import { toast } from "@/components/ui/use-toast";
import { trackClick } from "@/lib/track";
import { Rules } from "./Rules";
import { getFaucetUrl } from "@/app/data/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "@/lib/http";

export function SegaSwap() {
  const { onOpen } = useWalletModal();
  const { address, token } = useAccountInfo();
  const { isInMaintenance } = useSystemInfo();

  const isMobile = useBreakpoint() === "mobile";

  const [showRules, setShowRules] = useState(false);

  const { data: segaSwapStatus, refetch: refetchSegaSwapStatus } = useQuery({
    queryKey: ["sega-swap-status"],
    queryFn: () => http.get("/user/sega/status"),
    enabled: !!address && !!token
  });

  const { mutate: claimReward } = useMutation({
    mutationKey: ["sega-claim-reward"],
    mutationFn: (reward_type: string) =>
      http.post(`/user/sega/claim`, { reward_type }),
    onSuccess: (res) => {
      showRewardsToast(res);
      refetchSegaSwapStatus();
    },
    onError: () => {
      console.log("error");
    }
  });

  const showRewardsToast = (res: any) => {
    toast({
      title: '"Sega Swap" task completed.',
      description: (
        <p role="success" className="block">
          You've received{" "}
          <span className="inline-flex items-center text-[#FBB042]">
            {res?.data?.amount || 2} x mystery boxes
            <Gift color="#FBB042" className="w-3 h-3 mx-[2px]" />
          </span>
          . Open it in the navbar to exchange for rings.
        </p>
      )
    });
  };

  const socialMediaList = [
    {
      id: "sega_swap",
      name: "Swap Tokens",
      link: "https://twitter.com/SonicSVM",
      description: (
        <div className="sonic-body2 text-white/50">
          Complete a trade of any token pair and amount on Sega Dex.{" "}
          <span
            onClick={() =>
              window.open(
                "https://dev.sega.so/swap/?inputMint=7MTK1xGBbwNken7X7aHJhWaLtJFVCRd7x5EeavuUo5Wv&outputMint=sol",
                "_blank"
              )
            }
            className="text-link hover:text-primary-blue transition-colors cursor-pointer"
          >
            Swap on SEGA
          </span>
          <p className="sonic-title4 text-secondary font-orbitron mt-2 md:mt-4">
            Swap Completed:
            <span className="sonic-body4 font-manrope pl-2">
              <span className="text-gold-yellow">
                {segaSwapStatus?.data?.sega_swap?.task_status ? 1 : 0}
              </span>
              /1
            </span>
          </p>
        </div>
      ),
      buttonText: (
        <>
          Claim x 2 <Gift color="white" className="size-5 ml-2" />
        </>
      ),
      handler: () => {
        claimReward("swap");
      }
    },
    {
      id: "sega_liquidity",
      name: "Provide Liquidities",
      link: "https://discord.gg/joinmirrorworld",
      description: (
        <div className="sonic-body2 text-white/50">
          Provide liquidity to any pool with any amount on Sega Dex.{" "}
          <span
            onClick={() =>
              window.open("https://dev.sega.so/liquidity-pools/", "_blank")
            }
            className="text-link hover:text-primary-blue transition-colors cursor-pointer"
          >
            Deposit on SEGA
          </span>
          <p className="sonic-title4 text-secondary font-orbitron mt-2 md:mt-4">
            Deposit Completed:
            <span className="sonic-body4 font-manrope pl-2">
              <span className="text-gold-yellow">
                {segaSwapStatus?.data?.sega_liquidity?.task_status ? 1 : 0}
              </span>
              /1
            </span>
          </p>
        </div>
      ),
      buttonText: (
        <>
          Claim x 1 <Gift color="white" className="size-5 ml-2" />
        </>
      ),
      handler: () => {
        claimReward("liquidity");
      }
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        Daily SEGA
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="w-full list-disc font-normal pl-6">
            <li className="">
              Request test SOL first,{" "}
              <a
                className="text-link hover:text-primary-blue transition-colors"
                href={getFaucetUrl()}
                target="_blank"
              >
                request here
              </a>
              .
            </li>
            <li>
              Click the links below to visit the SEGA DEX page, complete the
              tasks, and earn rewards.
            </li>
            <li className="">
              Complete at least 1 successful swap transaction to earn{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                2 x{" "}
                <Gift
                  color="#FBB042"
                  className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                />{" "}
                Ring Mystery Boxes.
              </span>
              <a
                className="text-link hover:text-primary-blue transition-colors"
                href="https://dev.sega.so/swap/?inputMint=7MTK1xGBbwNken7X7aHJhWaLtJFVCRd7x5EeavuUo5Wv&outputMint=sol"
                target="_blank"
              >
                {" "}
                click here
              </a>
            </li>
            <li className="">
              Complete at least 1 successful deposit transaction to earn{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                1 x{" "}
                <Gift
                  color="#FBB042"
                  className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                />{" "}
                Ring Mystery Boxes.
              </span>
              <a
                className="text-link hover:text-primary-blue transition-colors"
                href="https://dev.sega.so/liquidity-pools/"
                target="_blank"
              >
                {" "}
                click here
              </a>
            </li>

            <li>Refresh page to claim the corresponding rewards.</li>
          </ul>
        </Rules>

        {/* main */}
        <Card
          size={CardSize.Medium}
          className="max-w-[1024px] md:mt-20 p-6 md:p-10 rounded-none"
          nameClassName="bg-[#000]"
        >
          <ul className="list-disc font-normal leading-relaxed md:pl-6">
            {socialMediaList.map((socialMedia, socialMediaIndex) => (
              <li
                className={`flex flex-col xl:flex-row items-start xl:items-center w-full ${
                  socialMediaIndex > 0
                    ? "border-t-[1px] border-white/10 border-solid pt-8 md:pt-10"
                    : "pb-8 md:pb-10"
                }`}
                key={socialMediaIndex}
              >
                <div className="flex flex-col pr-20 xl:border-r xl:border-solid xl:border-white/10">
                  <h5 className="text-sm md:text-xl text-white font-semibold font-orbitron">
                    {socialMedia.name}
                  </h5>
                  <p className="w-full text-xs md:text-base text-white/50 font-normal mt-2 md:mt-4">
                    {socialMedia.description}
                  </p>
                </div>
                <Button
                  className={cn(
                    "sonic-title3 md:sonic-title2 ml-0 md:ml-20 mt-6"
                  )}
                  variant={"primary"}
                  disabled={
                    !segaSwapStatus?.data?.[socialMedia.id]?.task_status ||
                    segaSwapStatus?.data?.[socialMedia.id]?.reward_claimed
                  }
                  size={isMobile ? "sm" : "lg"}
                  onClick={() => {
                    if (isInMaintenance) {
                      return;
                    }

                    if (!address || !token) {
                      onOpen();
                      return;
                    }
                    socialMedia.handler();
                    trackClick({ text: "Daily SEGA" });
                  }}
                >
                  {address && token ? socialMedia.buttonText : "Connect Wallet"}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-full h-12 border border-solid border-line bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
      </div>
    </div>
  );
}

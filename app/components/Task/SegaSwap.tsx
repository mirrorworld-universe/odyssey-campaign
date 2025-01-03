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

export function SegaSwap() {
  const { onOpen } = useWalletModal();
  const { address, token } = useAccountInfo();
  const { isInMaintenance } = useSystemInfo();

  const isMobile = useBreakpoint() === "mobile";

  const [showRules, setShowRules] = useState(false);

  const showRewardsToast = () => {
    toast({
      title: '"Sega Swap" task completed.',
      description: (
        <p role="success" className="block">
          You've received{" "}
          <span className="inline-flex items-center text-[#FBB042]">
            3 x mystery boxes
            <Gift color="#FBB042" className="w-3 h-3 mx-[2px]" />
          </span>
          . Open it in the navbar to exchange for rings.
        </p>
      )
    });
  };

  const socialMediaList = [
    {
      id: "swap-tokens",
      name: "Swap Tokens",
      link: "https://twitter.com/SonicSVM",
      description: (
        <div className="sonic-body2 text-white/50">
          Complete a trade of any token pair and amount on Sega Dex.{" "}
          <span className="text-link hover:text-primary-blue transition-colors cursor-pointer">
            Swap on SEGA
          </span>
          <p className="sonic-title4 text-secondary font-orbitron mt-2 md:mt-4">
            Swap Completed:
            <span className="sonic-body4 font-manrope pl-2">
              <span className="text-gold-yellow">0</span>/1
            </span>
          </p>
        </div>
      ),
      buttonText: (
        <>
          Claim x 2 <Gift color="white" className="size-5 ml-2" />
        </>
      ),
      handler: () => {}
    },
    {
      id: "discord",
      name: "Provide Liquidities",
      link: "https://discord.gg/joinmirrorworld",
      description: (
        <div className="sonic-body2 text-white/50">
          Provide liquidity to any pool with any amount on Sega Dex.{" "}
          <span className="text-link hover:text-primary-blue transition-colors cursor-pointer">
            Deposit on SEGA
          </span>
          <p className="sonic-title4 text-secondary font-orbitron mt-2 md:mt-4">
            Deposit Completed:
            <span className="sonic-body4 font-manrope pl-2">
              <span className="text-gold-yellow">0</span>/1
            </span>
          </p>
        </div>
      ),
      buttonText: (
        <>
          Claim x 2 <Gift color="white" className="size-5 ml-2" />
        </>
      ),
      handler: () => {}
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
              Complete at least 1 successful swap transaction and 1 deposit
              transaction to earn total{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                3 x{" "}
                <Gift
                  color="#FBB042"
                  className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                />{" "}
                Ring Mystery Boxes.
              </span>
            </li>
            <li className="">
              To swap tokens on SEGA DEX,{" "}
              <a
                className="text-link hover:text-primary-blue transition-colors"
                href="https://swap.sonic.game"
                target="_blank"
              >
                click here
              </a>
              .
            </li>
            <li>
              To provide liquidity on SEGA DEX,{" "}
              <a
                className="text-link hover:text-primary-blue transition-colors"
                href="https://swap.sonic.game"
                target="_blank"
              >
                click here
              </a>
              .
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

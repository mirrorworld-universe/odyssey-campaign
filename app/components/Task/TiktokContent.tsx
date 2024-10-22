"use client";
import { Gift } from "@/app/icons/Gift";
import { useAccountInfo, useWalletModal } from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { trackClick } from "@/lib/track";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Rules } from "./Rules";
import { useQuery } from "@tanstack/react-query";

export function TiktokContent() {
  const { address, token } = useAccountInfo();
  const { onOpen } = useWalletModal();

  const [showRules, setShowRules] = useState(false);

  const handleLaunchSonicX = async () => {
    if (!address) {
      onOpen();
      return;
    }
    trackClick({ text: "play on sonicx" });
  };

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        Follow on TikTok
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[560px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div>
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="w-full list-disc font-normal pl-6">
            <li>Authorize to login your Tiktok account.</li>
            <li>Follow Sonic on Tiktok.</li>
            <li>
              You will receive{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                2 x{" "}
                <Gift
                  color="#FBB042"
                  className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                />{" "}
                Ring Mystery Boxes
              </span>{" "}
              automatically the day after you follow us on TikTok.
            </li>
          </ul>
        </Rules>
        <div className="border-0 md:border border-[#27282D] md:p-10 md:mt-20 flex items-center gap-10 xl:gap-20 max-w-[1024px]">
          <div className="flex flex-col gap-3 md:gap-4 max-w-[607px]">
            <div className="text-white text-lg md:text-xl font-semibold font-orbitron">
              Follow SONIC On TikTok
            </div>
            <div className="text-[#666] text-sm xl:text-base/[1.75] font-normal">
              Click the button, and we’ll guide you step by step to complete
              your task effortlessly. Let’s get started!
            </div>
          </div>

          <div className="hidden md:block h-[100px] w-px bg-[#27282D]"></div>
          <Button
            className={cn(
              "h-12 w-[177px] px-4 flex items-center justify-center text-base/[20px] font-bold font-orbitron bg-[#0000FF]",
              "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60",
              "md:block hidden"
            )}
            onClick={handleLaunchSonicX}
          >
            {address ? (
              <div className="gap-2 flex items-center">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4901 17.2589C11.8251 17.2589 12.9073 16.3032 12.9073 14.8417V4H15.8062C15.6436 5.97723 17.6092 7.88718 19.7768 7.8435V10.5695C17.923 10.5695 16.3467 9.78561 15.798 9.35059V14.8417C15.798 17.2589 13.8964 20 10.4901 20C7.08373 20 5.22363 17.2589 5.22363 14.8417C5.22363 11.43 8.83407 9.45136 11.2253 9.93497V12.7115C11.105 12.669 10.7948 12.6061 10.5306 12.6061C9.18449 12.5564 8.07283 13.6482 8.07283 14.8417C8.07283 16.1767 9.15506 17.2589 10.4901 17.2589Z"
                    fill="white"
                  />
                </svg>
                Follow Now
              </div>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        </div>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row gap-3 fixed bottom-0 right-0 left-0 m-auto bg-[#000] py-5 px-4">
        <Button
          className="w-20 h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
        <Button
          onClick={handleLaunchSonicX}
          className="grow h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 text-white text-base font-orbitron font-semibold transition-colors duration-300"
        >
          {address ? (
            <div className="gap-2 flex items-center">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4901 17.2589C11.8251 17.2589 12.9073 16.3032 12.9073 14.8417V4H15.8062C15.6436 5.97723 17.6092 7.88718 19.7768 7.8435V10.5695C17.923 10.5695 16.3467 9.78561 15.798 9.35059V14.8417C15.798 17.2589 13.8964 20 10.4901 20C7.08373 20 5.22363 17.2589 5.22363 14.8417C5.22363 11.43 8.83407 9.45136 11.2253 9.93497V12.7115C11.105 12.669 10.7948 12.6061 10.5306 12.6061C9.18449 12.5564 8.07283 13.6482 8.07283 14.8417C8.07283 16.1767 9.15506 17.2589 10.4901 17.2589Z"
                  fill="white"
                />
              </svg>
              Follow Now
            </div>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      </div>
    </div>
  );
}

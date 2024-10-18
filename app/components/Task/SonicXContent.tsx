"use client";
import { fetchSonicXUrl } from "@/app/data/task";
import { Gift } from "@/app/icons/Gift";
import { useAccountInfo, useWalletModal } from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { trackClick } from "@/lib/track";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Rules } from "./Rules";

export function SonicXContent() {
  const { address, token } = useAccountInfo();
  const { onOpen } = useWalletModal();

  const [showRules, setShowRules] = useState(false);

  const handleLaunchSonicX = async () => {
    if (!address) {
      onOpen();
      return;
    }
    trackClick({ text: "play on sonicx" });
    const res = await fetchSonicXUrl({ token });
    if (res.code === 0) {
      window.open(res.data.sonicX_url, "_blank");
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        Play on Sonic X
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[560px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="w-full list-disc font-normal pl-6">
            <li className="">
              Visit SonicX to sign up your first sonicX wallet.
            </li>
            <li className="">
              Earn{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                3 x{" "}
                <Gift
                  color="#FBB042"
                  className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                />{" "}
                Ring Mystery Boxes
              </span>{" "}
              automatically after you created.
            </li>
          </ul>
        </Rules>
        <div className="border-0 md:border border-[#27282D] md:p-10 md:mt-20 flex items-center gap-10 xl:gap-20 max-w-[1024px]">
          <div className="flex flex-col gap-3 md:gap-4 max-w-[607px]">
            <div className="text-white text-lg md:text-xl font-semibold font-orbitron">
              Launch SonicX
            </div>
            <div className="text-[#666] text-sm xl:text-base/[1.75] font-normal">
              Click "Launch Now" to visit the platform and create your new
              wallet easily. Start managing your digital assets today!
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
            {address ? "Launch Now" : "Connect Wallet"}
          </Button>
        </div>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row gap-4 fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-2/6 h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
        <Button
          onClick={handleLaunchSonicX}
          className="w-4/6 h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 text-white text-base font-orbitron font-semibold transition-colors duration-300"
        >
          {address ? "Launch SonicX" : "Connect Wallet"}
        </Button>
      </div>
    </div>
  );
}

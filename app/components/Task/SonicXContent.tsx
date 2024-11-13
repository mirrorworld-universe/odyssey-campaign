"use client";
import { Gift } from "@/app/icons/Gift";
import { useAccountInfo, useWalletModal } from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { trackClick } from "@/lib/track";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Rules } from "./Rules";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/http";

export function SonicXContent() {
  const { address, token } = useAccountInfo();
  const { onOpen } = useWalletModal();

  const [showRules, setShowRules] = useState(false);

  const { data: res } = useQuery({
    queryKey: ["sonicXUrl"],
    queryFn: () => http.get("/user/sonicX/status"),
    enabled: !!token
  });

  const handleLaunchSonicX = async () => {
    if (!address) {
      onOpen();
      return;
    }
    trackClick({ text: "play on sonicx" });
    if (res?.code === 0) {
      window.open(res.data.sonicX_url, "_blank");
    }
  };

  const btnText = useMemo(() => {
    if (!address) {
      return "Connect Wallet";
    }

    if (res?.data?.finished) {
      return "Claimed";
    }
    return "Launch SonicX";
  }, [address, res?.data?.finished]);

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
      <div>
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="w-full list-disc font-normal pl-6">
            <li>Visit Sonic X and log in via your TikTok.</li>
            <li>
              Earn{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                3 x{" "}
                <Gift
                  color="#FBB042"
                  className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                />{" "}
                Ring Mystery Boxes
              </span>{" "}
              automatically after you log in.
            </li>
            <li>
              Keep playing Sonic X , earn more game rewards.{" "}
              <a
                href="https://sonicx.app/"
                target="_blank"
                className="text-link hover:text-primary-blue transition-colors"
              >
                Visit Sonic X
              </a>
            </li>
          </ul>
        </Rules>
        <div className="border-0 md:border border-[#27282D] md:p-10 md:mt-20 flex items-center gap-10 xl:gap-20 max-w-[1024px]">
          <div className="flex flex-col gap-3 md:gap-4 max-w-[607px]">
            <div className="text-white text-lg md:text-xl font-semibold font-orbitron">
              Launch SonicX
            </div>
            <div className="text-[#666] text-sm xl:text-base/[1.75] font-normal">
              Click "Launch Now" to dive into the games on Sonic X! Experience
              thrilling gameplay and unlock more rewards today!
            </div>
          </div>

          <div className="hidden ml-auto md:block h-[100px] w-px bg-[#27282D]"></div>
          <Button
            disabled={res?.data?.finished}
            className={cn(
              "h-12 w-[177px] px-4 flex items-center justify-center text-base/[20px] font-bold font-orbitron bg-[#0000FF]",
              "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60",
              "md:block hidden"
            )}
            onClick={handleLaunchSonicX}
          >
            {btnText}
          </Button>
        </div>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden gap-3 fixed bottom-0 right-0 left-0 m-auto bg-black py-5 px-4">
        <Button
          className="w-20 h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
        <Button
          disabled={res?.data?.finished}
          onClick={handleLaunchSonicX}
          className="grow h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 text-white text-base font-orbitron font-semibold transition-colors duration-300"
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}

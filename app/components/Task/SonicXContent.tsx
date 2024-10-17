"use client";
import { useState } from "react";

import { Card, CardSize } from "@/app/components/Basic/Card";
import { Gift } from "@/app/icons/Gift";
import { useAccountInfo, useWalletModal } from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { trackClick } from "@/lib/track";
import { Rules } from "./Rules";
import { fetchSonicXUrl } from "@/app/data/task";

export function PlayOnSonicContent() {
  const { onOpen } = useWalletModal();
  const { address, token } = useAccountInfo();

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

  const socialMediaList = [
    {
      id: "play-on-sonicx",
      name: "Launch SonicX",
      link: "https://twitter.com/SonicSVM",
      description: `Click "Launch Now" to visit the platform and create your new wallet easily. Start managing your digital assets today!`,
      buttonText: "Launch Now"
    }
  ];

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

        {/* main */}
        <Card
          size={CardSize.Medium}
          className="max-w-[1024px] md:mt-20 p-6 rounded-lg md:p-10 md:rounded-xl"
          nameClassName="bg-[#000]"
        >
          <ul className="list-disc font-normal leading-relaxed md:pl-6">
            {socialMediaList.map((socialMedia, socialMediaIndex) => (
              <li
                className={`flex flex-col xl:flex-row items-start xl:items-center w-full`}
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
                    "inline-flex justify-center items-center w-[148px] md:w-[178px] md:h-12 rounded gap-2 px-4 py-2 md:py-[10px] bg-[#0000FF] transition-all duration-300 mt-5 md:mt-10 xl:mt-0 xl:ml-20",
                    "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
                  )}
                  onClick={handleLaunchSonicX}
                >
                  <span className="text-white font-orbitron text-sm md:text-base font-semibold">
                    {address ? socialMedia.buttonText : "Connect Wallet"}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-full h-12 border border-solid border-white/40 bg-transparent"
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

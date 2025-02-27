"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { loadHomePageStatics } from "@/lib/analytics";
import { http } from "@/lib/http";
import { cn } from "@/lib/utils";
import { NetworkId } from "./data/config";
import { useAccountInfo, useNetworkInfo } from "./store/account";

export default function Home() {
  const { address, token } = useAccountInfo();
  const searchParams = useSearchParams();

  const { networkId } = useNetworkInfo();

  const { title, description } = useMemo(() => {
    const content = {
      title: "Ended",
      description:
        "Sonic SVM Mainnet is live, testnet tasks are discontinued. Join the Sonic Mobius Campaign on Mainnet and earn $SONIC."
    };

    return content;
  }, [networkId]);

  const mutationInvitation = useMutation({
    mutationKey: ["invitation", address],
    mutationFn: (code: string) =>
      http.post("/user/referral", {
        invitation_code: code
      })
  });

  useEffect(() => {
    loadHomePageStatics();
  }, []);

  useEffect(() => {
    if (token) {
      const join = searchParams.get("join");
      if (join) {
        mutationInvitation.mutate(join);
      }
    }
  }, [token]);

  const handleGetStarted = () => {
    window.open("https://mobius.sonic.game/", "_blank");
  };

  return (
    <main
      className="grow flex flex-col text-primary"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 255, 0.20) 0%, rgba(0, 0, 255, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.45) 100%)",
        backgroundBlendMode: "saturation, normal"
      }}
    >
      {networkId !== NetworkId.FrontierV1 ? (
        <video
          key="mainnet-video"
          className={cn(
            "object-cover mix-blend-screen",
            "w-screen h-screen absolute inset-0 -z-10"
          )}
          preload="auto"
          loop
          autoPlay
          muted
          playsInline
        >
          <source
            src="https://storage.sonic.game/odyssey/frontend/video/background.mp4"
            type="video/mp4"
          />
        </video>
      ) : (
        <video
          key="testnet-video"
          className="object-cover mix-blend-screen -z-10 absolute top-0 left-0 w-full h-full"
          preload="auto"
          loop
          autoPlay
          muted
          playsInline
        >
          <source
            src="https://storage.sonic.game/odyssey/frontend/video/sonic_logo_pc.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
          <source
            src="https://storage.sonic.game/odyssey/frontend/video/sonic_logo_h5.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
        </video>
      )}

      <div className="max-w-view px-4 w-full mx-auto flex-center flex-col gap-4 grow">
        <div className="flex gap-2 md:gap-5 justify-center items-end mt-auto md:mt-0">
          <img
            className="h-11 md:h-[90px] md:w-auto object-contain"
            src="/images/odyssey.png"
            alt=""
          />
          <h2 className="sonic-headline3 font-extrabold md:text-[56px]/[1.39] font-orbitron">
            {title}
          </h2>
        </div>

        <p className="sonic-title2 md:sonic-headline5 max-w-[707px] text-center">
          {description}
        </p>
        <Button
          className="sonic-title2 font-orbitron gap-2.5 w-full md:w-fit md:mt-6 mb-4 mt-auto mx-auto"
          size={"lg"}
          variant={"primary"}
          onClick={handleGetStarted}
        >
          Mobius Campaign <ArrowRight />
        </Button>
      </div>
    </main>
  );
}

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <mask
        id="mask0_2921_21609"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2921_21609)">
        <path
          d="M14.5 18L13.1 16.55L16.65 13H4.5V11H16.65L13.1 7.45L14.5 6L20.5 12L14.5 18Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

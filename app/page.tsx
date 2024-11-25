"use client";

import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { loadHomePageStatics, openWalletStatics } from "@/lib/analytics";
import { http } from "@/lib/http";
import { trackClick } from "@/lib/track";
import {
  useAccountInfo,
  useNetworkInfo,
  useSystemInfo,
  useWalletModal
} from "./store/account";
import { cn } from "@/lib/utils";
import { NetworkId, networkMap } from "./data/config";

export default function Home() {
  const router = useRouter();
  const { connected } = useWallet();
  const { address, token } = useAccountInfo();
  const { onOpen } = useWalletModal();
  const { isInMaintenance } = useSystemInfo();
  const searchParams = useSearchParams();

  const { networkId } = useNetworkInfo();

  const { title, description } = useMemo(() => {
    const content = {
      title: networkId !== NetworkId.FrontierV1 ? "Season 1" : "Pre-Mainnet",
      description:
        networkId !== NetworkId.FrontierV1
          ? `Thanks for participating! Sonic Odyssey Season 1 on ${
              networkMap[networkId]?.name
            } has ended. Switch to ${
              networkMap[NetworkId.FrontierV1]?.name
            } to kick off your Season 2 adventure now!`
          : `Join Sonic Odyssey's Pre-Mainnet Season 3, explore more products and games, and earn more Rings!`
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
    if (isInMaintenance) {
      return;
    }

    if (!connected) {
      onOpen();
    } else {
      router.push("/task");
    }
    // ttq
    openWalletStatics();
    // ga4
    trackClick({ text: "Get Started" });
  };

  return (
    <main className="grow flex flex-col text-primary">
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
          className="sonic-title2 font-orbitron w-full md:w-[230px] md:mt-6 mb-4 mt-auto mx-auto"
          size={"lg"}
          variant={"primary"}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
    </main>
  );
}

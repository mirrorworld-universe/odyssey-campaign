"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import {
  useAccountInfo,
  useNetworkInfo,
  useSystemInfo,
  useWalletModal,
} from "./store/account";
import { inviteUser } from "./data/account";
import { loadHomePageStatics, openWalletStatics } from "@/lib/analytics";
import { trackClick } from "@/lib/track";
import { cn } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { address, token } = useAccountInfo();
  const { isOpen, onOpen, onClose } = useWalletModal();
  const { isInMaintenance, setInMaintenance } = useSystemInfo();
  const { networkId } = useNetworkInfo();

  const [network, setNetwork] = useState(clusterApiUrl("devnet"));
  const [invitationCode, setInvitationCode] = useState("");

  const mutationInvitation = useMutation({
    mutationKey: ["invitation", address],
    mutationFn: () =>
      inviteUser({
        token,
        code: invitationCode,
        networkId,
      }),
  });

  useEffect(() => {
    loadHomePageStatics();
  }, []);

  useEffect(() => {
    if (window.location.search && token) {
      const queryParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(queryParams.entries());
      if (params.join) {
        setInvitationCode(params.join);
        mutationInvitation.mutate();
      }
    }
  }, [token]);

  const handleGetStarted = () => {
    if (isInMaintenance) {
      return;
    }

    if (!publicKey) {
      onOpen();
    } else {
      router.push("/task");
    }
    // ttq
    openWalletStatics();
    // ga4
    trackClick({ text: "Get Started" });
  };

  const scrollToTop = () => {
    const distance =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (distance > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, distance - distance / 8);
    }
  };

  const VideoBackground = ({ className }: any) => (
    <video
      className={cn("object-cover mix-blend-screen", className)}
      preload="auto"
      loop
      autoPlay
      muted
      playsInline
      // tabIndex="-1"
    >
      <source
        src="https://storage.sonic.game/odyssey/frontend/video/background.mp4"
        type="video/mp4"
      />
    </video>
  );

  const GetStarted = ({ className }: any) => (
    <Button
      className={cn(
        "group bg-transparent hover:bg-transparent rounded-md p-0 relative w-full md:w-[550px] h-[66px] md:h-[100px]",
        isInMaintenance ? "opacity-30 cursor-not-allowed" : "",
        className
      )}
      onClick={handleGetStarted}
    >
      <video
        preload="auto"
        loop
        autoPlay
        muted
        playsInline
        className="w-full h-full mix-blend-screen bg-black"
      >
        <source src="/get-started.webm" type="video/webm" />
      </video>

      <span className="text-white text-2xl md:text-[32px] font-orbitron font-bold group-hover:opacity-80 group-active:opacity-50 transition-opacity duration-300 absolute">
        Get Started
      </span>
    </Button>
  );

  return (
    <main className="flex h-screen flex-col items-center justify-between absolute top-0 bottom-0 right-0 left-0">
      <div className="w-screen h-screen flex-grow flex flex-col items-center justify-center relative">
        <VideoBackground className="w-screen h-screen absolute top-0 bottom-0 left-0 right-0" />
        <div className="w-screen h-screen bg-gradient-to-t from-black/50 to-black/0 absolute top-0 bottom-0 left-0 right-0"></div>

        <div className="w-full max-w-[800px] flex flex-col items-center text-center relative px-4">
          <h1 className="flex flex-col md:flex-row items-center gap-1 md:gap-8 text-8xl text-white font-orbitron font-bold pt-20">
            <span className="text-4xl md:text-[96px] relative md:-top-2">
              Sonic
            </span>
            <img
              className="h-[70px] md:h-[120px]"
              src="/images/odyssey.png"
              alt=""
            />
          </h1>
          <p className="text-sm md:text-[32px] leading-normal font-orbitron text-white/80 mt-10 md:mt-12">
            {networkId === "testnet"
              ? "Join the Sonic Odyssey testnet stage 2."
              : "Join the Sonic Odyssey Testnet Campaign."}
          </p>
          <p className="text-sm md:text-[32px] leading-normal font-orbitron text-white/80">
            Earn Your Ring Rewards!
          </p>

          <GetStarted className="mt-[132px] hidden md:flex bottom-4 left-0 right-0" />
        </div>
      </div>
      <GetStarted className="absolute md:hidden bottom-4 left-0 right-0" />
    </main>
  );
}

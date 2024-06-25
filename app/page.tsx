"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import { useAccountInfo, useWalletModal } from "./store/account";
import { inviteUser } from "./data/account";
import { loadHomePageStatics, openWalletStatics } from "@/lib/analytics";
import { trackClick } from "@/lib/track";

export default function Home() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { address, token } = useAccountInfo();
  const { isOpen, onOpen, onClose } = useWalletModal();

  const [network, setNetwork] = useState(clusterApiUrl("devnet"));
  const [invitationCode, setInvitationCode] = useState("");

  const mutationInvitation = useMutation({
    mutationKey: ["invitation", address],
    mutationFn: () =>
      inviteUser({
        token,
        code: invitationCode,
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

  const VideoBackground = () => (
    <video
      className="object-cover mix-blend-screen w-screen h-screen absolute top-0 bottom-0 left-0 right-0"
      preload="auto"
      loop
      autoPlay
      muted
      // tabIndex="-1"
    >
      <source src="/background.mp4" type="video/mp4" />
    </video>
  );

  const GetStarted = () => (
    <Button
      className="group w-[560px] h-[88px] bg-transparent hover:bg-transparent rounded-md p-0 relative mt-[132px]"
      onClick={handleGetStarted}
    >
      <video
        preload="auto"
        loop
        autoPlay
        muted
        className="w-full h-full absolute"
      >
        <source src="/get-started.webm" type="video/mp4" />
      </video>

      <span className="text-white text-[32px] font-orbitron font-bold group-hover:opacity-80 group-active:opacity-50 absolute transition-opacity duration-300">
        Get Started
      </span>
    </Button>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-screen h-screen flex-grow flex flex-col items-center justify-center relative">
        <VideoBackground />

        <div className="w-full h-full bg-gradient-to-t from-black to-black/50 relative"></div>

        <div className="text-center max-w-[800px] flex flex-col items-center absolute">
          <h1 className="flex flex-row gap-2 text-8xl text-white font-orbitron font-bold">
            <img className="" src="/images/sonic-odyssey.png" alt="" />
          </h1>
          <p className="text-[32px] font-orbitron text-[#FFFFFF]/[0.8] mt-12">
            Join the Sonic Odyssey Testnet Campaign.
          </p>
          <p className="text-[32px] font-orbitron text-[#FFFFFF]/[0.8]">
            Earn Your Ring Rewards!
          </p>

          <GetStarted />
        </div>
      </div>
    </main>
  );
}

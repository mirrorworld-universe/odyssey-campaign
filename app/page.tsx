"use client";
import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Header } from "./components/Header";
import { WalletModal } from "./components/WalletModal";
import { useAccountModal } from "./store/account";
// import { useState } from "react";

export default function Home() {
  const { publicKey } = useWallet();
  const { isOpen, onOpen, onClose } = useAccountModal();
  const [network, setNetwork] = useState(clusterApiUrl("devnet")); // 默认网络

  const handleClickOpenWallet = () => {
    if (!publicKey) {
      onOpen();
    }
    // tack code
    const ttq = (window as any).ttq;
    ttq.track("ClickButton", {
      contents: [
        {
          content_id: "0001",
          content_type: "Sonic",
          content_name: "ClickButton",
        },
      ],
      value: "1",
      currency: "USD",
    });
    ttq.track("ClickButton", {
      contents: [
        {
          content_id: "0002",
          content_type: "Sonic001",
          content_name: "ClickButton_001",
        },
      ],
      value: "1",
      currency: "USD",
    });
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      <div className="w-screen h-screen flex-grow flex flex-col items-center justify-center px-4 py-8 relative">
        <VideoBackground />
        <div className="text-center max-w-[800px] flex flex-col items-center absolute">
          <h1 className="flex flex-row gap-2 text-[96px] text-white font-orbitron font-bold">
            <img className="" src="/images/sonic-odyssey.png" alt="" />
          </h1>
          <p className="text-[32px] font-orbitron text-[#FFFFFF]/[0.8] mt-12">
            Join the Sonic Odyssey to earn potential Airdrops!
          </p>

          <Button
            className="w-[370px] h-[80px] bg-transparent hover:bg-transparent rounded-md p-0 relative mt-[132px]"
            onClick={handleClickOpenWallet}
          >
            <img className="w-full" src="/images/get-started.png" alt="" />
          </Button>
        </div>
      </div>

      <WalletModal />
    </main>
  );
}

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
  };

  const scrollToTop = () => {
    const distance =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (distance > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, distance - distance / 8);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      <div className="w-screen h-screen flex-grow flex flex-col items-center justify-center px-4 py-8 relative">
        <video
          className="object-cover mix-blend-screen w-screen h-screen absolute top-0 bottom-0 left-0 right-0"
          preload="auto"
          loop
          autoPlay
          // tabIndex="-1"
          // muted="muted"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="text-center max-w-[800px] flex flex-col items-center absolute">
          <h1 className="flex flex-row gap-2 text-[96px] text-white font-orbitron font-bold">
            <span>Sonic</span>
            <span className="text-shadow-text font-semibold">Odyssey</span>
          </h1>
          <p className="text-[32px] font-orbitron text-[#FFFFFF]/[0.8] mt-12">
            Join the Sonic Odyssey to earn potential Airdrops!
          </p>

          <Button
            className="[border-image:linear-gradient(to_bottom,rgb(0,0,255),rgb(0,160.65,255)_50%,rgb(0,0,255)_100%)_1] border-[3px] border-solid border-transparent w-[424px] flex items-center gap-[10px] px-[32px] py-[24px] rounded-[4px] justify-center relative mt-[132px]"
            onClick={handleClickOpenWallet}
          >
            <div className="font-orbitron w-fit mt-[-3.00px] tracking-[0] text-[32px] text-white relative font-bold leading-[normal]">
              Get Started
            </div>
          </Button>
        </div>
      </div>

      <WalletModal />
    </main>
  );
}

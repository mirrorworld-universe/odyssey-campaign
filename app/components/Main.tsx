"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useWalletModal } from "../store/account";
import { fetchBasicInfo } from "../data/account";

export function Main() {
  const { publicKey } = useWallet();
  const { isOpen, onOpen, onClose } = useWalletModal();
  const [network, setNetwork] = useState(clusterApiUrl("devnet")); // 默认网络

  const handleClickOpenWallet = () => {
    if (!publicKey) {
      onOpen();
    }
  };

  // useEffect(() => {
  //   if (publicKey) {
  //   }
  // }, [publicKey]);

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
  );
}

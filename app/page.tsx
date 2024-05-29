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
        <div className="text-center max-w-[800px] absolute">
          <h1 className="text-[96px] text-white font-bold mb-4">
            Sonic{" "}
            <span className="[-webkit-text-stroke:8px_#25a3ed] font-semibold">
              Odyssey
            </span>
          </h1>
          <p className="text-[32px] text-[#FFFFFF]/[0.8] mb-6">
            Join the Sonic Odyssey to earn potential Airdrops!
          </p>
          <Button
            className="w-[424px] px-8 py-6"
            onClick={handleClickOpenWallet}
          >
            <span className="text-[32px]">Get Started</span>
          </Button>
        </div>
      </div>

      <div className="h-screen flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Set up Sonic Network</h1>
          <p className="text-lg mb-6">
            Check here to see how to set up Sonic Network
          </p>
        </div>
      </div>

      <div className="h-screen flex justify-between">
        <div className="w-3/5">
          <h3>Sonic Odyssey</h3>
          <p>Get Your Sonic Rings Now!</p>
        </div>
        <div className="w-2/5">
          <h5>Invite to get mystery box</h5>
          <p>Invite a friend to complete Task 1 and earn a mystery box.</p>
          <p>My Referrals: 10</p>
          <p>My Referral Rewards: 3 Ring Monitors</p>
          <div className="flex items-center space-x-2">
            <Input
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              placeholder="Enter invite link"
              type="text"
            />
            <Button
              className="rounded-md bg-gray-900 text-white px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-400"
              type="submit"
            >
              Copy
            </Button>
          </div>
        </div>
      </div>

      {/* task 1 & 2 */}
      <div className="h-screen flex justify-between">
        <div className="w-1/2">
          <h3>Task 1: Meet Sonic</h3>
          <p>Follow @SonicSVM on X</p>
          <p>Join Sonic Official Discord</p>
          <p>
            <span>Rewards: Ring Monitors * 1</span>
            <Button>Claim</Button>
          </p>
          <p>
            <span>- Once</span>
          </p>
        </div>
        <div className="w-1/2">
          <h3>Task 2: Daily Check-in</h3>
          <p>Invite a friend to complete Task 1 and earn a mystery box.</p>
          <p>
            <span>- Everybody</span>
          </p>
        </div>
      </div>

      {/* task 3 */}
      <div className="h-screen flex justify-between">
        <div className="w-3/5">
          <h3>Task 3: Sonic Ring Lottery</h3>
          <p>Get Your Sonic Rings Now!</p>
        </div>
        <div className="w-2/5">
          <h5>Invite to get mystery box</h5>
          <p>Invite a friend to complete Task 1 and earn a mystery box.</p>
          <p>My Referrals: 10</p>
        </div>
      </div>

      {/* task 4 & 5 */}
      <div className="h-screen flex justify-between">
        <div className="w-3/5">
          <h3>Task 4: Interact with Sonic</h3>
          <p>Get Your Sonic Rings Now!</p>
        </div>
        <div className="w-2/5">
          <h3>Task 5: Play Games</h3>
          <p>Invite a friend to complete Task 1 and earn a mystery box.</p>
        </div>
      </div>

      <WalletModal />
    </main>
  );
}

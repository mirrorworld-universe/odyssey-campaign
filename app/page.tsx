"use client";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./components/Header";
import { WalletModal } from "./components/WalletModal";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAccountModal } from "./store/account";
import { useWallet } from "@solana/wallet-adapter-react";
// import { useState } from "react";

export default function Home() {
  const { publicKey } = useWallet();
  const { isOpen, onOpen, onClose } = useAccountModal();

  const handleClickOpenWallet = () => {
    if (!publicKey) {
      onOpen();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Sonic Odyssey</h1>
          <p className="text-lg mb-6">
            Join the Sonic Odyssey to earn potential Airdrops!
          </p>
          <Button onClick={handleClickOpenWallet}>Get Started</Button>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Sonic Odyssey</h1>
          <p className="text-lg mb-6">
            Join the Sonic Odyssey to earn potential Airdrops!
          </p>
          <Button onClick={handleClickOpenWallet}>Get Started</Button>
        </div>
      </div>

      <WalletModal />
    </main>
  );
}

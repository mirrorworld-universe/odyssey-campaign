"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Modal } from "./Modal";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAccountModal } from "../store/account";

const queryClient = new QueryClient();

export function WalletModal() {
  const { select, wallets, publicKey, disconnect, connecting, signMessage } =
    useWallet();
  const { isOpen, onOpen, onClose } = useAccountModal();

  const handleWalletSelect = async (walletName: any) => {
    if (walletName) {
      try {
        select(walletName);
        onClose();
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <QueryClientProvider client={queryClient}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Connect a wallet on Sonic to continue
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-400">
          {wallets.map((wallet) => (
            <p
              key={wallet.adapter.name}
              //onClick={() => select(wallet.adapter.name)}
              onClick={() => handleWalletSelect(wallet.adapter.name)}
              className=" h-[40px] hover:bg-transparent hover:text-white text-[20px] text-white font-slackey flex items-center w-full justify-between items-center "
            >
              <div className="flex items-center">
                <img
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  height={30}
                  width={30}
                  className="mr-5 "
                />
                <span className="text-base text-gray-900">
                  {wallet.adapter.name}
                </span>
              </div>
              <div className="text-sm text-gray-700 wallet-name text-[20px]">
                {wallet.readyState}
              </div>
            </p>
          ))}
          {/* <WalletMultiButton style={{}} /> */}
        </p>
      </QueryClientProvider>
    </Modal>
  );
}

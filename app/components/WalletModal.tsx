"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Modal } from "./Modal";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import base58 from "bs58";
import nacl from "tweetnacl";
import { useAccountModal } from "../store/account";
import { WalletReadyState } from "@solana/wallet-adapter-base";

const queryClient = new QueryClient();
const messageToSign = "the data to sign";
const message = new TextEncoder().encode(messageToSign);

export function WalletModal() {
  const { select, wallets, publicKey, disconnect, connecting, signMessage } =
    useWallet();
  const { isOpen, onOpen, onClose } = useAccountModal();
  const [signature, setSignature] = useState<string | undefined>(undefined);

  const sign = async () => {
    try {
      if (!signMessage) {
        console.log("signMessage function is not available");
        return;
      }
      const message = new TextEncoder().encode(messageToSign);
      const uint8arraySignature = await signMessage(message);
      setSignature(base58.encode(uint8arraySignature));
    } catch (e) {
      console.log("could not sign message");
    }
  };

  // const verify = async () => {
  //   const message = new TextEncoder().encode(messageToSign);
  //   const uint8arraySignature = base58.decode(signature);
  //   const walletIsSigner = nacl.sign.detached.verify(
  //     message,
  //     uint8arraySignature,
  //     publicKey.toBuffer()
  //   );

  //   if (walletIsSigner) {
  //     alert("The data was indeed signed with the connected wallet");
  //   } else {
  //     alert("The data was not signed with the connected wallet");
  //   }
  // };

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

  useEffect(() => {
    if (publicKey) {
      sign();
    }
  }, [publicKey]);

  return (
    <Modal isOpen={isOpen}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-start justify-between w-[350px]">
          <h2 className="font-orbitron text-white text-[32px]">
            Connect Your Wallet
          </h2>
          <h3 className="text-[16px] font-normal text-white/60 mt-4">
            Choose one of the wallets and install the corresponding browser
            extension.
          </h3>
        </div>
        <ul className="flex gap-8 flex-col w-full mt-12">
          {wallets.map((wallet) => (
            <li
              key={wallet.adapter.name}
              //onClick={() => select(wallet.adapter.name)}
              className="h-[40px] flex items-center w-full justify-between"
            >
              <div
                className="flex items-center cursor-pointer hover:opacity-80 transition-all"
                onClick={() => handleWalletSelect(wallet.adapter.name)}
              >
                <img
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  height={30}
                  width={30}
                  className="mr-5 "
                />
                <span className="text-[20px] text-white">
                  {wallet.adapter.name}
                </span>
              </div>

              <div
                className={`w-[115px] text-center font-orbitron font-bold text-[16px] rounded-[4px] cursor-pointer px-4 py-2.5 border-solid border ${
                  wallet.readyState === WalletReadyState.Installed
                    ? "text-white border-[#0000FF] bg-[#0000FF]"
                    : "text-white border-white/80"
                }`}
              >
                {wallet.readyState === WalletReadyState.Installed
                  ? "Connect"
                  : "Install"}
              </div>
            </li>
          ))}
          {/* <WalletMultiButton style={{}} /> */}
        </ul>
      </QueryClientProvider>
    </Modal>
  );
}

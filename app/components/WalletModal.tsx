"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Modal } from "./Modal";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import base58 from "bs58";
import nacl from "tweetnacl";
import { useAccountModal } from "../store/account";

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

"use client";

import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import nacl from "tweetnacl";
import { useQuery } from "@tanstack/react-query";
import { decodeUTF8, encodeBase64 } from "tweetnacl-util";
import { useWalletModal, useAccountInfo } from "@/app/store/account";
import { fetchAuthorize, fetchBasicInfo } from "@/app/data/account";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Gift } from "@/app/icons/Gift";
import { Ring } from "@/app/icons/Ring";
import { cn } from "@/lib/utils";

export function WalletDialog({ text = "Connect", className }: any) {
  const { select, wallets, publicKey, disconnect, connecting, signMessage } =
    useWallet();
  const { address, setAddress, token, setToken } = useAccountInfo();
  const { isOpen, onOpen, onClose } = useWalletModal();

  const [signature, setSignature] = useState("");
  const [messageToSign, setMessageToSign] = useState("");

  const { data: dataBasicInfo, isLoading: loadingBasicInfo } = useQuery({
    queryKey: ["queryBasicInfo", address],
    queryFn: () => fetchBasicInfo(address),
    enabled: !!address,
  });

  const { data: dataAuthorize, isLoading: loadingAuthorize } = useQuery({
    queryKey: ["queryAuthorize", address],
    queryFn: () =>
      fetchAuthorize(address, encodeBase64(publicKey!.toBytes()), signature),
    enabled: !!signature,
  });

  const sign = async () => {
    // try {
    if (!signMessage) {
      console.log("signMessage function is not available");
      return;
    }
    const message = new TextEncoder().encode(messageToSign);
    // const message = decodeUTF8(messageToSign);
    const uint8arraySignature = await signMessage(message);
    setSignature(encodeBase64(uint8arraySignature));
    // } catch (e) {
    //   console.log("could not sign message");
    // }
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

  const handleWalletSelect = async (walletAdapter: any) => {
    const walletName = walletAdapter.name;
    if (walletName) {
      try {
        select(walletName);
        // onClose();
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  useEffect(() => {
    if (dataBasicInfo) {
      setMessageToSign(dataBasicInfo.data);
    }
  }, [dataBasicInfo]);

  useEffect(() => {
    if (dataAuthorize) {
      setToken(dataAuthorize.data?.token);
    }
  }, [signature, dataAuthorize]);

  useEffect(() => {
    if (publicKey) {
      setAddress(publicKey.toString());
      // sign();
      // onClose();
    }
  }, [publicKey]);

  useEffect(() => {
    if (messageToSign && !token) {
      sign();
      onClose();
    }
  }, [messageToSign, token]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "text-white text-[16px] font-bold font-orbitron w-[230px] h-[48px] bg-transparent border boder-solid border-white transition-all duration-300",
            className
          )}
        >
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[813px] h-[643px] bg-[#1A1A1A] border-none px-8 py-8">
        <DialogHeader className="space-y-0">
          <DialogTitle className="text-white text-[32px] font-orbitron">
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="text-white/60 text-[16px]">
            Choose one of the wallets and install the corresponding browser
            extension.
          </DialogDescription>
        </DialogHeader>

        <ul className="flex gap-8 flex-col w-full mt-12">
          {wallets.map((wallet) => (
            <li
              key={wallet.adapter.name}
              //onClick={() => select(wallet.adapter.name)}
              className="h-[40px] flex items-center w-full justify-between"
            >
              <div
                className="flex items-center cursor-pointer hover:opacity-80 transition-all"
                onClick={() => handleWalletSelect(wallet.adapter)}
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
                className={`min-w-[115px] text-center font-orbitron font-bold text-[16px] rounded-[4px] cursor-pointer px-4 py-2.5 border-solid border transition-all ${
                  wallet.readyState === WalletReadyState.Installed
                    ? "text-white border-[#0000FF] bg-[#0000FF] hover:bg-[#0000FF]/80"
                    : "text-white border-white/80 hover:border-white"
                }`}
                onClick={() => handleWalletSelect(wallet.adapter)}
              >
                {wallet.readyState === WalletReadyState.Installed
                  ? "Connect"
                  : "Install"}
              </div>
            </li>
          ))}
          {/* <WalletMultiButton style={{}} /> */}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
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
import { useTaskInfo } from "@/app/store/task";
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
import { cn } from "@/lib/utils";
import {
  useMoreWalletModal,
  useSetUpNetworkModal,
} from "@/app/store/tutorials";
import { WalletList, isSupportSonic } from "@/app/wallet/wallet-list";
import { connectWalletStatics } from "@/lib/analytics";

let currentSignature = "";

export function WalletDialog({ text = "Connect", className }: any) {
  const { select, wallet, publicKey, disconnect, connecting, signMessage } =
    useWallet();
  const { address, setAddress, token, setToken } = useAccountInfo();
  const { setAddress: setTaskAddress } = useTaskInfo();
  const { isOpen, onOpen, onClose } = useWalletModal();
  const {
    isOpen: isOpenMoreWalletDialog,
    onOpen: onOpenMoreWalletDialog,
    onClose: onCloseMoreWalletDialog,
  } = useMoreWalletModal();
  const {
    isOpen: isOpenSetUpNetworkWalletDialog,
    onOpen: onOpenSetUpNetworkWalletDialog,
    onClose: onCloseSetUpNetworkWalletDialog,
  } = useSetUpNetworkModal();

  const [signature, setSignature] = useState("");
  const [messageToSign, setMessageToSign] = useState("");
  const [walletList, setWalletList] = useState(WalletList);

  const { data: dataBasicInfo, isLoading: loadingBasicInfo } = useQuery({
    queryKey: ["queryBasicInfo", address],
    queryFn: () => fetchBasicInfo(address),
    enabled: !!address,
  });

  const {
    data: dataAuthorize,
    isLoading: loadingAuthorize,
    refetch: refetchAuthorize,
  } = useQuery({
    queryKey: ["queryAuthorize", address],
    queryFn: () =>
      fetchAuthorize(
        address,
        encodeBase64(publicKey!.toBytes()),
        currentSignature
      ),
    enabled: !!address && !!signature,
  });

  const handleWalletSelect = async (wallet: any) => {
    const walletName = wallet.adapter.name;
    if (walletName) {
      try {
        currentSignature = "";
        setSignature("");
        select(walletName);
        onClose();
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
    connectWalletStatics();
  };

  const sign = async (messageToSign: string) => {
    try {
      if (!signMessage) {
        console.log("signMessage function is not available");
        return;
      }
      const message = new TextEncoder().encode(messageToSign);
      // const message = decodeUTF8(messageToSign);
      const uint8arraySignature = await signMessage(message);
      const signature = encodeBase64(uint8arraySignature);
      // console.log("signature", signature);
      currentSignature = signature;
      setSignature(signature);
      // open tip dilogs
      afterWalletConnected();
    } catch (e) {
      console.log("could not sign message");
      disconnect();
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

  const switchMoreWallets = () => {
    onOpenMoreWalletDialog();
    onClose();
  };

  const handleShowMoreWallet = () => {
    const list = WalletList.map((wallet: any) => {
      return { ...wallet, hide: false };
    });
    setWalletList(list);
  };

  const signWalletMessage = async (message: string) => {
    await sign(message);
  };

  const afterWalletConnected = () => {
    if (isSupportSonic(wallet?.adapter.name)) {
      onOpenSetUpNetworkWalletDialog();
    } else {
      switchMoreWallets();
    }
    onClose();
  };

  useEffect(() => {
    if (dataBasicInfo) {
      setMessageToSign(dataBasicInfo.data);
      signWalletMessage(dataBasicInfo.data);
    }
  }, [dataBasicInfo]);

  useEffect(() => {
    if (dataAuthorize) {
      setToken(dataAuthorize?.data?.token);
    }
  }, [dataAuthorize]);

  useEffect(() => {
    if (publicKey) {
      setAddress(publicKey.toString());
      setTaskAddress(publicKey.toString());
    }
  }, [publicKey]);

  const SupportSonicTag = () => (
    <div className="text-[#fbb042] text-[10px] bg-[#fbb0421a] rounded px-1 py-[2px]">
      Support Sonic
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[467px] h-auto bg-[#1A1A1A] border-none px-8 py-8">
        <DialogHeader className="">
          <DialogTitle className="text-white text-[32px] font-orbitron">
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="w-[355px] text-white/60 text-base">
            Choose one of the wallets and install the corresponding browser
            extension.
          </DialogDescription>
        </DialogHeader>

        <ul className="flex gap-8 flex-col w-full mt-12">
          {walletList.map(
            (wallet: any) =>
              !wallet.hide && (
                <li
                  key={wallet.adapter?.name}
                  //onClick={() => select(wallet.adapter?.name)}
                  className="h-10 flex items-center w-full justify-between"
                >
                  <div
                    className="flex items-center cursor-pointer hover:opacity-80 transition-all"
                    onClick={() => handleWalletSelect(wallet.adapter)}
                  >
                    <img
                      src={wallet.adapter?.icon}
                      alt={wallet.adapter?.name}
                      height={30}
                      width={30}
                      className="mr-5 "
                    />
                    <span className="text-xl text-white mr-2">
                      {wallet.adapter?.name}
                    </span>
                    {wallet.isSupportSonic ? <SupportSonicTag /> : null}
                  </div>

                  {wallet.adapter.readyState === WalletReadyState.Installed ? (
                    <div
                      className={cn(
                        "inline-flex items-center justify-center min-w-[115px] h-10 text-center rounded cursor-pointer px-4 py-2.5 border-solid border active:opacity-80 transition-all",
                        "border-[#0000FF] bg-[#0000FF] hover:bg-[#0000FF]/80"
                      )}
                      onClick={() => handleWalletSelect(wallet)}
                    >
                      <span className="text-white text-base font-orbitron font-bold">
                        Connect
                      </span>
                    </div>
                  ) : (
                    <a
                      className={cn(
                        "inline-flex items-center justify-center min-w-[115px] h-10 text-center rounded cursor-pointer px-4 py-2.5 border-solid border active:opacity-80 transition-all",
                        "border-white/80 hover:border-white"
                      )}
                      href={wallet.adapter.url}
                      target="_blank"
                    >
                      <span className="text-white text-base font-orbitron font-bold">
                        Install
                      </span>
                    </a>
                  )}
                </li>
              )
          )}
          {walletList.some((wallet: any) => wallet.hide) && (
            <li
              className="flex w-full justify-center cursor-pointer hover:opacity-80"
              onClick={handleShowMoreWallet}
            >
              <img src="/images/icons/more.svg" alt="" className="w-6 h-6" />
            </li>
          )}
          {/* <WalletMultiButton style={{}} /> */}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

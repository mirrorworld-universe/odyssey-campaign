"use client";

import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import nacl from "tweetnacl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { decodeUTF8, encodeBase64 } from "tweetnacl-util";
import {
  useWalletModal,
  useAccountInfo,
  useNetworkInfo,
} from "@/app/store/account";
import { useTaskInfo } from "@/app/store/task";
import {
  fetchAuthorize,
  fetchBasicInfo,
  fetchLogout,
} from "@/app/data/account";
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
import {
  cn,
  isInMaintenanceTime,
  isInWalletCampaignTime,
  isMobileDevice,
  isMobileViewport,
} from "@/lib/utils";
import {
  useMoreWalletModal,
  useSetUpNetworkModal,
  useSetupInfo,
  useWhitelistModal,
} from "@/app/store/tutorials";
import { WalletList, isSupportSonic } from "@/app/wallet/wallet-list";
import { connectWalletStatics } from "@/lib/analytics";
import {
  trackActionEvent,
  trackClick,
  trackCriteoWalletClick,
  trackCriteoWalletTransactionClick,
} from "@/lib/track";
import { networks } from "@/app/data/config";

let lastAddress = "";
let currentSignature = "";
let currentToken = "";
let messageToSign = "";
let isWhitelist = false;

const networkSwitchingNames: any = {
  devnet: {
    id: "1",
    name: "Origin",
  },
  testnet: {
    id: "2",
    name: "Frontier",
  },
};

export function WalletDialog({ text = "Connect", className }: any) {
  const {
    select,
    wallet: currentWallet,
    publicKey,
    disconnect,
    connected,
    signMessage,
  } = useWallet();
  const {
    address,
    setAddress,
    token,
    setToken,
    signature,
    setSignature,
    isInWhitelist,
    setIsInWhitelist,
    reset,
  } = useAccountInfo();
  const { setAddress: setTaskAddress } = useTaskInfo();
  const { isOpen, onOpen, onClose, isSwitching, setSwitching } =
    useWalletModal();
  const { status } = useSetupInfo();
  const { networkId, setNetworkId } = useNetworkInfo();
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
  const {
    isOpen: isOpenWhitelistDialog,
    onOpen: onOpenWhitelistDialog,
    onClose: onCloseWhitelistDialog,
  } = useWhitelistModal();

  const [walletList, setWalletList] = useState(WalletList);

  const {
    data: dataBasicInfo,
    isLoading: loadingBasicInfo,
    refetch: refetchBasicInfo,
  } = useQuery({
    queryKey: ["queryBasicInfo"],
    queryFn: () =>
      fetchBasicInfo({
        address: publicKey?.toString() || address,
        source: WalletList.find(
          (wallet: any) => wallet.name === currentWallet?.adapter.name
        )?.id,
        networkId,
      }),
    enabled: false,
  });

  const {
    data: dataAuthorize,
    isLoading: loadingAuthorize,
    refetch: refetchAuthorize,
  } = useQuery({
    queryKey: ["queryAuthorize"],
    queryFn: () =>
      fetchAuthorize({
        address: publicKey?.toString() || address,
        address_encoded: encodeBase64(publicKey!.toBytes()),
        signature: currentSignature || signature,
        networkId,
      }),
    enabled: false,
  });

  const mutationLogout = useMutation({
    mutationFn: () => fetchLogout({ token: currentToken || token, networkId }),
    onSuccess: () => {
      reset();
      disconnect();
    },
  });

  const handleWalletSelect = async (currentWallet: any) => {
    await disconnect();

    const walletName = currentWallet.adapter.name;
    if (walletName) {
      try {
        // currentToken = "";
        // setToken("");
        select(walletName);
        onClose();
        setSwitching(false);
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }

    // track code
    trackClick({ text: "Connect Action" });
    trackCriteoWalletClick();
    trackCriteoWalletTransactionClick();
    connectWalletStatics();
  };

  const sign = async () => {
    try {
      if (!signMessage) {
        console.log("signMessage function is not available");
        return;
      }

      const message = new TextEncoder().encode(messageToSign);
      const uint8arraySignature = await signMessage(message);
      const signature = encodeBase64(uint8arraySignature);
      currentSignature = signature;
      messageToSign = "";
      setSignature(currentSignature);
      refetchAuthorize();
    } catch (e) {
      console.log("could not sign message", e);
      currentToken = "";
      setToken("");
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

  const signWalletMessage = async () => {
    await sign();
  };

  const afterWalletConnected = () => {
    if (isSupportSonic(currentWallet?.adapter.name)) {
      // testnet
      if (networkId === "testnet") {
        if (isWhitelist) {
          onOpenSetUpNetworkWalletDialog();
        } else {
          onOpenWhitelistDialog();
          if (!isSwitching) {
            disconnect();
            mutationLogout.mutate();
          }
        }
      }
      // devnet
      else {
        if (!status || !status[address]) {
          onOpenSetUpNetworkWalletDialog();
        }
      }
    } else {
      switchMoreWallets();
    }
    onClose();
  };

  const handleInstallWallet = (currentWallet: any) => {
    // detect if in wallet's explorer
    if (isMobileDevice() && !(window as any)?.solana) {
      currentWallet.getDeepLink && currentWallet.getDeepLink();
    }
  };

  useEffect(() => {
    if (isInMaintenanceTime(networkId)) {
      disconnect();
      setAddress("");
      setToken("");
      return;
    }

    if (dataBasicInfo?.data) {
      if (messageToSign === dataBasicInfo.data) {
        return;
      }
      messageToSign = dataBasicInfo.data;
      const isNoToken = !token && !currentToken;
      const isNewAddress = publicKey?.toString() !== lastAddress;
      if (messageToSign && (isNoToken || isNewAddress)) {
        signWalletMessage();
      }
    }
  }, [dataBasicInfo]);

  useEffect(() => {
    if (dataAuthorize) {
      // not in whitelist
      if (dataAuthorize.code === 100027) {
        setIsInWhitelist(false);
        isWhitelist = false;
      }

      if (dataAuthorize.data?.token) {
        currentToken = dataAuthorize.data.token;
        setToken(currentToken);
        setIsInWhitelist(true);
        isWhitelist = true;
      }

      // open tip dilogs
      afterWalletConnected();
    }
  }, [JSON.stringify(dataAuthorize)]);

  useEffect(() => {
    if (publicKey) {
      lastAddress = address;
      refetchBasicInfo();
      setAddress(publicKey.toString());
      setTaskAddress(publicKey.toString());

      try {
        const page_name = document.title;
        const connect_page = window.location.href;

        trackActionEvent("walletConnect", {
          page_name,
          connect_time: new Date(),
          connect_page,
          wallet_address: publicKey.toString(),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [publicKey]);

  useEffect(() => {
    if (isMobileViewport()) {
      const list = WalletList.map((wallet: any) => {
        return { ...wallet, hide: false };
      });
      setWalletList(list);
    }
  }, []);

  const SupportSonicTag = () => (
    <div className="text-[#fbb042] text-[10px] bg-[#2C251D] rounded px-1 py-[2px]">
      Support Sonic
    </div>
  );

  const ExtraBonusTag = () => (
    <div className="text-[#fbb042] text-[10px] bg-[#2C251D] font-orbitron px-2 py-[2px]">
      Extra Bonus
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-full md:w-[520px] h-full md:h-auto bg-[#111] md:bg-[#151519] border-none p-4 md:p-8">
        <DialogHeader className="md:max-w-[416px]">
          <DialogTitle className="inline-flex items-center h-8 md:h-auto text-left text-white/30 md:text-white text-sm md:text-[20px] font-orbitron leading-normal">
            {isSwitching
              ? `Welcome to Sonic - ${
                  networkSwitchingNames[networkId || "devnet"].name
                }`
              : "Connect Your Wallet"}
          </DialogTitle>
          <DialogDescription className="hidden md:block w-[416px] text-[#666666] text-sm font-manrope">
            {isSwitching ? (
              <>
                Re-login required for Sonic Stage{" "}
                {networkSwitchingNames[networkId || "devnet"].id}{" "}
                {networkSwitchingNames[networkId || "devnet"].name}
              </>
            ) : (
              <>
                Choose one of the wallets and install the corresponding browser
                extension.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <ul className="flex gap-8 flex-col w-full mt-12 md:mt-8">
          {walletList
            .filter(
              (wallet: any) =>
                !wallet.network || (wallet.network && wallet.network[networkId])
            )
            .map(
              (wallet: any) =>
                !wallet.hide && (
                  <li
                    key={wallet.adapter?.name}
                    //onClick={() => select(wallet.adapter?.name)}
                    className="h-10 flex items-center w-full justify-between"
                  >
                    <div
                      className="flex items-center cursor-pointer hover:opacity-80 transition-all"
                      onClick={() => handleWalletSelect(wallet)}
                    >
                      <img
                        src={wallet.adapter?.icon}
                        alt={wallet.adapter?.name}
                        className="w-6 h-6 mr-3"
                      />
                      <span className="text-sm md:text-base text-white font-semibold font-orbitron mr-2 md:mr-3">
                        {wallet.adapter?.name}
                      </span>
                      {isInWalletCampaignTime(networkId) ? (
                        wallet.hasExtraBonus &&
                        wallet.hasExtraBonus[networkId || "devnet"] ? (
                          <ExtraBonusTag />
                        ) : null
                      ) : wallet.isSupportSonic ? (
                        <SupportSonicTag />
                      ) : null}
                    </div>

                    {wallet.adapter.readyState ===
                    WalletReadyState.Installed ? (
                      <div
                        className={cn(
                          "inline-flex items-center justify-center min-w-[98px] md:min-w-[136px] h-8 md:h-10 text-center rounded border-none cursor-pointer px-4 py-2.5 transition-all",
                          "border-[#0000FF] bg-[#0000FF] hover:bg-[#0000FF]/80"
                        )}
                        onClick={() => handleWalletSelect(wallet)}
                      >
                        <span className="text-white text-sm md:text-base font-orbitron font-semibold md:font-bold">
                          {isSwitching
                            ? wallet.adapter?.name ===
                              currentWallet?.adapter?.name
                              ? "Reconnect"
                              : "Connect"
                            : "Connect"}
                        </span>
                      </div>
                    ) : (
                      <a
                        className={cn(
                          "inline-flex items-center justify-center min-w-[98px] md:min-w-[136px] h-8 md:h-10 text-center rounded cursor-pointer px-4 py-2.5 border-solid border active:opacity-80 transition-all",
                          "border-[#27282D] hover:border-white/80"
                        )}
                        href={wallet.adapter.url}
                        target="_blank"
                        onClick={() => handleInstallWallet(wallet)}
                      >
                        <span className="text-white text-sm md:text-base font-orbitron font-semibold md:font-bold">
                          Install
                        </span>
                      </a>
                    )}
                  </li>
                )
            )}
          {walletList
            .filter(
              (wallet: any) =>
                !wallet.network || (wallet.network && wallet.network[networkId])
            )
            .some((currentWallet: any) => currentWallet.hide) && (
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

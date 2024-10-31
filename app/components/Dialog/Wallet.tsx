"use client";

import { useEffect, useState } from "react";

import {
  fetchAuthorize,
  fetchBasicInfo,
  fetchLogout
} from "@/app/data/account";
import {
  useAccountInfo,
  useNetworkInfo,
  useWalletModal
} from "@/app/store/account";
import { useTaskInfo } from "@/app/store/task";
import {
  useMoreWalletModal,
  useSetupInfo,
  useWhitelistModal
} from "@/app/store/tutorials";
import { WalletList, isSupportSonic } from "@/app/wallet/wallet-list";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { connectWalletStatics } from "@/lib/analytics";
import {
  trackActionEvent,
  trackClick,
  trackCriteoWalletClick,
  trackCriteoWalletTransactionClick
} from "@/lib/track";
import {
  cn,
  isInMaintenanceTime,
  isInWalletCampaignTime,
  isMobileDevice,
  isMobileViewport
} from "@/lib/utils";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { encodeBase64 } from "tweetnacl-util";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { Button } from "@/components/ui/button";
import { useBreakpoint } from "@/app/hooks";

let lastAddress = "";
let currentSignature = "";
let currentToken = "";
let messageToSign = "";
let isWhitelist = false;

const networkSwitchingNames: any = {
  devnet: {
    id: "1",
    name: "Origin"
  },
  testnet: {
    id: "2",
    name: "Frontier v0"
  },
  testnetv1: {
    id: "3",
    name: "Frontier v1"
  }
};

export function WalletDialog({ text = "Connect", className }: any) {
  const {
    select,
    wallet: currentWallet,
    publicKey,
    disconnect,
    connected,
    signMessage
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
    reset
  } = useAccountInfo();
  const { setAddress: setTaskAddress } = useTaskInfo();
  const { isOpen, onOpen, onClose, isSwitching, setSwitching } =
    useWalletModal();
  const { status } = useSetupInfo();
  const { networkId, setNetworkId } = useNetworkInfo();
  const {
    isOpen: isOpenMoreWalletDialog,
    onOpen: onOpenMoreWalletDialog,
    onClose: onCloseMoreWalletDialog
  } = useMoreWalletModal();
  const {
    isOpen: isOpenWhitelistDialog,
    onOpen: onOpenWhitelistDialog,
    onClose: onCloseWhitelistDialog
  } = useWhitelistModal();

  const [walletList, setWalletList] = useState(WalletList);
  const isMobile = useBreakpoint() === "mobile";

  const {
    data: dataBasicInfo,
    isLoading: loadingBasicInfo,
    refetch: refetchBasicInfo
  } = useQuery({
    queryKey: ["queryBasicInfo"],
    queryFn: () =>
      fetchBasicInfo({
        address: publicKey?.toString() || address,
        source: WalletList.find(
          (wallet: any) => wallet.name === currentWallet?.adapter.name
        )?.id,
        networkId
      }),
    enabled: false
  });

  const {
    data: dataAuthorize,
    isLoading: loadingAuthorize,
    refetch: refetchAuthorize
  } = useQuery({
    queryKey: ["queryAuthorize"],
    queryFn: () =>
      fetchAuthorize({
        address: publicKey?.toString() || address,
        address_encoded: encodeBase64(publicKey!.toBytes()),
        signature: currentSignature || signature,
        networkId
      }),
    enabled: false
  });

  const mutationLogout = useMutation({
    mutationFn: () => fetchLogout({ token: currentToken || token, networkId }),
    onSuccess: () => {
      reset();
      disconnect();
    }
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
          openModalDirectly(MODAL_HASH_MAP.setUpSonicNetwork);
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
          openModalDirectly(MODAL_HASH_MAP.setUpSonicNetwork);
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
          wallet_address: publicKey.toString()
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
    <div className="text-gold-yellow text-ten bg-bg-tag px-2 h-5 flex-center font-orbitron">
      Support Sonic
    </div>
  );

  const ExtraBonusTag = () => (
    <div className="text-gold-yellow text-ten bg-bg-tag px-2 h-5 flex-center font-orbitron">
      Extra Bonus
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[520px] h-full md:h-auto text-primary p-0">
        <div className="px-4 md:p-8 bg-black md:bg-bg-popup">
          <DialogHeader>
            <DialogTitle className="h-14 flex items-center md:h-auto text-title3 text-left text-tertary md:!text-primary md:text-headline5 font-orbitron">
              {isSwitching
                ? `Welcome to Sonic - ${
                    networkSwitchingNames[networkId || "devnet"].name
                  }`
                : "Connect Your Wallet"}
            </DialogTitle>
            <DialogDescription className="hidden md:block text-body3 text-tertary">
              {isSwitching ? (
                <>
                  Re-login required for Sonic Stage{" "}
                  {networkSwitchingNames[networkId || "devnet"].id}{" "}
                  {networkSwitchingNames[networkId || "devnet"].name}
                </>
              ) : (
                <>
                  Choose one of the wallets and install the corresponding
                  browser extension.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <ul className="flex flex-col w-full mt-0 md:mt-8">
            {walletList
              .filter(
                (wallet: any) =>
                  !wallet.network ||
                  (wallet.network && wallet.network[networkId || "devnet"])
              )
              .map(
                (wallet: any) =>
                  !wallet.hide && (
                    <li
                      key={wallet.adapter?.name}
                      //onClick={() => select(wallet.adapter?.name)}
                      className="flex items-center w-full justify-between h-16"
                    >
                      <div
                        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => handleWalletSelect(wallet)}
                      >
                        <img
                          src={wallet.adapter?.icon}
                          alt={wallet.adapter?.name}
                          className="size-6"
                        />
                        <span className="text-title3 md:text-title2 font-orbitron">
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
                        <Button
                          variant={"primary"}
                          size={isMobile ? "sm" : "md"}
                          className="font-orbitron text-title3 w-24 md:w-[113px]"
                          onClick={() => handleWalletSelect(wallet)}
                        >
                          {isSwitching
                            ? wallet.adapter?.name ===
                              currentWallet?.adapter?.name
                              ? "Reconnect"
                              : "Connect"
                            : "Connect"}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            window.open(wallet.adapter.url, "_blank");
                            handleInstallWallet(wallet);
                          }}
                          variant="outline"
                          size={isMobile ? "sm" : "md"}
                          className="text-title3 font-orbitron w-24 md:w-[113px]"
                        >
                          Install
                        </Button>
                      )}
                    </li>
                  )
              )}
            {walletList
              .filter(
                (wallet: any) =>
                  !wallet.network ||
                  (wallet.network && wallet.network[networkId || "devnet"])
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

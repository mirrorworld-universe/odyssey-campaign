"use client";

import { useEffect, useState } from "react";

import {
  fetchAuthorize,
  fetchBasicInfo,
  fetchLogout
} from "@/app/data/account";
import { useBreakpoint } from "@/app/hooks";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import {
  useAccountInfo,
  useNetworkInfo,
  useWalletModal
} from "@/app/store/account";
import { useTaskInfo } from "@/app/store/task";
import { useSetupInfo } from "@/app/store/tutorials";
import { WalletList, isSupportSonic } from "@/app/wallet/wallet-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  isInMaintenanceTime,
  isInWalletCampaignTime,
  isMobileDevice,
  isMobileViewport
} from "@/lib/utils";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { encodeBase64 } from "tweetnacl-util";
import { networkMap } from "@/app/data/config";

let lastAddress = "";
let currentSignature = "";
let currentToken = "";
let messageToSign = "";
let isWhitelist = false;

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

  const switchMoreWallets = () => {
    openModalDirectly(MODAL_HASH_MAP.moreWallet);
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
      if (!status || !status[address]) {
        openModalDirectly(MODAL_HASH_MAP.setUpSonicNetwork);
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

  const WalletItem = ({ wallet }: any) => (
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
        <span className="sonic-title3 md:sonic-title2 font-orbitron">
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

      {wallet.adapter.readyState === WalletReadyState.Installed ? (
        <Button
          variant={"primary"}
          size={isMobile ? "sm" : "md"}
          className="font-orbitron sonic-title3 w-24 md:w-[113px]"
          onClick={() => handleWalletSelect(wallet)}
        >
          {isSwitching
            ? wallet.adapter?.name === currentWallet?.adapter?.name
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
          variant={wallet.isTiktokLayer ? "primary" : "outline"}
          size={isMobile ? "sm" : "md"}
          className="sonic-title3 font-orbitron w-24 md:w-[113px]"
        >
          {wallet.isTiktokLayer ? "Launch" : "Install"}
        </Button>
      )}
    </li>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[520px] h-full md:h-auto text-primary p-0">
        <div className="px-4 md:p-8 bg-black md:bg-bg-popup">
          <DialogHeader>
            <DialogTitle className="h-14 flex items-center md:h-auto sonic-title3 text-left text-tertary md:!text-primary md:sonic-headline5 font-orbitron">
              {isSwitching
                ? `Welcome to Sonic - ${networkMap[networkId].name}`
                : "Connect Your Wallet"}
            </DialogTitle>
            <DialogDescription className="hidden md:block sonic-body3 text-tertary">
              {isSwitching ? (
                <>Re-login required for Sonic {networkMap[networkId].name}</>
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
                  (!wallet.network ||
                    (wallet.network &&
                      wallet.network[networkId || "devnet"])) &&
                  !wallet.isTiktokLayer
              )
              .map(
                (wallet: any) =>
                  !wallet.hide && <WalletItem wallet={wallet} key={wallet.id} />
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
            <div className="w-full h-[30px] flex justify-center items-center relative">
              <Separator className="bg-[#27282D]" />
              <span className="text-[#333] text-xs md:text-sm font-semibold font-orbitron bg-black md:bg-[#151519] px-6 absolute">
                TikTok App-layer
              </span>
            </div>
            {walletList
              .filter(
                (wallet: any) =>
                  (!wallet.network ||
                    (wallet.network &&
                      wallet.network[networkId || "devnet"])) &&
                  wallet.isTiktokLayer
              )
              .map(
                (wallet: any) =>
                  !wallet.hide && <WalletItem wallet={wallet} key={wallet.id} />
              )}
            {/* <WalletMultiButton style={{}} /> */}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

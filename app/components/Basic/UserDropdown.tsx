"use client";
import { Close } from "@/app/icons/Close";
import { WalletList, setUpUrls } from "@/app/wallet/wallet-list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchLogout } from "../../data/account";
import {
  formatAddress,
  useAccountInfo,
  useNetworkInfo,
  useSystemInfo,
  useWalletModal
} from "../../store/account";
import { Button } from "@/components/ui/button";
import { useBreakpoint } from "@/app/hooks";

export function UserDropdown() {
  const { isInMaintenance } = useSystemInfo();
  const { setToken } = useAccountInfo();
  const { connection } = useConnection();
  const { isOpen, onOpen, setSwitching } = useWalletModal();
  const { select, wallet, wallets, publicKey, disconnect, connecting } =
    useWallet();
  const { address, token, reset } = useAccountInfo();
  const { networkId } = useNetworkInfo();

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const isMobile = useBreakpoint() === "mobile";

  const mutationLogout = useMutation({
    mutationFn: () => fetchLogout({ token, networkId }),
    onSuccess: () => {
      setSwitching(false);
      reset();
    }
  });

  const handleClickOpenMyWallet = () => {
    !publicKey && onOpen();
    setShowPanel(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
  };

  const hanldeCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast({
        title: "Copy Successful",
        description: (
          <div role="success">
            The user address has been copied successfully.
          </div>
        )
      });
    } catch (err) {
      console.error("Failed to copy user address: ", err);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    mutationLogout.mutate();
    setPopoverOpen(false);
  };

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    try {
      connection.onAccountChange(
        publicKey,
        (updatedAccountInfo) => {
          if (updatedAccountInfo) {
            setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
          }
        },
        "confirmed"
      );

      connection.getAccountInfo(publicKey).then((info) => {
        if (info) {
          setBalance(info?.lamports / LAMPORTS_PER_SOL);
        }
      });
    } catch (ex) {
      console.log("connection ex", ex);
    }
  }, [publicKey, connection]);

  const UserDropdownPanel = ({ className, showHeader }: any) => (
    <div className={cn("bg-black md:bg-bg-popup w-full", className)}>
      {showHeader ? (
        <p className="flex justify-between items-center p-4">
          <span className="text-title2 font-orbitron text-tertary">
            My Wallet
          </span>
          <span
            className="cursor-pointer hover:opacity-80"
            onClick={handleClosePanel}
          >
            <Close color="#4D4D4D" width={24} height={24} />
          </span>
        </p>
      ) : null}

      <div className="flex-v justify-center px-6 h-[82px] border-b border-line">
        {/* user basic info */}
        <div className="flex gap-4 md:gap-3 justify-start items-center">
          <img
            className="w-10 h-10 rounded-[50%] md:rounded-none"
            src={wallet?.adapter.icon}
            alt=""
          />
          <div className="flex flex-col justify-between items-start gap-1">
            <span className="text-white text-xl md:text-lg font-semibold md:font-bold font-manrope md:font-orbitron">
              {isInMaintenance ? "--" : balance?.toFixed(2)} SOL
            </span>
            <div
              className="flex flex-row items-center cursor-pointer"
              onClick={hanldeCopyAddress}
            >
              <span className="text-body3 text-tertary">
                {formatAddress(publicKey?.toBase58())}
              </span>
              <img
                src="/images/copy.svg"
                alt=""
                className="size-4 ml-1 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* upgrade tip */}
        {isInMaintenance ? (
          <p className="flex flex-row gap-1 mt-2">
            <img className="w-4 h-4 mt-[1px]" src="/images/icons/report.svg" />
            <span className="text-[#FBB042] text-xs">
              Sonic Testnet is currently undergoing an upgrade and will resume
              in 6 hours.
            </span>
          </p>
        ) : null}
      </div>

      <a
        className="flex items-center h-16 md:h-14 gap-2 px-6 hover:bg-line"
        href={`https://explorer.sonic.game/address/${address}${
          networkId === "testnet" ? "?cluster=testnet" : ""
        }`}
        target="_blank"
      >
        <img src="/images/description.svg" alt="" className="size-6" />
        <span className="text-white text-base md:text-sm font-semibold font-orbitron">
          Tx History
        </span>
      </a>

      {WalletList.find(
        (item: any) =>
          item.name.toLowerCase() === wallet?.adapter.name.toLowerCase()
      ).isSupportSonic && (
        <a
          className="flex items-center h-16 md:h-14 gap-2 px-6 hover:bg-line"
          href={
            setUpUrls[wallet?.adapter.name.toLowerCase() || "nightly"]
              ? setUpUrls[wallet?.adapter.name.toLowerCase() || "nightly"][
                  networkId || "devnet"
                ]
              : "https://blog.sonic.game/sonic-network-settings---nightly-wallet"
          }
          target="_blank"
        >
          <img src="/images/settings.svg" alt="" className="size-6" />
          <span className="text-white text-base md:text-sm font-semibold font-orbitron">
            Set up Network
          </span>
        </a>
      )}

      <div
        className="flex items-center h-16 md:h-14 gap-2 px-6 hover:bg-line"
        onClick={handleDisconnect}
      >
        <img src="/images/logout.svg" alt="" className="size-6" />
        <span className="text-white text-base md:text-sm font-semibold font-orbitron">
          Disconnect
        </span>
      </div>
    </div>
  );

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <Button
            title={publicKey?.toBase58()}
            onClick={handleClickOpenMyWallet}
            variant={"outline"}
            className="flex items-center gap-2"
            size={isMobile ? "sm" : "md"}
          >
            <img src="/images/wallet.svg" alt="" className="size-6" />
            <span className="text-title3 text-primary">
              {formatAddress(publicKey?.toBase58(), isMobile ? 2 : 4)}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="hidden md:flex max-w-full w-full md:w-[220px] bg-[#1b1b1b] border-none rounded p-0 relative top-1 right-10 2xl:right-8">
          <UserDropdownPanel />
        </PopoverContent>
      </Popover>

      {/* mobile */}
      <div
        className={cn(
          "flex md:hidden flex-col w-full max-h-full fixed top-0 right-0 left-0 bottom-0 z-30 transition-transform duration-300",
          showPanel ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <UserDropdownPanel showHeader className={cn("w-full h-full")} />
      </div>
    </>
  );
}

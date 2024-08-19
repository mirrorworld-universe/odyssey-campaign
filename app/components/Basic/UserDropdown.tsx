"use client";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  formatAddress,
  toFixed,
  useAccountInfo,
  useNetworkInfo,
  useSystemInfo,
  useWalletModal,
} from "../../store/account";
import { fetchLogout } from "../../data/account";
import { WalletList, setUpUrls } from "@/app/wallet/wallet-list";
import { cn, isMobileViewport } from "@/lib/utils";
import { Close } from "@/app/icons/Close";
import { socketConnected } from "@/lib/ws";

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

  const mutationLogout = useMutation({
    mutationFn: () => fetchLogout({ token, networkId }),
    onSuccess: () => {
      setSwitching(false);
      reset();
    },
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
        ),
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
    <div className={cn("bg-[#111] md:bg-[#1b1b1b] w-full", className)}>
      {showHeader ? (
        <p className="flex justify-between items-center p-4">
          <span className="text-[#666] text-base font-orbitron font-semibold">
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

      <div className="flex flex-col p-4 pt-6">
        {/* user basic info */}
        <div className="flex gap-4 md:gap-3 justify-start items-center hover:bg-transparent md:hover:bg-[#1b1b1b]">
          <img
            className="w-10 h-10 rounded-[50%] md:rounded-none"
            src={wallet?.adapter.icon}
            alt=""
          />
          <div className="flex flex-col justify-between items-start gap-1">
            <span className="text-white text-xl md:text-lg font-semibold md:font-bold font-manrope md:font-orbitron">
              {isInMaintenance ? "--" : balance} SOL
            </span>
            <div
              className="flex flex-row items-center"
              onClick={hanldeCopyAddress}
            >
              <span className="text-white/50 text-sm md:text-xs font-semibold font-manrope">
                {formatAddress(publicKey?.toBase58())}
              </span>
              <img
                src="/images/copy.svg"
                alt=""
                className="w-4 h-4 ml-1 cursor-pointer"
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
        className="flex justify-start px-4 py-5 md:py-4 border-t border-white/10 border-solid cursor-pointer hover:bg-white/5"
        href={`https://explorer.sonic.game/address/${address}${
          networkId === "testnet" ? "?cluster=testnet" : ""
        }`}
        target="_blank"
      >
        <img
          src="/images/description.svg"
          alt=""
          className="w-6 md:w-5 h-6 md:h-5 mr-2 md:mr-3"
        />
        <span className="text-white text-base md:text-sm font-semibold font-orbitron">
          Tx History
        </span>
      </a>

      {WalletList.find(
        (item: any) =>
          item.name.toLowerCase() === wallet?.adapter.name.toLowerCase()
      ).isSupportSonic && (
        <a
          className="flex justify-start px-4 py-5 md:py-4 border-t border-white/10 border-none md:border-solid cursor-pointer hover:bg-white/5"
          href={
            setUpUrls[wallet?.adapter.name.toLowerCase() || "nightly"]
              ? setUpUrls[wallet?.adapter.name.toLowerCase() || "nightly"][
                  networkId || "devnet"
                ]
              : "https://blog.sonic.game/sonic-network-settings---nightly-wallet"
          }
          target="_blank"
        >
          <img
            src="/images/settings.svg"
            alt=""
            className="w-6 md:w-5 h-6 md:h-5 mr-2 md:mr-3"
          />
          <span className="text-white text-base md:text-sm font-semibold font-orbitron">
            Set up Network
          </span>
        </a>
      )}

      <div
        className="flex justify-start px-4 py-5 md:py-4 border-t border-white/10 border-none md:border-solid cursor-pointer hover:bg-white/5"
        onClick={handleDisconnect}
      >
        <img
          src="/images/logout.svg"
          alt=""
          className="w-6 md:w-5 h-6 md:h-5 mr-2 md:mr-3"
        />
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
          <div
            className="flex flex-row gap-2 border-solid border border-white/40 hover:border-white/80 px-3 py-2 md:px-4 2xl:px-5 md:py-2 2xl:py-[10px] rounded cursor-pointer transition-all duration-300"
            onClick={handleClickOpenMyWallet}
            title={publicKey?.toBase58()}
          >
            <img
              src="/images/wallet.svg"
              alt=""
              className="w-5 h-5 2xl:w-6 2xl:h-6"
            />
            <span className="text-white font-semibold font-orbitron text-sm 2xl:text-base">
              {formatAddress(publicKey?.toBase58(), isMobileViewport() ? 2 : 4)}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="hidden md:flex max-w-full w-full md:w-[248px] bg-[#1b1b1b] border-none rounded px-0 py-1 relative top-1 right-10 2xl:right-8">
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

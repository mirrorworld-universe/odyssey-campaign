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
  useWalletModal,
} from "../../store/account";
import { fetchLogout } from "../../data/account";
import { WalletList } from "../../wallet/wallet-list";

export function UserDropdown() {
  const { setToken } = useAccountInfo();
  const { connection } = useConnection();
  const { isOpen, onOpen } = useWalletModal();
  const { select, wallet, wallets, publicKey, disconnect, connecting } =
    useWallet();
  const { address, token, reset } = useAccountInfo();

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  const setUpUrls: any = {
    nightly: "https://blog.sonic.game/sonic-network-settings---nightly-wallet",
    backpack:
      "https://blog.sonic.game/sonic-network-settings---backpack-wallet",
  };

  const mutationLogout = useMutation({
    mutationFn: () => fetchLogout({ token }),
    onSuccess: () => {
      reset();
    },
  });

  const handleClickOpenWallet = () => {
    !publicKey && onOpen();
  };

  const hanldeCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast({
        title: "Copy Successful",
        description: "The user address has been copied successfully.",
      });
    } catch (err) {
      console.error("Failed to copy user address: ", err);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setToken("");
    mutationLogout.mutate();
    setPopoverOpen(false);
  };

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info?.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [publicKey, connection]);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <div
          className="flex flex-row gap-2 border-solid border border-white/40 hover:border-white/80 px-5 py-[10px] rounded cursor-pointer transition-all duration-300"
          onClick={handleClickOpenWallet}
          title={publicKey?.toBase58()}
        >
          <img src="/images/wallet.svg" alt="" />
          <span className="text-white font-semibold font-orbitron">
            {formatAddress(publicKey?.toBase58())}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] bg-[#1b1b1b] border-none rounded px-0 py-1">
        <div className="flex gap-3 justify-start items-center px-4 py-5 hover:bg-[#1b1b1b]">
          <img className="w-10 h-10" src={wallet?.adapter.icon} alt="" />
          <div className="flex flex-col justify-center">
            <span className="text-white text-lg font-semibold font-orbitron">
              {balance} SOL
            </span>
            <div
              className="flex flex-row items-center mt-1"
              onClick={hanldeCopyAddress}
            >
              <span className="text-white/50 text-xs font-semibold">
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

        <a
          className="flex justify-start px-4 py-4 border-t border-white/10 border-solid cursor-pointer hover:bg-white/5"
          href={`https://explorer.sonic.game/address/${address}`}
          target="_blank"
        >
          <img src="/images/description.svg" alt="" className="w-5 h-5 mr-3" />
          <span className="text-white text-sm font-semibold font-orbitron">
            Tx History
          </span>
        </a>

        {WalletList.find(
          (item: any) =>
            item.name.toLowerCase() === wallet?.adapter.name.toLowerCase()
        ).isSupportSonic && (
          <a
            className="flex justify-start px-4 py-4 border-t border-white/10 border-solid cursor-pointer hover:bg-white/5"
            href={setUpUrls[wallet?.adapter.name.toLowerCase() || "nightly"]}
            target="_blank"
          >
            <img src="/images/settings.svg" alt="" className="w-5 h-5 mr-3" />
            <span className="text-white text-sm font-semibold font-orbitron">
              Set up Network
            </span>
          </a>
        )}

        <div
          className="flex justify-start px-4 py-4 border-t border-white/10 border-solid cursor-pointer hover:bg-white/5"
          onClick={handleDisconnect}
        >
          <img src="/images/logout.svg" alt="" className="w-5 h-5 mr-3" />
          <span className="text-white text-sm font-semibold font-orbitron">
            Disconnect
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}

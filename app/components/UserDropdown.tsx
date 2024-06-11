"use client";
import { useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  formatAddress,
  toFixed,
  useAccountInfo,
  useWalletModal,
} from "../store/account";
import { fetchLogout } from "../data/account";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function UserDropdown() {
  const { connection } = useConnection();
  const { isOpen, onOpen } = useWalletModal();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const { address, token, reset } = useAccountInfo();

  const mutationLogout = useMutation({
    mutationFn: () => fetchLogout({ token }),
    onSuccess: () => {
      reset();
    },
  });

  const handleClickOpenWallet = () => {
    !publicKey && onOpen();
    // window.ttq?.track('ClickButton', {
    //   contents: [
    //     {
    //       content_id: '0001',
    //       content_type: 'Sonic',
    //       content_name: 'ClickButton'
    //     }
    //   ],
    //   value: '1',
    //   currency: 'USD'
    // });
  };

  const handleDisconnect = async () => {
    disconnect();
    mutationLogout.mutate();
  };

  const getBalance = async () => {
    return publicKey
      ? `${(await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL} SOL`
      : "0 SOL";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex flex-row gap-2 border-solid border border-white/40 hover:border-white/80 px-5 py-[10px] rounded-[4px] cursor-pointer transition-all duration-300"
          onClick={handleClickOpenWallet}
          title={publicKey?.toBase58()}
        >
          <img src="/images/wallet.svg" alt="" />
          <span className="text-white font-semibold font-orbitron">
            {formatAddress(publicKey?.toBase58())}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] bg-[#1b1b1b] border-none rounded px-0 py-1">
        <DropdownMenuItem className="flex gap-3 justify-start px-4 py-5 hover:bg-[#1b1b1b]">
          <img className="w-[40px] h-[40px]" src="/images/" alt="" />
          <div className="flex flex-col justify-center">
            <span className="text-white text-[18px] font-semibold font-orbitron">
              {getBalance()}
            </span>
            <div className="flex flex-row items-center mt-1">
              <span className="text-white/50 text-[12px] font-semibold">
                {formatAddress(publicKey?.toBase58())}
              </span>
              <img src="/images/copy.svg" alt="" className="w-4 h-4 ml-1" />
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-start px-4 py-4 border-t border-white/10 border-solid cursor-pointer hover:bg-white/5">
          <img src="/images/description.svg" alt="" className="w-5 h-5 mr-3" />
          <span className="text-white text-[14px] font-semibold font-orbitron">
            Tx History
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-start px-4 py-4 border-t border-white/10 border-solid cursor-pointer hover:bg-white/5">
          <img src="/images/settings.svg" alt="" className="w-5 h-5 mr-3" />
          <span className="text-white text-[14px] font-semibold font-orbitron">
            Set up Network
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-start px-4 py-4 border-t border-white/10 border-solid cursor-pointer hover:bg-white/5"
          onClick={handleDisconnect}
        >
          <img src="/images/logout.svg" alt="" className="w-5 h-5 mr-3" />
          <span className="text-white text-[14px] font-semibold font-orbitron">
            Disconnect
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

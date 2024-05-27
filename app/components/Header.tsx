"use client";

import { useEffect, useState } from "react";
import { useLatest, useMount } from "react-use";
import Link from "next/link";
import {
  formatAddress,
  useAccountModal,
  useWalletInfo,
} from "../store/account";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toFixed } from "../store/wallet";

export function Header() {
  const { isOpen, onOpen } = useAccountModal();
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");
  const isOpenRef = useLatest(isOpen);

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    }
  }, [publicKey, connection, balance]);

  const handleClickOpenWallet = () => {
    onOpen();
  };

  const handleDisconnect = async () => {
    disconnect();
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md w-full sticky:backdrop-blur-[15px] top-0 ">
      <div className="flex items-center space-x-4">
        <img
          alt="Sonic Logo"
          className="h-10"
          height="40"
          src="/sonic.png"
          style={{
            aspectRatio: "100/40",
            objectFit: "contain",
          }}
          width="100"
        />
        <Link className="text-gray-700 hover:text-gray-900" href="#">
          Network
        </Link>
        <Link className="text-gray-700 hover:text-gray-900" href="#">
          Odyssey Guide
        </Link>
        <Link className="text-gray-700 hover:text-gray-900" href="#">
          About Sonic
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">- Monitor</span>
        <span className="text-gray-700">- Rings</span>
        {/* <Select>
          <SelectTrigger aria-label="User menu" id="user-menu">
            <SelectValue placeholder="Get Started" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="profile">Profile</SelectItem>
            <SelectItem value="settings">Settings</SelectItem>
            <SelectItem value="logout">Logout</SelectItem>
          </SelectContent>
        </Select> */}

        {!publicKey ? (
          <span className="text-gray-700" onClick={handleClickOpenWallet}>
            {connecting ? "connecting..." : "Get Started"}
          </span>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="text-gray-700" onClick={handleClickOpenWallet}>
                {formatAddress(publicKey.toBase58())}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px]">
              <DropdownMenuItem asChild>
                {balance ? (
                  <div>{toFixed(balance, 2)} SOL</div>
                ) : (
                  <div>0 SOL</div>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <span>TX history</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <span>Set up Sonic Network</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-center">
                <Button
                  className="z-50 text-[20px]  text-white  border-2 border-white font-slackey"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}

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

  const menu = [
    {
      name: "Task Center",
      link: "#",
    },
    {
      name: "Network",
      link: "#",
    },
    {
      name: "Odyssey Guide",
      link: "#",
    },
    {
      name: "About Sonic",
      link: "#",
    },
  ];

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-[#111111] shadow-md w-full sticky:backdrop-blur-[15px] top-0 ">
      {/* left */}
      <div className="flex items-center gap-12 space-x-4">
        {/* logo */}
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

        {/* nav */}
        {menu.map((menuItem, menuIndex) => (
          <Link
            className="gap-12 text-white hover:text-white/50 font-['Orbitron'] transition-colors"
            href={menuItem.link}
            key={menuIndex}
          >
            {menuItem.name}
          </Link>
        ))}
      </div>

      {/* right */}
      <div className="gap-12 flex items-center space-x-4">
        <span className="text-white">- Monitor</span>
        <span className="text-white">- Rings</span>
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
          <Button
            className="px-8 py-[10px] bg-[#0000FF] text-white text-[16px]"
            onClick={handleClickOpenWallet}
          >
            {connecting ? "Connecting..." : "Connect"}
          </Button>
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

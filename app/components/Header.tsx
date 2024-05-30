"use client";

import { useEffect, useState } from "react";
import { useLatest, useMount } from "react-use";
import Link from "next/link";
import { formatAddress, useWalletModal } from "../store/account";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toFixed } from "../store/account";

export function Header() {
  const { isOpen, onOpen } = useWalletModal();
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
    !publicKey && onOpen();
    // tack code
    const ttq = (window as any).ttq;
    ttq.track("ClickButton", {
      contents: [
        {
          content_id: "0001",
          content_type: "Sonic",
          content_name: "ClickButton",
        },
      ],
      value: "1",
      currency: "USD",
    });
    ttq.track("CompleteRegistration", {
      contents: [
        {
          content_id: "0002",
          content_type: "Sonic001",
          content_name: "CompleteRegistration_001",
        },
      ],
      value: "1",
      currency: "USD",
    });
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
    <nav className="h-20 flex items-center justify-between px-10 py-4 bg-[#111111] w-full sticky sticky:backdrop-blur-[35px] top-0 transition-all">
      {/* left */}
      <div className="flex items-center gap-12 space-x-4">
        {/* logo */}
        <img
          alt="Sonic Logo"
          className="w-[135px]"
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
            className="gap-12 text-white hover:text-white/50 font-orbitron transition-colors"
            href={menuItem.link}
            key={menuIndex}
          >
            {menuItem.name}
          </Link>
        ))}
      </div>

      {/* right */}
      <div className="gap-12 flex items-center space-x-4">
        {/* <span className="text-white">- Monitor</span>
        <span className="text-white">- Rings</span> */}
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
            className="px-8 py-[10px] bg-[#0000FF] hover:bg-[#0000FF]/80 font-orbitron text-white text-[16px] transition-all"
            onClick={handleClickOpenWallet}
          >
            {connecting ? "Connecting..." : "Connect"}
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className="flex flex-row gap-2 border-solid border border-white/40 hover:border-white/80 px-5 py-[10px] rounded-[4px] cursor-pointer transition-all"
                onClick={handleClickOpenWallet}
              >
                <img src="/images/wallet.svg" alt="" />
                <span className="text-white font-orbitron">
                  {formatAddress(publicKey.toBase58())}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px]">
              {/* <DropdownMenuItem asChild>
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
              </DropdownMenuItem> */}
              <DropdownMenuItem className="flex justify-center">
                <Button
                  className="z-50 text-[16px]  text-white font-orbitron"
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

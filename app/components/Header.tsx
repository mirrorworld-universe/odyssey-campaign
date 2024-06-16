"use client";

import { useEffect, useState } from "react";
import { useLatest, useMount } from "react-use";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import Notification from "./Notification";
import {
  formatAddress,
  useAccountInfo,
  useWalletModal,
} from "../store/account";
import { getUserRewardInfo } from "../data/account";
import RingPopover from "./RingPopover";
import { UserDropdown } from "./UserDropdown";
import { useMysteryBoxInfo } from "../store/task";

export const menu: any[] = [
  {
    name: "Task Center",
    link: "/task",
    target: "_self",
  },
  {
    name: "Faucet",
    link: "https://faucet.sonic.game/#/",
    target: "_blank",
  },
  {
    name: "Odyssey Guide",
    link: "#",
    target: "_blank",
  },
  {
    name: "About Sonic",
    link: "https://sonic.game/",
    target: "_blank",
  },
];

export function Header() {
  const { isOpen, onOpen } = useWalletModal();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const { mysteryBoxAmount, setMysteryBoxAmount } = useMysteryBoxInfo();

  const { address, token, reset } = useAccountInfo();
  const [ringAmount, setRingAmount] = useState(0);
  const [ringMonitorAmount, setRingMonitorAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const {
    data: dataRewardsInfo,
    isLoading: loadingRewardsInfo,
    refetch: refetchRewardsInfo,
  } = useQuery({
    queryKey: ["queryUserRewardsInfo", address],
    queryFn: () => getUserRewardInfo({ token }),
    enabled: !!token,
  });

  useEffect(() => {
    const data = dataRewardsInfo?.data;
    if (data) {
      const { wallet_balance, ring, ring_monitor } = data;
      setWalletBalance(wallet_balance);
      setRingAmount(ring);
      setRingMonitorAmount(ring_monitor);
      setMysteryBoxAmount(ring_monitor);
    }
  }, [dataRewardsInfo]);

  // useEffect(() => {
  //   if (publicKey) {
  //     (async function getBalanceEvery10Seconds() {
  //       const newBalance = await connection.getBalance(publicKey);
  //       setBalance(newBalance / LAMPORTS_PER_SOL);
  //       setTimeout(getBalanceEvery10Seconds, 10000);
  //     })();
  //   }
  // }, [publicKey, connection, balance]);

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

  return (
    <nav className="h-20 flex items-center justify-between px-10 py-4 bg-[#111111] w-full sticky sticky:backdrop-blur-[35px] top-0 z-30 transition-all duration-300">
      {/* left */}
      <div className="flex items-center gap-12 space-x-4">
        {/* logo */}
        <Link href="/">
          <img
            alt="Sonic Logo"
            className="w-[135px] h-auto"
            src="/sonic.png"
            style={{
              aspectRatio: "100/40",
              objectFit: "contain",
            }}
            width="100"
          />
        </Link>

        {/* nav */}
        {menu.map((menuItem, menuIndex) => (
          <Link
            className="gap-12 text-white hover:text-[#FBB042] font-semibold font-orbitron transition-colors"
            href={menuItem.link}
            key={menuIndex}
            target={menuItem.target}
          >
            {menuItem.name}
          </Link>
        ))}
      </div>

      {/* right */}
      <div className="gap-12 flex items-center">
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

        {address && token && (
          <RingPopover
            ring={ringAmount}
            ringMonitor={ringMonitorAmount}
            onOpenMysteryBox={() => refetchRewardsInfo()}
          />
        )}

        <Notification />

        {!publicKey ? (
          <Button
            className="px-8 py-[10px] bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 font-orbitron font-semibold text-white text-[16px] transition-all duration-300"
            onClick={handleClickOpenWallet}
          >
            {connecting ? "Connecting..." : "Connect"}
          </Button>
        ) : (
          <UserDropdown />
        )}
      </div>
    </nav>
  );
}

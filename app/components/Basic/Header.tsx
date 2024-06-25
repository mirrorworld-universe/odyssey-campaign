"use client";

import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { format, formatDistance } from "date-fns";
import { UTCDate } from "@date-fns/utc";

import { Button } from "@/components/ui/button";

import Notification from "./Notification";
import {
  formatAddress,
  useAccountInfo,
  useNotificationBar,
  useSystemInfo,
  useWalletModal,
} from "../../store/account";
import RingPopover from "./RingPopover";
import { UserDropdown } from "./UserDropdown";
import { NotificationBar } from "./NotificationBar";
import { useLotteryBar } from "@/app/store/lottery";
import { openWalletStatics } from "@/lib/analytics";
import {
  trackActionEvent,
  trackClick,
  trackCriteoWalletClick,
  trackCriteoWalletTransactionClick,
  trackLinkClick,
} from "@/lib/track";
import {
  isInMaintenanceTime,
  maintenanceEndTime,
  maintenanceStartTime,
} from "@/lib/utils";
import { Speaker } from "@/app/icons/Speaker";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLotteryBanner } from "@/app/data/lottery";
import { Trophy } from "@/app/icons/Trophy";

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
    link: "https://blog.sonic.game/sonic-testnet-odyssey-guide",
    target: "_blank",
  },
  {
    name: "About Sonic",
    link: "https://sonic.game/",
    target: "_blank",
  },
];

export function Header() {
  const { isInMaintenance, setInMaintenance } = useSystemInfo();
  const { isOpen, onOpen } = useWalletModal();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const { address, token, reset } = useAccountInfo();
  const { isOpen: isOpenLotteryBar, onOpen: onOpenLotteryBar } =
    useLotteryBar();
  const { isOpen: isOpenNotificationBar, onOpen: onOpenNotificationBar } =
    useNotificationBar();

  const [bannerMessage, setBannerMessage] = useState<any>({});

  const { data: dataWinnerBanner } = useQuery({
    queryKey: ["queryLotteryBanner", address],
    queryFn: () => getLotteryBanner({ token }),
    enabled: !!address && !!token,
    refetchInterval: 30 * 60 * 1000,
  });

  // useEffect(() => {
  //   if (publicKey) {
  //     (async function getBalanceEvery10Seconds() {
  //       const newBalance = await connection.getBalance(publicKey);
  //       setBalance(newBalance / LAMPORTS_PER_SOL);
  //       setTimeout(getBalanceEvery10Seconds, 10000);
  //     })();
  //   }
  // }, [publicKey, connection, balance]);

  const handleClickOpenWallet = (event: any) => {
    !publicKey && onOpen();

    // ga4
    trackClick({ text: "Connect Wallet" });

    // ttq code part
    openWalletStatics();
    trackCriteoWalletClick();
    trackCriteoWalletTransactionClick();
  };

  useEffect(() => {
    if (dataWinnerBanner?.data?.wallet) {
      setBannerMessage(dataWinnerBanner.data);
      onOpenLotteryBar();
    }
  }, [dataWinnerBanner]);

  useEffect(() => {
    if (isInMaintenanceTime()) {
      setInMaintenance();
      onOpenNotificationBar();
    }

    try {
      const page_name = document.title;
      const entry_page = window.location.href;

      trackActionEvent("pageLoad", {
        page_name,
        entry_time: new Date(),
        entry_page,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <nav className="flex flex-col w-full sticky sticky:backdrop-blur-[35px] top-0 z-30">
      <div className="h-20 flex items-center justify-between px-10 py-4 bg-[#111111] w-full transition-all duration-300">
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
              onClick={trackLinkClick}
            >
              {menuItem.name}
            </Link>
          ))}
        </div>

        {/* right */}
        <div className="gap-12 flex items-center">
          {address && token ? <RingPopover /> : null}

          {address && token ? <Notification /> : null}

          {!publicKey ? (
            <Button
              className="w-[200px] h-12 justify-center items-center bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 font-orbitron font-semibold text-white text-base transition-all duration-300"
              onClick={handleClickOpenWallet}
            >
              {connecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          ) : (
            <UserDropdown />
          )}
        </div>
      </div>

      {/* system notification bar */}
      {isInMaintenance && isOpenNotificationBar && (
        <NotificationBar className="bg-[#00063C] min-h-12 h-auto px-3">
          <span className="inline-flex justify-center gap-2 text-base text-[#48BBFF] font-semibold py-3">
            <Speaker
              width={24}
              height={24}
              color="#48BBFF"
              className="min-w-6 min-h-6"
            />
            <span className="inline-flex max-w-[718px] whitespace-nowrap overflow-hidden">
              <div className="pl-[100%] animate-marquee">
                Important Update: Sonic Testnet will upgrade on{" "}
                {format(new UTCDate(maintenanceStartTime), "PPP")}, at{" "}
                {format(new UTCDate(maintenanceStartTime), "h a")} UTC, for{" "}
                {formatDistance(
                  new UTCDate(maintenanceStartTime),
                  new UTCDate(maintenanceEndTime)
                )}
                . Some tasks and on-chain interactions will be paused. Thank you
                for understanding.
              </div>
            </span>
          </span>
        </NotificationBar>
      )}

      {/* notification bar */}
      {isOpenLotteryBar && (
        <NotificationBar>
          <div className="flex flex-row justify-center items-center gap-1 text-center">
            <Trophy width={24} height={24} color="white" />
            <span>
              Congratulations! Address {formatAddress(bannerMessage?.wallet)},
              as the {bannerMessage?.number}
              {bannerMessage?.number === 1
                ? "st"
                : bannerMessage?.number === 2
                ? "nd"
                : bannerMessage?.number === 3
                ? "rd"
                : "th"}{" "}
              winner{" "}
              {formatDistance(new Date(bannerMessage.date), new Date(), {
                addSuffix: true,
              })}{" "}
              in the{" "}
              <a href="/task/ring-lottery" className="underline">
                ring lottery
              </a>
              , has earned an additional {bannerMessage?.amount}{" "}
              {bannerMessage?.amount === 1 ? "ring" : "rings"} reward!
            </span>
          </div>
        </NotificationBar>
      )}
    </nav>
  );
}

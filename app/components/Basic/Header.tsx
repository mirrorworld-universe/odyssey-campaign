"use client";

import Link from "next/link";
import { hasCookie } from "cookies-next";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { format, formatDistance } from "date-fns";
import { UTCDate } from "@date-fns/utc";

import { Button } from "@/components/ui/button";

import Notification from "./Notification";
import {
  formatAddress,
  useAccountInfo,
  useNetworkInfo,
  useNotificationBar,
  useSystemInfo,
  useWalletModal,
} from "../../store/account";
import RingPopover from "./RingPopover";
import { UserDropdown } from "./UserDropdown";
import { NotificationBar } from "./NotificationBar";
import { useLotteryBar, useLotteryInfo } from "@/app/store/lottery";
import { openWalletStatics } from "@/lib/analytics";
import {
  trackActionEvent,
  trackClick,
  trackCriteoWalletClick,
  trackCriteoWalletTransactionClick,
  trackLinkClick,
} from "@/lib/track";
import {
  cn,
  isInMaintenanceTime,
  isMobileViewport,
  maintenanceEndTime,
  maintenanceNetworks,
  maintenanceStartTime,
} from "@/lib/utils";
import { Speaker } from "@/app/icons/Speaker";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLotteryBanner } from "@/app/data/lottery";
import { Trophy } from "@/app/icons/Trophy";
import { Menu as IconMenu } from "@/app/icons/Menu";
import { Close as IconClose } from "@/app/icons/Close";
import { usePathname } from "next/navigation";
import { NetworkSwitch } from "./NetworkSwitch";
import { useWhitelistModal } from "@/app/store/tutorials";
import { networks } from "@/app/data/config";

export const menu: any[] = [
  {
    name: "Task Center",
    link: {
      devnet: "/task",
      testnet: "/task",
    },
    target: "_self",
  },
  {
    name: "Faucet",
    link: {
      devnet: "https://faucet.sonic.game/#/",
      testnet: "https://faucet.sonic.game/#/?network=testnet",
    },
    target: "_blank",
  },
  {
    name: "Odyssey Guide",
    link: {
      devnet: "https://blog.sonic.game/sonic-testnet-odyssey-guide",
      testnet: "https://blog.sonic.game/sonic-testnet---frontier-odyssey-guide",
    },
    target: "_blank",
  },
  {
    name: "About Sonic",
    link: {
      devnet: "https://sonic.game/",
      testnet: "https://sonic.game/",
    },
    target: "_blank",
  },
];

export function Header() {
  const pathname = usePathname();
  const hasFrontieCookie = hasCookie("experiment-cookie-frontier");
  const { isInMaintenance, setInMaintenance } = useSystemInfo();
  const { isOpen, onOpen, setSwitching } = useWalletModal();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const { address, token, setToken } = useAccountInfo();
  const { isOpen: isOpenLotteryBar, onOpen: onOpenLotteryBar } =
    useLotteryBar();
  const {
    isOpen: isOpenNotificationBar,
    onOpen: onOpenNotificationBar,
    onClose: onCloseNotificationBar,
  } = useNotificationBar();
  const { lotterySeason } = useLotteryInfo();
  const { networkId } = useNetworkInfo();

  const [bannerMessage, setBannerMessage] = useState<any>({});
  const [showMenu, setShowMenu] = useState(false);

  // const { data: dataWinnerBanner } = useQuery({
  //   queryKey: ["queryLotteryBanner", address],
  //   queryFn: () => getLotteryBanner({ token, networkId }),
  //   enabled: !!address && !!token,
  //   refetchInterval: 30 * 60 * 1000,
  // });

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
    if (isInMaintenance) {
      return;
    }

    setSwitching(false);
    !publicKey && onOpen();

    // ga4
    trackClick({ text: "Connect Wallet" });

    // ttq code part
    openWalletStatics();
    trackCriteoWalletClick();
    trackCriteoWalletTransactionClick();
  };

  const handleClickMenu = (event: any) => {
    setShowMenu(false);
    trackLinkClick(event);
  };

  const getNetworkNamesById = (ids: string[]): string[] => {
    const names: string[] = [];

    ids.forEach((id) => {
      const network = networks.find((network) => network.id === id);
      if (network) {
        names.push(network.name);
      }
    });

    return names;
  };

  // useEffect(() => {
  //   if (dataWinnerBanner?.data?.wallet) {
  //     setBannerMessage(dataWinnerBanner.data);
  //     onOpenLotteryBar();
  //   }
  // }, [dataWinnerBanner]);

  useEffect(() => {
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

  useEffect(() => {
    if (isInMaintenanceTime(networkId)) {
      setInMaintenance(true);
      onOpenNotificationBar();
    } else {
      setInMaintenance(false);
      onCloseNotificationBar();
    }
  }, [networkId]);

  return (
    <nav className="flex flex-col w-full sticky sticky:backdrop-blur-[35px] top-0 z-30">
      <div className="h-16 md:h-20 flex items-center justify-between p-4 md:px-10 md:py-4 bg-[#111111] w-full transition-all duration-300">
        {/* left */}
        <div className="flex items-center gap-3 md:gap-6 2xl:gap-8">
          {/* logo */}
          <Link href="/" className="inline-flex flex-row items-center gap-2">
            <img
              alt="Sonic Logo"
              className="min-w-7 md:min-w-8 w-7 md:w-6 2xl:w-8 h-auto"
              src="/sonic.png"
            />
            <span className="hidden md:inline text-white text-[22px] font-bold font-orbitron tracking-widest">
              SONIC
            </span>
          </Link>

          {/* menu */}
          <span
            className="w-full inline-flex md:hidden cursor-pointer"
            onClick={() => setShowMenu(true)}
          >
            <IconMenu color="white" />
          </span>

          {/* nav */}
          <div
            className={cn(
              "flex flex-col md:flex-row fixed items-center md:static top-0 right-0 bottom-0 left-0 m-auto z-30 bg-[#111] w-full h-full md:w-auto md:h-auto duration-300 transition-transform",
              showMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}
          >
            <div className="w-full flex md:hidden p-4 justify-between items-center border-b border-solid border-white/10">
              <span className="text-[#666] text-base font-orbitron font-semibold">
                Menu
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setShowMenu(false)}
              >
                <IconClose width={24} height={24} color="#4D4D4D" />
              </span>
            </div>

            {/* switch network */}
            {!hasFrontieCookie && (
              <div className="w-full md:w-auto p-4 md:p-0">
                <NetworkSwitch />
              </div>
            )}

            {/* spliter */}
            <i
              className={cn(
                "hidden md:inline-flex h-4 w-[1px] border-solid border-white/20 md:mx-6 2xl:mx-8",
                !hasFrontieCookie ? "border-r" : "border-none"
              )}
            ></i>

            <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center md:gap-6 2xl:gap-8">
              {menu.map((menuItem, menuIndex) => (
                <Link
                  className={cn(
                    "gap-12 text-sm 2xl:text-base text-white hover:text-[#FBB042] font-semibold font-orbitron transition-colors px-4 py-5 md:px-0 md:py-0",
                    pathname.startsWith("/task") && menuItem.link === "/task"
                      ? "text-[#FBB042]"
                      : ""
                  )}
                  href={menuItem.link[networkId || "devnet"]}
                  key={menuIndex}
                  target={menuItem.target}
                  onClick={handleClickMenu}
                >
                  {menuItem.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="gap-6 md:gap-8 flex items-center">
          {address && token ? <RingPopover /> : null}

          {address && token ? <Notification /> : null}

          {!publicKey ? (
            <Button
              className={cn(
                "min-w-[90px] h-8 md:min-w-[200px] md:h-12 justify-center items-center bg-[#0000FF] font-orbitron font-bold text-white text-sm md:text-base transition-all duration-300",
                isInMaintenance
                  ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                  : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 cursor-pointer"
              )}
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
          <div className="inline-flex justify-center gap-2 text-base text-[#48BBFF] font-semibold py-3">
            <Speaker
              width={24}
              height={24}
              color="#48BBFF"
              className="min-w-6 min-h-6"
            />
            <span className="inline-flex w-full max-w-[718px] whitespace-nowrap overflow-hidden">
              {/* upgrade */}
              {/* <div className="pl-[100%] animate-marquee">
                Important Update: Sonic{" "}
                {getNetworkNamesById(maintenanceNetworks).join(" & ")} will
                upgrade on {format(new UTCDate(maintenanceStartTime), "PPP")},
                at {format(new UTCDate(maintenanceStartTime), "h a")} UTC, for{" "}
                {formatDistance(
                  new UTCDate(maintenanceStartTime),
                  new UTCDate(maintenanceEndTime)
                )}
                . Some tasks and on-chain interactions will be paused. Thank you
                for understanding.
              </div> */}
              {/* maintenance */}
              <div className="pl-[100%] animate-marquee">
                Important Update: Sonic{" "}
                {getNetworkNamesById(maintenanceNetworks).join(" & ")} will
                undergo maintenance on{" "}
                {format(new UTCDate(maintenanceStartTime), "PPP")}, at{" "}
                {format(new UTCDate(maintenanceStartTime), "h a")} UTC. Some
                tasks and on-chain interactions will be paused. Thank you for
                understanding.
              </div>
            </span>
          </div>
        </NotificationBar>
      )}

      {/* notification bar */}
      {!isInMaintenance && isOpenLotteryBar && (
        <NotificationBar className="bg-[#00063C] min-h-12 h-auto px-3">
          <div className="w-full inline-flex flex-row justify-center items-center gap-1 text-center text-base text-[#48BBFF] font-semibold py-3">
            <Trophy
              width={24}
              height={24}
              color="#48BBFF"
              className="min-w-6 min-h-6"
            />
            <span className="inline-flex w-full whitespace-nowrap overflow-hidden">
              Congratulations! Address {formatAddress(bannerMessage?.wallet)}{" "}
              has won an additional {bannerMessage?.amount}{" "}
              {bannerMessage?.amount === 1 ? "ring" : "rings"} reward in the{" "}
              <a href="/task/ring-lottery" className="underline mx-1">
                ring lottery
              </a>{" "}
              about{" "}
              {formatDistance(new Date(bannerMessage.date), new UTCDate(), {
                addSuffix: true,
              })}
              !
            </span>
          </div>
        </NotificationBar>
      )}
    </nav>
  );
}

"use client";

import { UTCDate } from "@date-fns/utc";
import { useWallet } from "@solana/wallet-adapter-react";
import { getCookie } from "cookies-next";
import { format, formatDistance } from "date-fns";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  getFaucetUrl,
  GUIDE_URL,
  NetworkId,
  networks
} from "@/app/data/config";
import { useBreakpoint } from "@/app/hooks";
import { Close as IconClose } from "@/app/icons/Close";
import { Menu as IconMenu } from "@/app/icons/Menu";
import { Speaker } from "@/app/icons/Speaker";
import { Trophy } from "@/app/icons/Trophy";
import { useLotteryBar, useLotteryInfo } from "@/app/store/lottery";
import { openWalletStatics } from "@/lib/analytics";
import {
  trackActionEvent,
  trackClick,
  trackCriteoWalletClick,
  trackCriteoWalletTransactionClick,
  trackLinkClick
} from "@/lib/track";
import {
  changeNetwork,
  cn,
  isInMaintenanceTime,
  maintenanceNetworks,
  maintenanceStartTime
} from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  formatAddress,
  useAccountInfo,
  useNetworkInfo,
  useNotificationBar,
  useSystemInfo,
  useWalletModal
} from "../../store/account";
import { NetworkSwitch } from "./NetworkSwitch";
import Notification from "./Notification";
import { NotificationBar } from "./NotificationBar";
import RingPopover from "./RingPopover";
import { UserDropdown } from "./UserDropdown";

export const menu: any[] = [
  {
    name: "Task Center",
    getLink: () => "/task",
    target: "_self"
  },
  {
    name: "Faucet",
    getLink: () => getFaucetUrl(),
    target: "_blank"
  },
  {
    name: "Guide",
    getLink: () => GUIDE_URL,
    target: "_blank"
  },
  {
    name: "About",
    getLink: () => "https://sonic.game/",
    target: "_blank"
  }
];

const NETWORK_COOKIE_NAME = "experiment-cookie-frontier";

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { wallet } = useWallet();

  const networkCookieSearch = searchParams.get("experiment");
  const isMobile = useBreakpoint() === "mobile";
  const networkCookie = getCookie(NETWORK_COOKIE_NAME);
  const { isInMaintenance, setInMaintenance } = useSystemInfo();
  const { isOpen, onOpen, setSwitching } = useWalletModal();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const { address, token, setToken } = useAccountInfo();
  const { isOpen: isOpenLotteryBar, onOpen: onOpenLotteryBar } =
    useLotteryBar();
  const {
    isOpen: isOpenNotificationBar,
    onOpen: onOpenNotificationBar,
    onClose: onCloseNotificationBar
  } = useNotificationBar();
  const { lotterySeason } = useLotteryInfo();
  const { networkId, visitedNetworkId, setVisitedNetworkId } = useNetworkInfo();

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
  useEffect(() => {
    if (token && wallet) {
      console.log("changeNetwork", wallet, token);
      changeNetwork(wallet);
    }
  }, [token, wallet]);

  useEffect(() => {
    try {
      const page_name = document.title;
      const entry_page = window.location.href;

      trackActionEvent("pageLoad", {
        page_name,
        entry_time: new Date(),
        entry_page
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
    if (!visitedNetworkId) {
      setVisitedNetworkId(networkId);
    }
  }, [networkId]);

  return (
    <div className="bg-black w-full sticky sticky:backdrop-blur-[35px] top-0 z-30">
      <nav className="flex mx-auto flex-col w-full">
        <div className="h-16 md:h-20 flex items-center justify-between p-4 md:px-10 md:py-4 bg-black w-full transition-all duration-300">
          {/* left */}
          <div className="flex items-center gap-3 md:gap-8">
            {/* logo */}
            <Link href="/" className="inline-flex flex-row items-center gap-2">
              <img
                alt="Sonic Logo"
                className="size-8 min-w-8"
                src="/sonic.png"
              />
              <span className="hidden md:inline text-white text-[22px] font-bold font-orbitron tracking-widest">
                SONIC
              </span>
            </Link>

            {/* menu */}
            <span
              className="size-8 inline-flex md:hidden cursor-pointer"
              onClick={() => setShowMenu(true)}
            >
              <IconMenu color="white" />
            </span>

            {/* nav */}
            <div
              className={cn(
                "flex flex-col md:flex-row md:gap-8 bg-black fixed items-center md:static inset-0 m-auto z-30 size-full md:w-auto md:h-auto duration-300 transition-transform",
                showMenu
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              )}
            >
              <div className="w-full flex md:hidden p-4 justify-between items-center">
                <span className="font-orbitron sonic-title2 text-tertary">
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
              <NetworkSwitch />

              {/* spliter */}
              <div className="w-px h-4 bg-white/20 hidden md:block"></div>

              <div className="w-full px-4 md:px-0 md:w-auto flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-8 font-orbitron">
                {menu.map((menuItem, menuIndex) => (
                  <Link
                    className={cn(
                      "flex items-center w-full md:w-fit !sonic-title3 text-primary transition-colors h-16"
                    )}
                    href={menuItem.getLink(networkId)}
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
          <div className="gap-6 md:gap-10 flex items-center">
            {address && token ? <RingPopover /> : null}

            {address && token ? <Notification /> : null}

            {!publicKey ? (
              <Button
                className={cn(
                  "font-orbitron sonic-title3 text-primary",
                  isInMaintenance
                    ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                    : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 cursor-pointer"
                )}
                variant={"primary"}
                size={isMobile ? "sm" : "md"}
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
                {/* <div className="pl-[100%] animate-marquee">
                Sonic Devnet upgrade in progress due to upcoming{" "}
                <a href="https://www.nodpad.ai/" className="underline mx-1">
                  Node Sale
                </a>
                traffic. Expected to be completed by the end of the raffle sale.
                Some tasks will be temporarily unavailable.
              </div> */}
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
                  addSuffix: true
                })}
                !
              </span>
            </div>
          </NotificationBar>
        )}

        {/* news notification bar */}
        {/* {isInWalletCampaignTime(networkId) && (
        <NotificationBar className="bg-[#00063C] min-h-12 h-auto px-3">
          <div className="w-full inline-flex justify-center gap-2 text-base text-[#48BBFF] font-semibold py-3">
            <Speaker
              width={24}
              height={24}
              color="#48BBFF"
              className="min-w-6 min-h-6"
            />
            <span className="inline-flex whitespace-nowrap overflow-hidden">
              <div className="">
                {`Sonic<>OKX Web3 Campaign is live now! Check`}{" "}
                <a
                  href="https://www.okx.com/web3/campaigns/sonicadventures"
                  target="_blank"
                  className="underline"
                >
                  here
                </a>
                .
              </div>
            </span>
          </div>
        </NotificationBar>
      )} */}
      </nav>
    </div>
  );
}

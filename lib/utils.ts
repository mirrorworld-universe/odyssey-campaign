import { NetworkId, networks } from "@/app/data/config";
import { WalletList } from "@/app/wallet/wallet-list";
import { UTCDate } from "@date-fns/utc";
import { Wallet } from "@solana/wallet-adapter-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const MAX_MOBILE_WIDTH = 786;
const DIALOGUE_FEATURES = {
  toolbar: "no",
  location: "no",
  status: "no",
  menubar: "no",
  scrollbars: "yes",
  resizable: "yes",
};

const DEFAULT_SIZE = {
  width: 500,
  height: 434,
  top: 224,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openPopup = (
  url: string = "",
  name: string = "",
  windowFeatures: string = ""
) => {
  // Open the popup and set the opener and referrer policy instruction
  const newWindow = window.open(
    url,
    name,
    `noopener,noreferrer,${windowFeatures}`
  );
  // Reset the opener link
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const openDialoguePopup = (
  url: string,
  size?: {
    width?: number;
    height?: number;
    top?: number;
    left?: number;
  }
) => {
  const targetSize = {
    ...DEFAULT_SIZE,
    ...(size || {}),
  };

  const { width } = targetSize;
  const left = (window.screen.width - width) / 2.0;
  const widowWidth = window.innerWidth;

  if (widowWidth >= MAX_MOBILE_WIDTH) {
    openPopup(
      url,
      "targetWindow",
      Object.entries({ ...DIALOGUE_FEATURES, ...targetSize, left })
        .map(([key, value]) => `${key}=${value}`)
        .join(", ")
    );
  } else {
    openPopup(url, "_blank");
  }
};

export const prettyNumber = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

export const getNetworkUrl = (networkId: any) => {
  const currentNetwork = networks.find(
    (item: any) => item.id === networkId
  ) || {
    url: "",
  };
  return currentNetwork.url;
};

export const maintenanceStartTime = "2025-02-17T10:00:00+08:00";
export const maintenanceEndTime = "2025-02-18T01:00:00+08:00";
export const maintenanceNetworks = ["testnetv1"];
export const showInAdcance = false;

export const isInMaintenanceTime = (networkId = "testnetv1") => {
  const isMaintenanceNetwork = maintenanceNetworks.indexOf(networkId) > -1;
  const now = new UTCDate();
  const startTime = new UTCDate(maintenanceStartTime);
  const endTime = new UTCDate(maintenanceEndTime);
  return (
    showInAdcance ||
    (now >= startTime && now <= endTime && isMaintenanceNetwork)
  );
};

export const isMobileViewport = () => {
  if (typeof window === "undefined") {
    return false;
  }

  var viewportWidth = Math.max(
    document?.documentElement.clientWidth,
    window?.innerWidth || 0
  );
  return viewportWidth <= 768;
};

export const isMobileDevice = () => {
  const userAgent = navigator?.userAgent || "";
  return /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|iemobile|mobile/i.test(
    userAgent
  );
};

export const walletCampaignStartTime = "2024-11-08T10:00:00+08:00";
export const walletCampaignEndTime = "2024-12-15T09:00:00+00:00";
export const walletCampaignNetworks = [NetworkId.FrontierV1];

export const isInWalletCampaignTime = (networkId: any = "devnet") => {
  const isWalletCampaignNetwork =
    walletCampaignNetworks.indexOf(networkId) > -1;
  const now = new UTCDate();
  const startTime = new UTCDate(walletCampaignStartTime);
  const endTime = new UTCDate(walletCampaignEndTime);
  return now >= startTime && now <= endTime && isWalletCampaignNetwork;
};

export const hasExtraWalletBonus = (
  wallet: Wallet | null,
  networkId = "devnet"
) => {
  return (
    WalletList.find(
      (currentWallet: any) => currentWallet.name === wallet?.adapter.name
    )?.hasExtraBonus &&
    WalletList.find(
      (currentWallet: any) => currentWallet.name === wallet?.adapter.name
    )?.hasExtraBonus[networkId]
  );
};

export const lotteryCampaignStartTime = "2024-09-12T10:00:00+08:00";
export const lotteryCampaignEndTime = "2024-10-30T10:00:00+08:00";
export const lotteryCampaignNetworks = ["devnet"];

export const isInLotteryCampaignTime = (networkId = "devnet") => {
  const isLotteryCampaignNetwork =
    lotteryCampaignNetworks.indexOf(networkId) > -1;
  const now = new UTCDate();
  const startTime = new UTCDate(lotteryCampaignStartTime);
  const endTime = new UTCDate(lotteryCampaignEndTime);
  return now >= startTime && now <= endTime && isLotteryCampaignNetwork;
};

declare global {
  interface Window {
    nightly?: any;
  }
}

export function changeNetwork(wallet?: Wallet) {
  if (wallet?.adapter.name === "Nightly") {
    return window.nightly?.solana?.changeNetwork({
      genesisHash: "E8nY8PG8PEdzANRsv91C2w28Dbw9w3AhLqRYfn5tNv2C",
      url: "",
    });
  }
}

import { networks } from "@/app/data/config";
import { UTCDate } from "@date-fns/utc";
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

export const maintenanceStartTime = "2024-07-25T16:00:00+08:00";

export const maintenanceEndTime = "2024-07-25T18:00:00+08:00";

export const maintenanceNetworks = ["devnet", "testnet"];

export const showInAdcance = false;

export const isInMaintenanceTime = (networkId = "devnet") => {
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

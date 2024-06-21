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

export function UTC8Date(timeString: string) {
  let time = !timeString ? new Date() : new Date(timeString);
  if (time.toString() === "Invalid Date") {
    time = new Date();
  }
  const timezoneOffset = 8;
  const utc = time.getTime() + time.getTimezoneOffset() * 60000;
  const UTC8Date = new Date(utc + timezoneOffset * 60 * 60 * 1000);
  return UTC8Date;
}

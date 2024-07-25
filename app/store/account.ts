import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSystemInfo = create<{
  isInMaintenance: boolean;
  setInMaintenance: (isInMaintenance: boolean) => void;
}>((set) => ({
  isInMaintenance: false,
  setInMaintenance: (isInMaintenance: boolean) => {
    set({
      isInMaintenance,
    });
  },
}));

export const useNetworkInfo = create(
  persist<{
    networkId: string;
    setNetworkId: (networkId: string) => void;
  }>(
    (set, get) => ({
      networkId: get()?.networkId,
      setNetworkId: (networkId: string) => {
        set({
          networkId,
        });
      },
    }),
    {
      name: "sonic-network-info",
    }
  )
);

export const useNotificationBar = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true,
    });
  },
  onClose: () => {
    set({
      isOpen: false,
    });
  },
}));

export const useWalletModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isSwitching: boolean;
  setSwitching: (isSwitching: boolean) => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true,
    });
  },
  onClose: () => {
    set({
      isOpen: false,
    });
  },

  isSwitching: false,
  setSwitching: (isSwitching: boolean) => {
    set({
      isSwitching,
    });
  },
}));

export const useAccountInfo = create(
  persist<{
    address: string;
    setAddress: (address: string) => void;
    token: string;
    setToken: (token: string) => void;
    signature: string;
    setSignature: (signature: string) => void;
    hasNews: boolean;
    setNews: (hasNews: boolean) => void;
    isInWhitelist: boolean;
    setIsInWhitelist: (isInWhitelist: boolean) => void;
    reset: () => void;
  }>(
    (set, get) => ({
      address: get()?.address,
      setAddress: (address: string) => {
        set({
          address,
        });
      },

      token: get()?.token,
      setToken: (token: string) => {
        set({
          token,
        });
      },

      signature: get()?.signature,
      setSignature: (signature: string) => {
        set({
          signature,
        });
      },

      hasNews: get()?.hasNews,
      setNews: (hasNews: boolean) => {
        set({
          hasNews,
        });
      },

      isInWhitelist: get()?.isInWhitelist,
      setIsInWhitelist: (isInWhitelist: boolean) => {
        set({
          isInWhitelist,
        });
      },

      reset: () => {
        set({
          address: undefined,
          token: undefined,
          hasNews: false,
          isInWhitelist: false,
        });
      },
    }),
    {
      name: "sonic-account-info",
    }
  )
);

export function formatAddress(address?: string, length = 4) {
  if (!address) return null;
  return `${address.substring(0, length)}…${address.substring(
    address.length - length,
    address.length
  )}`;
}

export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

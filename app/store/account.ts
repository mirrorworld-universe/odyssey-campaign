import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSystemInfo = create<{
  isInMaintenance: boolean;
  setInMaintenance: () => void;
}>((set) => ({
  isInMaintenance: false,
  setInMaintenance: () => {
    set({
      isInMaintenance: true,
    });
  },
}));

export const useNetworkInfo = create(
  persist<{
    network: string;
    setNetwork: (network: string) => void;
  }>(
    (set, get) => ({
      network: get()?.network,
      setNetwork: (network: string) => {
        set({
          network,
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

export const useAccountInfo = create(
  persist<{
    address: string;
    setAddress: (address: string) => void;
    token: string;
    setToken: (token: string) => void;
    hasNews: boolean;
    setNews: (hasNews: boolean) => void;
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

      hasNews: get()?.hasNews,
      setNews: (hasNews: boolean) => {
        set({
          hasNews,
        });
      },

      reset: () => {
        set({
          address: undefined,
          token: undefined,
          hasNews: false,
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

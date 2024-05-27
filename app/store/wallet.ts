import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWalletModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  from: string;
  setFrom: (from: string) => void;
}>((set) => ({
  isOpen: false,
  from: "",
  setFrom: (from: string) => {
    set({
      from,
    });
  },
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

export const useWalletInfo = create(
  persist<{
    address: string;
    setAddress: (address: string) => void;
    reset: () => void;
  }>(
    (set, get) => ({
      address: get()?.address,
      setAddress: (address: string) => {
        set({
          address,
        });
      },
      reset: () => {
        set({
          address: undefined,
        });
      },
    }),
    {
      name: "world-hub-action-wallet-info",
    }
  )
);

export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

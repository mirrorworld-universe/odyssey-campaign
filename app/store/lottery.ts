import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLotteryBar = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: true,
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

export const useLotteryInfo = create(
  persist<{
    lotteryRewardsAmount: number;
    setLotteryRewardsAmount: (lotteryRewardsAmount: number) => void;
    reset: () => void;
  }>(
    (set, get) => ({
      lotteryRewardsAmount: get()?.lotteryRewardsAmount,
      setLotteryRewardsAmount: (lotteryRewardsAmount: number) => {
        set({
          lotteryRewardsAmount,
        });
      },

      reset: () => {
        set({
          lotteryRewardsAmount: 0,
        });
      },
    }),
    {
      name: "sonic-mysterybox-info",
    }
  )
);

export const useDrawConfirmModal = create<{
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

export const useDrawRecordModal = create<{
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

export const useDrawResultModal = create<{
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

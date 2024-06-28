import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLotteryBar = create<{
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

export const useLotteryInfo = create(
  persist<{
    lotterySeason: number;
    setLotterySeason: (lotterySeason: number) => void;
    lotteryDrawPrice: number;
    setLotteryDrawPrice: (lotteryDrawPrice: number) => void;
    lotteryDrawAmount: number;
    setLotteryDrawAmount: (lotteryDrawAmount: number) => void;
    lotteryRewardsAmount: number;
    setLotteryRewardsAmount: (lotteryRewardsAmount: number) => void;
    lotteryExtraRewardsAmount: number;
    setLotteryExtraRewardsAmount: (lotteryExtraRewardsAmount: number) => void;
    reset: () => void;
  }>(
    (set, get) => ({
      lotterySeason: get()?.lotterySeason,
      setLotterySeason: (lotterySeason: number) => {
        set({
          lotterySeason,
        });
      },

      lotteryDrawPrice: get()?.lotteryDrawPrice,
      setLotteryDrawPrice: (lotteryDrawPrice: number) => {
        set({
          lotteryDrawPrice,
        });
      },

      lotteryDrawAmount: get()?.lotteryDrawAmount,
      setLotteryDrawAmount: (lotteryDrawAmount: number) => {
        set({
          lotteryDrawAmount,
        });
      },

      lotteryRewardsAmount: get()?.lotteryRewardsAmount,
      setLotteryRewardsAmount: (lotteryRewardsAmount: number) => {
        set({
          lotteryRewardsAmount,
        });
      },

      lotteryExtraRewardsAmount: get()?.lotteryExtraRewardsAmount,
      setLotteryExtraRewardsAmount: (lotteryExtraRewardsAmount: number) => {
        set({
          lotteryExtraRewardsAmount,
        });
      },

      reset: () => {
        set({
          lotteryRewardsAmount: 0,
          lotteryExtraRewardsAmount: 0,
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

export const useLotteryPriceTableModal = create<{
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

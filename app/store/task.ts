import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TaskStatus {
  [taskId: string]: "" | "done";
}

export interface UserTaskStatus {
  [address: string]: TaskStatus;
}

export const useTaskInfo = create(
  persist<{
    address: string;
    setAddress: (address: string) => void;
    status: UserTaskStatus;
    setStatus: (taskId: string, status: "" | "done") => void;
    reset: () => void;
  }>(
    (set, get) => ({
      address: get()?.address,
      setAddress: (address: string) => {
        set({
          address,
        });
      },

      status: get()?.status,
      setStatus: (taskId: string, status: "" | "done") => {
        set({
          status: {
            [get()?.address]: {
              [taskId]: status,
            },
          },
        });
      },

      reset: () => {
        set({
          address: undefined,
        });
      },
    }),
    {
      name: "sonic-task-info",
    }
  )
);

export const useMysteryBoxInfo = create(
  persist<{
    mysteryBoxAmount: number;
    setMysteryBoxAmount: (mysteryBoxAmount: number) => void;
    mysteryBoxRewardsAmount: number;
    setMysteryBoxRewardsAmount: (mysteryBoxRewardsAmount: number) => void;
    mysteryBoxOpenAmount: number;
    setMysteryBoxOpenAmount: (mysteryBoxOpenAmount: number) => void;
    reset: () => void;
  }>(
    (set, get) => ({
      mysteryBoxAmount: get()?.mysteryBoxAmount,
      setMysteryBoxAmount: (mysteryBoxAmount: number) => {
        set({
          mysteryBoxAmount,
        });
      },

      mysteryBoxRewardsAmount: get()?.mysteryBoxRewardsAmount,
      setMysteryBoxRewardsAmount: (mysteryBoxRewardsAmount: number) => {
        set({
          mysteryBoxRewardsAmount,
        });
      },

      mysteryBoxOpenAmount: get()?.mysteryBoxOpenAmount,
      setMysteryBoxOpenAmount: (mysteryBoxOpenAmount: number) => {
        set({
          mysteryBoxOpenAmount,
        });
      },

      reset: () => {
        set({
          mysteryBoxAmount: 0,
        });
      },
    }),
    {
      name: "sonic-mysterybox-info",
    }
  )
);

export const useMysteryBoxConfirmModal = create<{
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

export const useMysteryBoxRecordModal = create<{
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

export const useMysteryBoxResultModal = create<{
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

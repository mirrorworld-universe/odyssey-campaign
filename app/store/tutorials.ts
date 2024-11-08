import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWelcomeModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true
    });
  },
  onClose: () => {
    set({
      isOpen: false
    });
  }
}));

export const useWhitelistModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true
    });
  },
  onClose: () => {
    set({
      isOpen: false
    });
  }
}));

export const useSwitchNetworkModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true
    });
  },
  onClose: () => {
    set({
      isOpen: false
    });
  }
}));

export const useSetUpNetworkModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true
    });
  },
  onClose: () => {
    set({
      isOpen: false
    });
  }
}));

export const useSetUpFinishModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true
    });
  },
  onClose: () => {
    set({
      isOpen: false
    });
  }
}));

export const useMoreWalletModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true
    });
  },
  onClose: () => {
    set({
      isOpen: false
    });
  }
}));

export const useHowToPlayModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true
    });
  },
  onClose: () => {
    set({
      isOpen: false
    });
  }
}));

export const useFAQModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true
    });
  },
  onClose: () => {
    set({
      isOpen: false
    });
  }
}));

export const useSetupInfo = create(
  persist<{
    status: any;
    setStatus: (status: any) => void;
  }>(
    (set, get) => ({
      status: get()?.status,
      setStatus: (status: any) => {
        set({
          status
        });
      }
    }),
    {
      name: "sonic-setup-info"
    }
  )
);

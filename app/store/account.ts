import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAccountModal = create<{
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

export interface RewardInfo {
  user_id: number;
  total_amount: string;
  rank: number;
  total_usd_amount: number;
}

export interface AuthorizedWallet {
  chainName: "evm" | "sol";
  walletName: string;
  address: string;
}

export const useWalletInfo = create(
  persist<{
    address?: string;
    setAddress: (address: string) => void;
    email: string;
    setEmail: (email: string) => void;
    rewardInfo: RewardInfo;
    setRewardInfo: (val: RewardInfo) => void;
    reset: () => void;
    authorizedWallet?: AuthorizedWallet;
    setAuthorizedWallet: (wallet: AuthorizedWallet) => void;
  }>(
    (set, get) => ({
      address: get()?.address,
      setAddress: (address: string) => {
        set({
          address,
        });
      },
      email: get()?.email || "",
      setEmail: (email: string) => {
        set({
          email,
        });
      },
      rewardInfo: get()?.rewardInfo || {},
      setRewardInfo: (rewardInfo: RewardInfo) => {
        set({
          rewardInfo,
        });
      },
      reset: () => {
        set({
          rewardInfo: {} as RewardInfo,
          address: undefined,
          email: "",
          authorizedWallet: undefined,
        });
      },
      authorizedWallet: get()?.authorizedWallet,
      setAuthorizedWallet: (wallet: AuthorizedWallet) => {
        set({
          authorizedWallet: wallet,
        });
      },
    }),
    {
      name: "world-hub-wallet-info",
    }
  )
);

export function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}

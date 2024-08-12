import {
  PhantomWalletAdapter,
  NightlyWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "./backpack-adapter";
import { OKXWalletAdapter } from "./okx-adapter";

import { OKX as IconOKX } from "@/app/icons/OKX";
import { Backpack as IconBackpack } from "@/app/icons/Backpack";

export const WalletList: any[] = [
  {
    id: "okx",
    name: "OKX Wallet",
    isSupportSonic: true,
    hasExtraBonus: {
      devnet: true,
      testnet: false,
    },
    adapter: new OKXWalletAdapter(),
    hide: false,
  },
  {
    id: "backpack",
    name: "Backpack",
    isSupportSonic: true,
    hasExtraBonus: {
      devnet: true,
      testnet: false,
    },
    adapter: new BackpackWalletAdapter(),
    hide: false,
  },
  {
    id: "nightly",
    name: "Nightly",
    isSupportSonic: true,
    adapter: new NightlyWalletAdapter(),
    hide: false,
  },
  {
    id: "phantom",
    name: "Phantom",
    isSupportSonic: false,
    adapter: new PhantomWalletAdapter(),
    hide: true,
  },
  {
    id: "solflare",
    name: "Solflare",
    isSupportSonic: false,
    adapter: new SolflareWalletAdapter(),
    hide: true,
  },
];

export const setUpUrls: any = {
  ["okx wallet"]: {
    devnet:
      "https://blog.sonic.game/sonic-origin-network-settings---okx-wallet",
    testnet:
      "https://blog.sonic.game/sonic-origin-network-settings---okx-wallet",
  },
  nightly: {
    devnet: "https://blog.sonic.game/sonic-network-settings---nightly-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-network-settings---nightly-wallet",
  },
  backpack: {
    devnet: "https://blog.sonic.game/sonic-network-settings---backpack-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-network-settings---backpack-wallet",
  },
};

export const isSupportSonic = (walletName: string | undefined) => {
  if (!walletName) {
    return false;
  }
  return WalletList.find(
    (wallet: any) => wallet.name.toLowerCase() === walletName.toLowerCase()
  ).isSupportSonic;
};

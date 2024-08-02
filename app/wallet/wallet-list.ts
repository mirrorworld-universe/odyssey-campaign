import {
  PhantomWalletAdapter,
  NightlyWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "./backpack-adapter";
import { OKXWalletAdapter } from "./okx-adapter";

export const WalletList: any = [
  {
    name: "Backpack",
    isSupportSonic: true,
    adapter: new BackpackWalletAdapter(),
    hide: false,
  },
  {
    name: "Nightly",
    isSupportSonic: true,
    adapter: new NightlyWalletAdapter(),
    hide: false,
  },
  {
    name: "OKX Wallet",
    isSupportSonic: false,
    adapter: new OKXWalletAdapter(),
    hide: false,
  },
  {
    name: "Phantom",
    isSupportSonic: false,
    adapter: new PhantomWalletAdapter(),
    hide: false,
  },
  {
    name: "Solflare",
    isSupportSonic: false,
    adapter: new SolflareWalletAdapter(),
    hide: true,
  },
];

export const isSupportSonic = (walletName: string | undefined) => {
  if (!walletName) {
    return false;
  }
  return WalletList.find(
    (wallet: any) => wallet.name.toLowerCase() === walletName.toLowerCase()
  ).isSupportSonic;
};

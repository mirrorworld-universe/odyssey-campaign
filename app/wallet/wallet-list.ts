import {
  PhantomWalletAdapter,
  NightlyWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "./backpack-adapter";
import { OKXWalletAdapter } from "./okx-adapter";

export const WalletList: any = [
  {
    name: "Backpack",
    isSupportSonic: true,
    adapter: new BackpackWalletAdapter(),
  },
  {
    name: "Nightly",
    isSupportSonic: true,
    adapter: new NightlyWalletAdapter(),
  },
  {
    name: "OKX Wallet",
    isSupportSonic: false,
    adapter: new OKXWalletAdapter(),
  },
  {
    name: "Phantom",
    isSupportSonic: false,
    adapter: new PhantomWalletAdapter(),
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

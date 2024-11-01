import {
  PhantomWalletAdapter,
  NightlyWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "./backpack-adapter";
import { OKXWalletAdapter } from "./okx-adapter";
import { GateWalletAdapter } from "./gate-adapter";

import { openPopup } from "@/lib/santinize";
import { BybitWalletAdapter } from "./bybit-adapter";

export const WalletList: any[] = [
  {
    id: "okx",
    name: "OKX Wallet",
    isSupportSonic: true,
    adapter: new OKXWalletAdapter(),
    hide: false,
    getDeepLink: () => {
      const baseUrl = "https://www.okx.com/download?deeplink=";
      const url = `${baseUrl}${encodeURIComponent(
        `okx://wallet/dapp/url?dappUrl=${encodeURIComponent(
          window.location.href
        )}`
      )}`;
      openPopup(url, "_blank");
    }
  },
  {
    id: "backpack",
    name: "Backpack",
    isSupportSonic: true,
    adapter: new BackpackWalletAdapter(),
    hide: false
  },
  {
    id: "nightly",
    name: "Nightly",
    isSupportSonic: true,
    adapter: new NightlyWalletAdapter(),
    hide: false
  },
  {
    id: "gate",
    name: "Gate Wallet",
    isSupportSonic: true,
    adapter: new GateWalletAdapter(),
    network: {
      devnet: true,
      testnet: false
    },
    hide: false
  },
  {
    id: "bybit",
    name: "Bybit Wallet",
    isSupportSonic: true,
    adapter: new BybitWalletAdapter(),
    hasExtraBonus: {
      testnetv1: true
    },
    hide: false
  },

  // {
  //   id: "bitget",
  //   name: "Bitget",
  //   getDeepLink() {
  //     const baseUrl = "https://bkcode.vip?action=dapp&url=";
  //     const url = `${baseUrl}${window.location.href}`;
  //     openPopup(url, "_blank");
  //   },
  // },
  {
    id: "phantom",
    name: "Phantom",
    isSupportSonic: false,
    adapter: new PhantomWalletAdapter(),
    hide: true
  },
  {
    id: "solflare",
    name: "Solflare",
    isSupportSonic: false,
    adapter: new SolflareWalletAdapter(),
    hide: true
  }
];

export const setUpUrls: any = {
  ["okx wallet"]: {
    devnet:
      "https://blog.sonic.game/sonic-origin-network-settings---okx-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-network-settings---okx-wallet"
  },
  nightly: {
    devnet: "https://blog.sonic.game/sonic-network-settings---nightly-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-network-settings---nightly-wallet"
  },
  backpack: {
    devnet: "https://blog.sonic.game/sonic-network-settings---backpack-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-network-settings---backpack-wallet"
  },
  ["gate wallet"]: {
    devnet:
      "https://blog.sonic.game/sonic-origin-network-settings---gate-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-network-settings---gate-wallet"
  }
};

export const isSupportSonic = (walletName: string | undefined) => {
  if (!walletName) {
    return false;
  }
  return WalletList.find(
    (wallet: any) => wallet.name.toLowerCase() === walletName.toLowerCase()
  )?.isSupportSonic;
};

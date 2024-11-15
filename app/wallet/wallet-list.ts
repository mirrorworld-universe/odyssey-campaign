import {
  PhantomWalletAdapter,
  NightlyWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "./backpack-adapter";
import { OKXWalletAdapter } from "./okx-adapter";
import { GateWalletAdapter } from "./gate-adapter";
import { BybitWalletAdapter } from "./bybit-adapter";

import { openPopup } from "@/lib/santinize";
import { NetworkId } from "../data/config";
import { IframeWalletAdapter } from "./iframe-adpater";

export const WalletList: any[] = [
  {
    id: "okx",
    name: "OKX Wallet",
    isSupportSonic: true,
    adapter: new OKXWalletAdapter(),
    hide: false,
    network: {
      [NetworkId.Origin]: true,
      [NetworkId.FrontierV0]: false,
      [NetworkId.FrontierV1]: true,
    },
    getDeepLink: () => {
      const baseUrl = "https://www.okx.com/download?deeplink=";
      const url = `${baseUrl}${encodeURIComponent(
        `okx://wallet/dapp/url?dappUrl=${encodeURIComponent(
          window.location.href
        )}`
      )}`;
      openPopup(url, "_blank");
    },
  },
  {
    id: "backpack",
    name: "Backpack",
    isSupportSonic: true,
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
    id: "gate",
    name: "Gate Wallet",
    isSupportSonic: true,
    adapter: new GateWalletAdapter(),
    network: {
      devnet: true,
      testnet: false,
    },
    hide: false,
  },
  {
    id: "bybit",
    name: "Bybit Wallet",
    isSupportSonic: true,
    adapter: new BybitWalletAdapter(),
    hasExtraBonus: {
      testnetv1: true,
    },
    network: {
      devnet: false,
      testnet: false,
      testnetv1: true,
    },
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
  {
    id: "sonicx",
    name: "SonicX",
    isSupportSonic: true,
    adapter: new IframeWalletAdapter({
      name: "SonicX",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTPzLgf/RAAAA//////////////uvQf////////uwQv///7VwGH5YoP3AIf3XoNiQLYBpgNqgDDtsi5UAAAAKdFJOUwC///+fHFCAYOD27xgaAAAC90lEQVR42u3c7XLaMBBG4RIDxiK2SO//Yktm8+edqots2aaSz/krBufJTrLhK7+IiIiIiIiIiIiI6O31UoPAIAEECBBgW8A+u6X3okDnrrcpZOfeS1kAAQIEWBGwlybp4ZSxCsa56e7YZGYf0qdTeF03tyA1D7xcLm0D7/cbQIDHAU5WPvBhBWmUZgN1W8R4WmNb6OgygFrGzAoH2SZQt0WDQP1RBAiwSaA+fpgNfFhFi8HfFgJceXT5i77brgMBL1azwJ9uAAEC/Hs/NAjU0QEECBAgwH/2SDVaTQC9JwMBAgQIEOA84Gi1C+wsgAABAgS4bE1IDQI1gAABAgQob3FKNFkqq21NLN33AAECBHhwYG9lAOt40ql833cWQIAAAQKcB5ys3WSjtQNQ23t0AAECBFgB0P34hPZl7QaMlgOsdZA6OoAAAQKsCPjebTFaWwLfO8hgHQ44WNcGgTo6gAABOtuiHaAGECBAgAC/05epv6zdtsVoPawtgZ202yCD9WkBBAgQYEXA3tK3MW2xLUbL2w/670CiZcCVRxesVQfpXcj7wD5AgAAB1gAcU3VW4bYYLQXqftgBqHVS4SCDlBzd0YEXq1ngTzeAANsC9lYGcOm20P2g+2gHYLA8YOEggxNAgAAB1g7speRH6Aq3xSQVAjd5WFg4SO19wMt3LQPP92cAAQJ8E7DvT/FZcj8UbgttSvXbyQFuuh+0j+0CCBAgwEaAo6Rnk1QpMEjeGUCAAAEeB6hvcfIWQxKYPFtnW0xWtAS41uiCU8ZNVh0dQIAAAVYATC+GaAVptKLTlCp/P2wCVIReIn3mtHSswToccLCuDQJ1dAABNglMLgb9Qz595hSlYE2vi1IpMH8ucja/kN1d2h04DEPqdPCqCmivJM66/BkgQICv3+l0evXLP8ZT/2wpMGa3ElDTL9u7xFJgfnsCB+kqt0ydpTsPkoPwr15W/lzOZd/R89KZAQQIEOB/DRwSXZ1bXle6kKZXJyIiIiIiooL+AMmNq0Mu7aPNAAAAAElFTkSuQmCC",
    }),
    hide: true,
  },
];

export const setUpUrls: any = {
  ["okx wallet"]: {
    devnet:
      "https://blog.sonic.game/sonic-origin-network-settings---okx-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-network-settings---okx-wallet",
    testnetv1:
      "https://blog.sonic.game/sonic-frontier-v1-network-setting---okx-wallet",
  },
  nightly: {
    devnet: "https://blog.sonic.game/sonic-network-settings---nightly-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-network-settings---nightly-wallet",
    testnetv1:
      "https://blog.sonic.game/sonic-frontier-v1-network-setting---nightly-wallet",
  },
  backpack: {
    devnet: "https://blog.sonic.game/sonic-network-settings---backpack-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-v0-wallet-setting/sonic-frontier-v0-network-setting---backpack-wallet",
    testnetv1:
      "https://blog.sonic.game/sonic-frontier-v1-network-setting---backpack-wallet",
  },
  ["bybit wallet"]: {
    devnet:
      "https://blog.sonic.game/sonic-frontier-v1-network-setting---bybit-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-v1-network-setting---bybit-wallet",
    testnetv1:
      "https://blog.sonic.game/sonic-frontier-v1-network-setting---bybit-wallet",
  },
  ["gate wallet"]: {
    devnet:
      "https://blog.sonic.game/sonic-origin-network-settings---gate-wallet",
    testnet:
      "https://blog.sonic.game/sonic-frontier-network-settings---gate-wallet",
  },
};

export const isSupportSonic = (walletName: string | undefined) => {
  if (!walletName) {
    return false;
  }
  return WalletList.find(
    (wallet: any) => wallet.name.toLowerCase() === walletName.toLowerCase()
  )?.isSupportSonic;
};

export const walletMap = new Map(
  WalletList.map((wallet) => [wallet.name, wallet])
);

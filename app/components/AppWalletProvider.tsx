"use client";

import React, { useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  NightlyWalletAdapter,
} from "@solana/wallet-adapter-wallets";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [network, setNetwork] = useState("https://devnet.sonic.game");
  const network = WalletAdapterNetwork.Devnet;

  const customRpcUrl = "https://devnet.sonic.game";

  const connection = new Connection(customRpcUrl, { commitment: "confirmed" });

  // const endpoint = useMemo(() => clusterApiUrl('https://devnet.sonic.game'), [network]);

  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      // manually add any legacy wallet adapters here
      // new PhantomWalletAdapter(),
      new NightlyWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={customRpcUrl}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

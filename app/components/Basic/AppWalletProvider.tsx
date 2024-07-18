"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { isInMaintenanceTime } from "@/lib/utils";
import { useNetworkInfo } from "@/app/store/account";
import { networks } from "@/app/data/config";

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { network: currentNetwork } = useNetworkInfo();

  const customRpcUrl = "https://devnet.sonic.game";
  const [network, setNetwork] = useState(customRpcUrl);
  // const network = WalletAdapterNetwork.Devnet;

  // const connection = new Connection(customRpcUrl, { commitment: "confirmed" });
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = useMemo(
    () => customRpcUrl,
    [networks.find((network: any) => network.name === currentNetwork).rpc]
  );

  useEffect(() => {
    setNetwork(currentNetwork);
  }, [currentNetwork]);

  useEffect(() => {
    setNetwork(customRpcUrl);
  });

  const wallets = useMemo(
    () => [
      // manually add any legacy wallet adapters here
      new NightlyWalletAdapter(),
      // new PhantomWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={!isInMaintenanceTime()}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

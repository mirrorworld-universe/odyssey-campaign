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
import {
  useAccountInfo,
  useNetworkInfo,
  useWalletModal,
} from "@/app/store/account";
import { networks } from "@/app/data/config";

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { networkId } = useNetworkInfo();

  const defaultRpc = (
    networks.find((network: any) => network.id === networkId) || networks[0]
  ).rpc;
  const [network, setNetwork] = useState(defaultRpc);
  // const network = WalletAdapterNetwork.Devnet;

  // const connection = new Connection(customRpcUrl, { commitment: "confirmed" });
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = useMemo(() => defaultRpc, [defaultRpc]);
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  useEffect(() => {
    if (networkId) {
      setNetwork(networks.find((network: any) => network.id === networkId).rpc);
    }
  }, [networkId]);

  useEffect(() => {
    setNetwork(defaultRpc);
  });

  const wallets = useMemo(
    () => [
      // manually add any legacy wallet adapters here
      // new NightlyWalletAdapter(),
      // new PhantomWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider
      endpoint={endpoint}
      // config={{
      //   commitment: "confirmed",
      //   wsEndpoint: "wss://ws-proxy-staging-api.mirrorworld.fun",
      // }}
    >
      <WalletProvider
        wallets={wallets}
        autoConnect={!isInMaintenanceTime(networkId)}
      >
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

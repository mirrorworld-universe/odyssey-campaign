"use client";

import { DEFAULT_RPC, networkMap } from "@/app/data/config";
import { useNetworkInfo } from "@/app/store/account";
import { isInMaintenanceTime } from "@/lib/utils";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useMemo, useState } from "react";

export default function AppWalletProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { networkId } = useNetworkInfo();

  const [showWalletProvider, setShowWalletProvider] = useState(false);

  const endpoint = useMemo(
    () => networkMap[networkId]?.rpc || DEFAULT_RPC,
    [networkId]
  );

  useEffect(() => {
    // set compatibility with OKX
    setTimeout(() => {
      setShowWalletProvider(true);
    }, 1200);
  });

  const wallets = useMemo(
    () => [
      // manually add any legacy wallet adapters here
      // new NightlyWalletAdapter(),
      // new PhantomWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      {showWalletProvider && (
        <WalletProvider
          wallets={wallets}
          autoConnect={!isInMaintenanceTime(networkId)}
        >
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      )}
    </ConnectionProvider>
  );
}

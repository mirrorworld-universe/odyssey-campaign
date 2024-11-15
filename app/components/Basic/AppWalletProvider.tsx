"use client";

import { DEFAULT_RPC, networkMap } from "@/app/data/config";
import { useNetworkInfo } from "@/app/store/account";
import { IframeWalletAdapter } from "@/app/wallet/iframe-adpater";
import { WalletList } from "@/app/wallet/wallet-list";
import { isInMaintenanceTime } from "@/lib/utils";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useMemo, useState } from "react";

export default function AppWalletProvider({
  children,
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
      ...WalletList.map((wallet) => wallet.adapter),
      // manually add any legacy wallet adapters here
      new IframeWalletAdapter({
        name: "SonicX",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTPzLgf/RAAAA//////////////uvQf////////uwQv///7VwGH5YoP3AIf3XoNiQLYBpgNqgDDtsi5UAAAAKdFJOUwC///+fHFCAYOD27xgaAAAC90lEQVR42u3c7XLaMBBG4RIDxiK2SO//Yktm8+edqots2aaSz/krBufJTrLhK7+IiIiIiIiIiIiI6O31UoPAIAEECBBgW8A+u6X3okDnrrcpZOfeS1kAAQIEWBGwlybp4ZSxCsa56e7YZGYf0qdTeF03tyA1D7xcLm0D7/cbQIDHAU5WPvBhBWmUZgN1W8R4WmNb6OgygFrGzAoH2SZQt0WDQP1RBAiwSaA+fpgNfFhFi8HfFgJceXT5i77brgMBL1azwJ9uAAEC/Hs/NAjU0QEECBAgwH/2SDVaTQC9JwMBAgQIEOA84Gi1C+wsgAABAgS4bE1IDQI1gAABAgQob3FKNFkqq21NLN33AAECBHhwYG9lAOt40ql833cWQIAAAQKcB5ys3WSjtQNQ23t0AAECBFgB0P34hPZl7QaMlgOsdZA6OoAAAQKsCPjebTFaWwLfO8hgHQ44WNcGgTo6gAABOtuiHaAGECBAgAC/05epv6zdtsVoPawtgZ202yCD9WkBBAgQYEXA3tK3MW2xLUbL2w/670CiZcCVRxesVQfpXcj7wD5AgAAB1gAcU3VW4bYYLQXqftgBqHVS4SCDlBzd0YEXq1ngTzeAANsC9lYGcOm20P2g+2gHYLA8YOEggxNAgAAB1g7speRH6Aq3xSQVAjd5WFg4SO19wMt3LQPP92cAAQJ8E7DvT/FZcj8UbgttSvXbyQFuuh+0j+0CCBAgwEaAo6Rnk1QpMEjeGUCAAAEeB6hvcfIWQxKYPFtnW0xWtAS41uiCU8ZNVh0dQIAAAVYATC+GaAVptKLTlCp/P2wCVIReIn3mtHSswToccLCuDQJ1dAABNglMLgb9Qz595hSlYE2vi1IpMH8ucja/kN1d2h04DEPqdPCqCmivJM66/BkgQICv3+l0evXLP8ZT/2wpMGa3ElDTL9u7xFJgfnsCB+kqt0ydpTsPkoPwr15W/lzOZd/R89KZAQQIEOB/DRwSXZ1bXle6kKZXJyIiIiIiooL+AMmNq0Mu7aPNAAAAAElFTkSuQmCC",
      }),

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

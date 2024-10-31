import { createBreakpoint } from "react-use";
import { useNetworkInfo } from "../store/account";
import { useWallet } from "@solana/wallet-adapter-react";
import { MODAL_HASH_MAP } from "./useModalHash";
import { openModalDirectly } from "./useModalHash";

export const useBreakpoint = createBreakpoint({
  mobile: 350,
  laptop: 1024,
  tablet: 768
});

export function useSwitchNetwork() {
  const { networkId, setNetworkId, setSwitchTo } = useNetworkInfo();
  const { connected } = useWallet();

  const handleSwitchNetwork = (network: string) => {
    if (network === networkId) return;
    if (!connected) {
      setNetworkId(network);
    } else {
      setSwitchTo(network);
      openModalDirectly(MODAL_HASH_MAP.switchNetwork);
    }
  };

  return { handleSwitchNetwork };
}

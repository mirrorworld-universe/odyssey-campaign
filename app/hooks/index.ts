import { useWallet } from "@solana/wallet-adapter-react";
import { createBreakpoint } from "react-use";
import { NetworkId } from "../data/config";
import { useAccountInfo, useNetworkInfo } from "../store/account";
import { Task } from "../types/task";
import { isSupportSonic } from "../wallet/wallet-list";
import { MODAL_HASH_MAP, openModalDirectly } from "./useModalHash";

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
      if (network !== NetworkId.FrontierV1) {
        openModalDirectly(MODAL_HASH_MAP.seasonTwo);
      }
    } else {
      setSwitchTo(network);
      if (network !== NetworkId.FrontierV1) {
        openModalDirectly(MODAL_HASH_MAP.seasonTwo);
      } else {
        openModalDirectly(MODAL_HASH_MAP.switchNetwork);
      }
    }
  };

  return { handleSwitchNetwork };
}

export function useTaskUrl() {
  const { networkId } = useNetworkInfo();
  const { wallet } = useWallet();
  const { token } = useAccountInfo();

  function getTaskUrl(task: Task) {
    if (
      networkId === NetworkId.FrontierV1 &&
      isSupportSonic(wallet?.adapter.name) &&
      token
    ) {
      return `/task/${task.id}`;
    }
    return "#";
  }

  return { getTaskUrl };
}

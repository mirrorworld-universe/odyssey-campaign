"use client";

import react, { useState, useEffect } from "react";
import { networks as networkList } from "@/app/data/config";
import {
  useAccountInfo,
  useNetworkInfo,
  useWalletModal,
} from "@/app/store/account";
import { cn } from "@/lib/utils";

export function NetworkSwitch({ className }: any) {
  const { token } = useAccountInfo();
  const { setNetworkId, networkId } = useNetworkInfo();
  const { isOpen, onOpen, setSwitching, isSwitching } = useWalletModal();

  const currentNetworkList = networkList.map((item, index) => {
    if (networkId) {
      return { ...item, active: networkId === item.id };
    } else {
      return { ...item, active: index === 0 };
    }
  });

  const [networks, setNetworks] = useState<any[]>(currentNetworkList);

  const handleSwitchNetwork = (network: any) => {
    if (network.id === networkId) {
      return;
    }

    if (token) {
      setSwitching(true);
      onOpen();
    } else {
      setNetworkId(network.id);
      setNetworks(
        networks.map((item: any) => ({
          ...item,
          active: item.id === network.id,
        }))
      );
    }
  };

  useEffect(() => {
    setNetworks(
      networkList.map((item, index) => {
        if (networkId) {
          return { ...item, active: networkId === item.id };
        } else {
          return { ...item, active: index === 0 };
        }
      })
    );
  }, [networkId]);

  return (
    <div
      className={cn(
        "flex flex-row text-base md:text-xs 2xl:text-sm text-[#00F] font-semibold font-orbitron border border-solid border-[#00F] rounded-[2px] md:rounded",
        className
      )}
    >
      {networks.map((network: any, networkIndex: number) => (
        <span
          key={networkIndex}
          className={cn(
            "w-1/2 md:w-auto px-4 md:px-2 2xl:px-4 py-[10px] md:py-1 2xl:py-[7px] cursor-pointer text-center",
            network.active ? "bg-[#00F] text-white" : ""
          )}
          onClick={() => handleSwitchNetwork(network)}
        >
          {network.name}
        </span>
      ))}
    </div>
  );
}

"use client";

import { networks as networkList } from "@/app/data/config";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function NetworkSwitch({ className }: any) {
  const { token } = useAccountInfo();
  const { setNetworkId, networkId } = useNetworkInfo();

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
      openModalDirectly(MODAL_HASH_MAP.switchNetwork);
    } else {
      setNetworkId(network.id);
      setNetworks(
        networks.map((item: any) => ({
          ...item,
          active: item.id === network.id
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

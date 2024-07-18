"use client";

import react, { useState } from "react";
import { networks as networkList } from "@/app/data/config";
import { useNetworkInfo } from "@/app/store/account";
import { cn } from "@/lib/utils";

export function NetworkSwitch() {
  const { setNetwork, network: currentNetwork } = useNetworkInfo();

  const currentNetworkList = networkList.map((item, index) => {
    if (currentNetwork) {
      return { ...item, active: currentNetwork === item.name };
    } else {
      return { ...item, active: index === 0 };
    }
  });

  const [networks, setNetworks] = useState<any[]>(currentNetworkList);

  const handleSwitchNetwork = (network: any) => {
    setNetwork(network.name);
    setNetworks(
      networks.map((item: any) => ({
        ...item,
        active: item.name === network.name,
      }))
    );
  };

  return (
    <div className="flex flex-row text-[10px] md:text-xs 2xl:text-sm text-[#00F] font-semibold font-orbitron border border-solid border-[#00F] rounded">
      {networks.map((network: any, networkIndex: number) => (
        <span
          key={networkIndex}
          className={cn(
            "px-2 py-1 md:px-4 md:py-[7px] cursor-pointer",
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

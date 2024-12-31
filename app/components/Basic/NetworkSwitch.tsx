"use client";

import { NetworkId, networkMap, networks } from "@/app/data/config";
import { useSwitchNetwork } from "@/app/hooks";
import { Close as IconClose } from "@/app/icons/Close";
import { useNetworkInfo } from "@/app/store/account";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";
import { useToggle } from "react-use";

export function NetworkSwitch() {
  const { networkId } = useNetworkInfo();
  const [isOpen, toggleOpen] = useToggle(false);
  const { handleSwitchNetwork } = useSwitchNetwork();

  const handleSwitch = (networkId: NetworkId) => {
    networkId === NetworkId.FrontierV1 && handleSwitchNetwork(networkId);
    toggleOpen(false);
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={toggleOpen}>
        <PopoverTrigger className="h-16 w-full lg:w-fit px-4 lg:px-0 border-b lg:border-b-0 border-line group/network">
          <div className="flex items-center gap-1">
            <div className="flex-center size-5 relative">
              <span className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex size-2 rounded-full bg-link opacity-75"></span>
              <span className="size-1.5 rounded-full bg-link"></span>
            </div>
            <h3 className="sonic-title2 text-link font-orbitron w-fit">
              {networkMap[networkId].name}
            </h3>
            <SwitchNetworkIcon
              className={cn(
                "size-5 text-icon ml-auto lg:ml-1 group-hover/network:text-primary transition-colors group-aria-expanded/network:text-primary"
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 text-primary w-full lg:w-fit border-none outline-none mt-1 hidden lg:block">
          <div className="py-1 sonic-title3 bg-bg-popup flex-col font-orbitron">
            {networks.map((network: any, networkIndex: number) => (
              <div
                key={networkIndex}
                onClick={() => handleSwitch(network.id)}
                className={cn(
                  "px-6 py-2 hover:bg-line transition-all",
                  network.id === NetworkId.FrontierV1
                    ? "text-link cursor-pointer"
                    : "text-disable cursor-not-allowed"
                )}
              >
                {network.name}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div
        className={cn(
          "fixed bottom-0 left-0 w-full pb-4 sonic-title2 bg-bg-popup text-primary flex-col font-orbitron lg:hidden transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="sonic-title2 h-14 flex items-center text-tertary px-4 justify-between">
          Select Network
          <IconClose width={24} height={24} color="#4D4D4D" />
        </div>
        {networks.map((network: any, networkIndex: number) => (
          <div
            key={networkIndex}
            onClick={() => handleSwitch(network.id)}
            className={cn(
              "px-4 h-16 flex items-center hover:bg-line hover:text-link transition-all cursor-pointer",
              network.id === NetworkId.FrontierV1
                ? "text-link cursor-pointer"
                : "text-disable cursor-not-allowed"
            )}
          >
            {network.name}
          </div>
        ))}
      </div>
    </>
  );
}

function SwitchNetworkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <path
        d="M5.88672 8.33203L10.8867 3.33203L15.8867 8.33203L5.88672 8.33203Z"
        fill="currentColor"
      />
      <path
        d="M15.8867 11.668L10.8867 16.668L5.88672 11.668L15.8867 11.668Z"
        fill="currentColor"
      />
    </svg>
  );
}

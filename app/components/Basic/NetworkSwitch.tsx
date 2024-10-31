"use client";

import { Network, networkMap, networks } from "@/app/data/config";
import { useSwitchNetwork } from "@/app/hooks";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { Close as IconClose } from "@/app/icons/Close";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";
import { useToggle } from "react-use";

export function NetworkSwitch({ className }: any) {
  const { networkId } = useNetworkInfo();
  const [isOpen, toggleOpen] = useToggle(false);
  const { handleSwitchNetwork } = useSwitchNetwork();

  const handleOnClick = (network: Network) => {
    handleSwitchNetwork(network.id);
    if (network.id !== "testnetv1") {
      openModalDirectly(MODAL_HASH_MAP.seasonTwo);
    }
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={toggleOpen}>
        <PopoverTrigger className="h-16 w-full md:w-fit px-4 md:px-0 border-b md:border-b-0 border-line group/network">
          <div className="flex items-center gap-1">
            <div className="flex-center size-5 relative">
              <span className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex size-2 rounded-full bg-link opacity-75"></span>
              <span className="size-1.5 rounded-full bg-link"></span>
            </div>
            <h3 className="text-title3 text-link font-orbitron w-fit">
              {networkMap[networkId].name}
            </h3>
            <SwitchNetworkIcon
              className={cn(
                "size-5 text-icon ml-auto md:ml-1 group-hover/network:text-primary transition-colors group-aria-expanded/network:text-primary"
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 text-primary w-full md:w-fit border-none outline-none mt-1 hidden md:block">
          <div className="py-1 text-title3 bg-bg-popup flex-col font-orbitron">
            {networks.map((network: any, networkIndex: number) => (
              <div
                key={networkIndex}
                onClick={() => handleOnClick(network)}
                className="px-6 py-2 hover:bg-line hover:text-link transition-all cursor-pointer"
              >
                {network.name}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div
        className={cn(
          "fixed bottom-0 left-0 w-full pb-1 text-title2 bg-bg-popup text-primary flex-col font-orbitron md:hidden transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="text-title2 h-14 flex items-center text-tertary px-4 justify-between">
          Select Network
          <IconClose width={24} height={24} color="#4D4D4D" />
        </div>
        {networks.map((network: any, networkIndex: number) => (
          <div
            key={networkIndex}
            onClick={() => handleOnClick(network)}
            className={cn(
              "px-4 h-16 flex items-center hover:bg-line hover:text-link transition-all cursor-pointer",
              network.id === networkId && "text-link"
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

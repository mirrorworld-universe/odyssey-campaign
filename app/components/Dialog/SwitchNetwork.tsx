"use client";

import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSwitchNetworkModal } from "@/app/store/tutorials";
import {
  useAccountInfo,
  useNetworkInfo,
  useWalletModal,
} from "@/app/store/account";
import { Switch } from "@/app/icons/Switch";
import { useMutation } from "@tanstack/react-query";
import { fetchLogout } from "@/app/data/account";
import { useState } from "react";

export function SwitchNetworkDialog() {
  const router = useRouter();
  const networkSwitchingNames: any = {
    devnet: {
      id: "testnet",
      name: "Frontier",
    },
    testnet: {
      id: "devnet",
      name: "Origin",
    },
  };

  const { disconnect } = useWallet();
  const {
    isOpen: isOpenWalletModal,
    onOpen: onOpenWalletModal,
    onClose: onCloseWalletModal,
    setSwitching,
  } = useWalletModal();
  const { isOpen, onOpen, onClose } = useSwitchNetworkModal();
  const { token, isInWhitelist, reset } = useAccountInfo();
  const { networkId, setNetworkId } = useNetworkInfo();

  const [logingOut, setLogingOut] = useState(false);

  const mutationLogout = useMutation({
    mutationFn: () => fetchLogout({ token, networkId }),
    onSuccess: () => {
      reset();
      disconnect();

      setNetworkId(networkSwitchingNames[networkId || "devnet"].id);
      router.push("/");
      onClose();

      setLogingOut(false);

      setSwitching(true);
      onOpenWalletModal();
    },
  });

  const handleToLogout = () => {
    setLogingOut(true);
    mutationLogout.mutate();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[calc(100%_-_32px)] w-full md:w-[460px] bg-[#1A1A1A] border-none md:rounded-2xl px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-start items-center text-white text-[32px] font-orbitron gap-8">
            <p className="flex flex-row justify-center items-center gap-3 text-white text-5xl font-semibold font-orbitron pt-4">
              <Switch width={64} height={64} color="#FBD314" />
            </p>
            <span className="text-white text-2xl font-semibold font-orbitron">
              Switching to Sonic{" "}
              {networkSwitchingNames[networkId || "devnet"].name}
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-base text-center mt-4">
            To switch to the {networkSwitchingNames[networkId || "devnet"].name}{" "}
            network, you need to log out of your current wallet connection. Do
            you wish to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4 mt-12">
          <Button
            className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-base font-bold font-orbitron transition-colors duration-300"
            onClick={handleToLogout}
            disabled={logingOut}
          >
            Log Out
          </Button>
          <Button
            className="w-full h-12 bg-transparent hover:bg-transparent text-white/30 font-orbitron hover:opacity-80 active:opacity-50 transition-colors duration-300"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

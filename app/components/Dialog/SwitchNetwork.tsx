"use client";

import { fetchLogout } from "@/app/data/account";
import { networks } from "@/app/data/config";
import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { SwitchLogo } from "@/app/logos/SwitchLogo";
import {
  useAccountInfo,
  useNetworkInfo,
  useWalletModal
} from "@/app/store/account";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function SwitchNetworkDialog() {
  const router = useRouter();
  const { disconnect } = useWallet();
  const { onOpen: onOpenWalletModal, setSwitching } = useWalletModal();
  const { token, reset } = useAccountInfo();
  const { networkId, setNetworkId, switchTo } = useNetworkInfo();
  const { closeModal, modalHash } = useModalHash();

  const switchToNetwork = networks.find(
    (network: any) => network.id === switchTo
  );

  const currentNetwork = networks.find(
    (network: any) => network.id === networkId
  );

  const { mutate, isPending } = useMutation({
    mutationFn: () => fetchLogout({ token, networkId }),
    onSuccess: () => {
      reset();
      disconnect();

      setNetworkId(switchTo);
      router.push("/");
      closeModal();

      setSwitching(true);
      onOpenWalletModal();
    }
  });

  return (
    <AlertDialog
      open={modalHash === MODAL_HASH_MAP.switchNetwork}
      onOpenChange={closeModal}
    >
      <AlertDialogContent className="px-10 md:p-0 w-full md:max-w-[360px] text-primary text-center">
        <div className="p-6 bg-bg-popup items-center flex-v gap-6 md:gap-8">
          <SwitchLogo className="size-[54px] md:size-16 mt-4" />
          <div className="flex-v gap-4">
            <h2 className="text-headline5 md:text-headline4 font-orbitron">
              Switching to {switchToNetwork?.name}
            </h2>
            <p className="text-body3 text-tertary">
              You're currently on the {currentNetwork?.name} network. To
              participate in tasks, you'll need to switch to the latest{" "}
              {switchToNetwork?.name} network, which requires re-logging into
              your wallet.
            </p>
          </div>

          <div className="flex-v gap-2 w-full text-title2 font-orbitron mt-2 md:mt-auto">
            <Button
              onClick={() => mutate()}
              disabled={isPending}
              variant={"primary"}
              size={"lg"}
            >
              Log out
            </Button>
            <Button onClick={closeModal} variant={"cancel"} size={"lg"}>
              Cancel
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

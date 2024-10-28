"use client";
import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import { useSetupInfo, useWhitelistModal } from "@/app/store/tutorials";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

export function SetUpSonicNetworkDialog() {
  const { wallet } = useWallet();
  const { address } = useAccountInfo();
  const { status, setStatus } = useSetupInfo();
  const { networkId } = useNetworkInfo();
  const { onOpen: onOpenWhitelistDialog } = useWhitelistModal();
  const { openModal, modalHash, closeModal } = useModalHash();

  const handleConfirmInTestnet = () => {
    onOpenWhitelistDialog();
    closeModal();
  };

  const handleConfirm = () => {
    setStatus({
      ...status,
      [address]: "done"
    });
    openModal(MODAL_HASH_MAP.setUpFinish);
  };

  return (
    <AlertDialog
      open={modalHash === MODAL_HASH_MAP.setUpSonicNetwork}
      onOpenChange={closeModal}
    >
      <AlertDialogContent className="px-10 md:p-0 text-primary">
        <div className="p-6 md:p-8 bg-bg-popup flex flex-col gap-6 md:gap-8 w-full max-w-[520px]">
          <div className="flex flex-col gap-2 md:gap-3">
            <h1 className="text-headline5 font-orbitron">
              Set Up Sonic Network
            </h1>
            <p className="text-body3 text-tertary">
              Set up Sonic network for your {wallet?.adapter.name} wallet
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-14 py-6">
            <img
              src="/images/icons/sonic-white.png"
              alt=""
              className="size-10 md:size-12"
            />
            <span className="inline-flex flex-row justify-between items-center size-10 md:size-12">
              <i className="inline-block size-2 bg-white/30 rounded-full animate-loading-before"></i>
              <i className="inline-block size-2 bg-white/30 rounded-full animate-loading"></i>
              <i className="inline-block size-2 bg-white/30 rounded-full animate-loading-after"></i>
            </span>
            <img
              src={wallet?.adapter.icon}
              alt=""
              className="size-10 md:size-12"
            />
          </div>

          <div className="flex flex-col gap-6 text-title2">
            <p>
              1. Open this network{" "}
              <span className="text-link cursor-pointer">settings doc</span>
            </p>
            <p>2. Setup [Origin] network</p>
            <p>3. Continue to next step</p>
          </div>
          <Button
            className="mt-2 md:mt-auto"
            onClick={handleConfirm}
            variant={"primary"}
            size={"lg"}
          >
            Continue
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

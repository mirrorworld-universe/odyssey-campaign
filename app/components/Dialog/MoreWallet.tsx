"use client";
import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { InfoILogo } from "@/app/logos/InfoILogo";
import { useWalletModal } from "@/app/store/account";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

export function MoreWalletDialog() {
  const { wallet } = useWallet();
  const { onOpen: onOpenWalletDialog } = useWalletModal();

  const { modalHash, closeModal } = useModalHash();

  const handleSwitchWallet = () => {
    onOpenWalletDialog();
    closeModal();
  };

  return (
    <AlertDialog
      open={modalHash === MODAL_HASH_MAP.moreWallet}
      onOpenChange={closeModal}
    >
      <AlertDialogContent className="md:max-w-[360px] w-full px-10 md:p-0 text-primary text-center">
        <div className="p-6 flex-v bg-bg-popup items-center gap-6 md:gap-8">
          <InfoILogo className="size-14 md:size-16 text-[#FBD314] mt-4" />
          <div className="flex-v gap-4">
            <h3 className="sonic-headline5 md:sonic-headline4 font-orbitron">
              More Wallet Support Coming Soon!
            </h3>
            <p className="sonic-body3 text-tertary">
              {wallet?.adapter.name} doesn't support Sonic yet, so you can't
              complete tasks or claim rewards through this wallet. As Sonic is
              the first Solana Gaming Layer 2, more wallet support is coming.
              Your support will enrich the Solana ecosystem!
            </p>
          </div>

          <div className="flex-v gap-2 w-full mt-2 md:mt-auto">
            <Button
              className="sonic-title2"
              variant="primary"
              onClick={handleSwitchWallet}
              size={"lg"}
            >
              Switch Wallet
            </Button>
            <Button
              className="sonic-title2"
              variant="cancel"
              onClick={closeModal}
              size={"lg"}
            >
              Cancel
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

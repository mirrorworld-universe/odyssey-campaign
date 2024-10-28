"use client";
import InfoILogo from "@/app/logos/InfoILogo";
import { useWalletModal } from "@/app/store/account";
import { useMoreWalletModal } from "@/app/store/tutorials";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

export function MoreWalletDialog() {
  const { wallet } = useWallet();
  const { isOpen, onClose } = useMoreWalletModal();
  const { onOpen: onOpenWalletDialog } = useWalletModal();

  const handleSwitchWallet = () => {
    onOpenWalletDialog();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="md:max-w-[360px] w-full px-10 md:p-0 text-primary text-center">
        <div className="p-6 flex-v bg-bg-popup items-center gap-6 md:gap-8">
          <InfoILogo className="size-14 md:size-16 text-[#FBD314] mt-4" />
          <div className="flex-v gap-4">
            <h3 className="text-headline5 md:text-headline4 font-orbitron">
              More Wallet Support Coming Soon!
            </h3>
            <p className="text-body3 text-tertary">
              {wallet?.adapter.name} doesn't support Sonic yet, so you can't
              complete tasks or claim rewards through this wallet. As Sonic is
              the first Solana Gaming Layer 2, more wallet support is coming. We
              recommend using{" "}
              <a
                className="text-link hover:text-primary-blue"
                href="https://www.okx.com/web3"
                target="_blank"
              >
                OKX Wallet
              </a>{" "}
              or{" "}
              <a
                className="text-link hover:text-primary-blue"
                href="https://nightly.app/"
                target="_blank"
              >
                Nightly
              </a>{" "}
              or{" "}
              <a
                className="text-link hover:text-primary-blue"
                href="https://www.backpack.app/"
                target="_blank"
              >
                Backpack
              </a>{" "}
              wallets for now. Your support will enrich the Solana ecosystem!
            </p>
          </div>

          <div className="flex-v gap-2 text-title2 font-orbitron w-full mt-2 md:mt-auto">
            <Button variant="primary" onClick={handleSwitchWallet} size={"lg"}>
              Switch Wallet
            </Button>
            <Button variant="cancel" onClick={onClose} size={"lg"}>
              Cancel
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { NetworkId } from "@/app/data/config";
import { useSwitchNetwork } from "@/app/hooks";
import useModalHash, {
  MODAL_HASH_MAP,
  openModalDirectly
} from "@/app/hooks/useModalHash";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

export default function SeasonTwo() {
  const { closeModal, modalHash } = useModalHash();
  const { connected } = useWallet();
  const { handleSwitchNetwork } = useSwitchNetwork();

  const handleBtnClick = () => {
    if (connected) {
      openModalDirectly(MODAL_HASH_MAP.switchNetwork);
    } else {
      closeModal();
    }
  };

  const data = [
    {
      title: "Season 1 Ended & Next Steps",
      descriptions: [
        <>
          The Sonic Odyssey Season 1 - Tasks on Origin and Frontier V0 have
          officially ended! Please switch to{" "}
          <span
            className="text-link cursor-pointer hover:text-primary-blue"
            onClick={() => {
              closeModal();
              handleSwitchNetwork(NetworkId.FrontierV1);
            }}
          >
            Frontier V1
          </span>{" "}
          to begin the new season and start earning your rewards!
        </>
      ]
    },
    {
      title: "Rewards & On-Chain Status",
      descriptions: [
        <>
          {" "}
          All Sonic boxes, rings and all on-chain data on Origin or Fronter V0
          remain on their respective networks. You can still view or use them as
          usual. For Frontier V0, please check this{" "}
          <span
            className="text-link cursor-pointer hover:text-primary-blue"
            onClick={() => {
              window.open(
                "https://blog.sonic.game/sonic-frontier-v0-wallet-setting",
                "_blank"
              );
            }}
          >
            guide
          </span>{" "}
          to adjust network settings and view on-chain data.
        </>
      ]
    },
    {
      title: "Social Data Migration",
      descriptions: [
        <>
          Your “Referral,” “Meet Sonic” and "Play on Sonic X" data will be
          migrated to Frontier V1, so if you've already completed these tasks on
          Origin and Frontier V0, you won’t need to redo them.
        </>
      ]
    }
  ];
  return (
    <AlertDialog
      open={modalHash === MODAL_HASH_MAP.seasonTwo}
      onOpenChange={closeModal}
    >
      <AlertDialogContent className="max-w-[640px] w-full text-primary px-6 md:p-0">
        <div className="p-6 md:p-8 flex flex-col gap-6 md:gap-8 bg-bg-popup">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 md:gap-4">
              <h3 className="sonic-title2 md:sonic-headline5 font-orbitron">
                {item.title}
              </h3>
              {item.descriptions.map((description, index) => (
                <p
                  key={index}
                  className="sonic-body3 md:sonic-body2 text-tertary"
                >
                  {description}
                </p>
              ))}
            </div>
          ))}
          <div className="flex-v gap-2 mt-2 md:mt-auto">
            <Button
              onClick={handleBtnClick}
              variant={"primary"}
              size={"lg"}
              className="sonic-title2"
            >
              I Understand
            </Button>
            {connected && (
              <Button
                onClick={closeModal}
                variant={"cancel"}
                size={"lg"}
                className="sonic-title2"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

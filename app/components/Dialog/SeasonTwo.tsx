"use client";

import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { useNetworkInfo } from "@/app/store/account";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function SeasonTwo() {
  const { closeModal, modalHash } = useModalHash();
  const { setNetworkId } = useNetworkInfo();

  const handleSwitchNetwork = () => {
    setNetworkId("testnetv1");
    closeModal();
  };

  const data = [
    {
      title: "Season 1 Summary & Next Steps",
      descriptions: [
        <>
          The Sonic Odyssey Season 1 - Tasks on Origin and Frontier V0 have
          officially ended! Please switch to{" "}
          <span
            className="text-link cursor-pointer hover:text-primary-blue"
            onClick={handleSwitchNetwork}
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
          usual.
        </>
      ]
    },
    {
      title: "Social Data Migration",
      descriptions: [
        <>
          Your “Referral,” “Meet Sonic” and "Play on Sonic X" data will be
          migrated to Fronter V1, so if you've already completed these tasks on
          Origin and Fronter V0, you won’t need to redo them.
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
              <h3 className="text-title2 md:text-headline5 font-orbitron">
                {item.title}
              </h3>
              {item.descriptions.map((description, index) => (
                <p
                  key={index}
                  className="text-body3 md:text-body2 text-tertary"
                >
                  {description}
                </p>
              ))}
            </div>
          ))}

          <Button
            onClick={closeModal}
            variant={"primary"}
            size={"lg"}
            className="font-orbitron mt-2 md:mt-auto text-title2"
          >
            I Understand
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

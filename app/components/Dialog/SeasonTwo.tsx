"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { create } from "zustand";

export default function SeasonTwo() {
  const { isOpen, onClose } = useSeasonTwoModal();
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[640px] bg-black md:bg-bg-popup w-full h-full md:h-auto text-primary p-0">
        <div className="p-4 pt-8 md:p-8 flex flex-col gap-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-title2 md:text-headline5 font-orbitron">
              Season 1 Summary & Next Steps
            </h3>
            <p className="text-body3 md:text-body2 text-tertary">
              The Sonic Odyssey Season 1 - Tasks on Origin and Frontier V0 have
              officially ended! Please switch to{" "}
              <span className="text-link">Frontier V1</span> to begin the new
              season and start earning your rewards!
            </p>
          </div>

          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-title3 md:text-headline5 font-orbitron">
              Rewards & On-Chain Status
            </h3>
            <p className="text-body2 text-tertary">
              All Sonic boxes, rings and all on-chain data on Origin or Fronter
              V0 remain on their respective networks. You can still view or use
              them as usual.
            </p>
          </div>

          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-title3 md:text-headline5 font-orbitron">
              Social Data Migration
            </h3>
            <p className="text-body2 text-tertary">
              Your “Referral,” “Meet Sonic” and "Play on Sonic X" data will be
              migrated to Fronter V1, so if you've already completed these tasks
              on Origin and Fronter V0, you won’t need to redo them. 
            </p>
          </div>

          <Button
            onClick={onClose}
            variant={"primary"}
            size={"lg"}
            className="font-orbitron mt-auto text-title2"
          >
            I Understand
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const useSeasonTwoModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

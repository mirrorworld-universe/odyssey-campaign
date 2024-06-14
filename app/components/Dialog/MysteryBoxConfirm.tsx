"use client";
import { Copy } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Gift } from "@/app/icons/Gift";
import { Ring } from "@/app/icons/Ring";
import {
  useMysteryBoxConfirmModal,
  useMysteryBoxInfo,
  useMysteryBoxRecordModal,
} from "@/app/store/task";

export function MysteryBoxConfirmDialog() {
  const { isOpen, onOpen, onClose } = useMysteryBoxConfirmModal();
  const { mysteryBoxAmount } = useMysteryBoxInfo();
  const {
    isOpen: isOpenRecordModal,
    onOpen: onOpenRecordModal,
    onClose: onCloseRecordModal,
  } = useMysteryBoxRecordModal();

  const handleConfirm = () => {
    onClose();
    onOpenRecordModal();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[467px] h-[426px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-center items-center text-white text-[32px] font-orbitron">
            <p className="flex flex-row gap-3 text-white text-[48px] font-semibold font-orbitron">
              <Gift width={64} height={64} color="#FBB042" />x{" "}
              {mysteryBoxAmount}
            </p>
            <span className="text-white text-[24px] font-semibold font-orbitron mt-8">
              Open Mystery Box
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-[16px] text-center mt-4">
            Confirm to open {mysteryBoxAmount} mystery boxes at once, each
            randomly containing 1-5 rings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4 mt-12">
          <Button
            className="w-full height-[48px] bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button
            className="w-full height-[48px] bg-transparent hover:bg-transparent text-white/50 font-orbitron"
            onClick={onClose}
          >
            Not Now
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

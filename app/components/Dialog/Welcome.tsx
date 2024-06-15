"use client";
import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useWelcomeModal } from "@/app/store/tutorials";

export function WelcomeDialog() {
  const { isOpen, onOpen, onClose } = useWelcomeModal();

  const handleConfirm = () => {
    onClose();
  };

  useEffect(() => {
    if (!localStorage.getItem("sonic-welcome")) {
      onOpen();
      localStorage.setItem("sonic-welcome", "1");
    }
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[440px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-start items-center text-white text-[32px] font-orbitron">
            <span className="text-white text-[32px] font-semibold font-orbitron">
              Welcome to Sonic Odyssey Campaign!
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-[16px] text-left mt-4">
            Here are the steps to participate in the Odyssey Campaign:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-12">
          <ul className="flex flex-col gap-6 list-decimal text-white text-[18px] font-semibold pl-[18px]">
            <li className="x">Set up Sonic Network in your wallet</li>
            <li className="x">Complete tasks</li>
            <li className="x">Collect rings</li>
          </ul>
        </div>
        <div className="flex flex-col gap-12 mt-12">
          <Button
            className="w-full height-[48px] bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-[16px] font-bold font-orbitron transition-colors duration-300"
            onClick={handleConfirm}
          >
            Get Started
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

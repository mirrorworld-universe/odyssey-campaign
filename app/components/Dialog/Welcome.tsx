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
import { trackClick } from "@/lib/track";

export function WelcomeDialog() {
  const { isOpen, onOpen, onClose } = useWelcomeModal();

  const handleConfirm = () => {
    onClose();
    // ga4
    trackClick({ text: "Get Started Dialog" });
  };

  useEffect(() => {
    if (!localStorage.getItem("sonic-welcome")) {
      onOpen();
      localStorage.setItem("sonic-welcome", "1");
    }
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[calc(100%_-_70px)] w-full md:w-[468px] bg-[#1A1A1A] border-none p-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-start items-center text-white text-[32px] font-orbitron">
            <span className="text-white text-2xl md:text-[32px] font-semibold font-orbitron">
              Welcome to Sonic Odyssey Campaign!
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-sm md:text-base text-left mt-3 md:mt-4">
            Here are the steps to participate in the Odyssey Campaign:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-10 md:mt-12">
          <ul className="flex flex-col gap-6 list-decimal text-white text-lg font-semibold pl-[18px]">
            <li className="x">Set up Sonic Network in your wallet</li>
            <li className="x">Complete tasks</li>
            <li className="x">Collect rings</li>
          </ul>
        </div>
        <div className="flex flex-col gap-12 mt-10 md:mt-12 fixed md:static left-4 right-4 bottom-4">
          <Button
            className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-base font-bold font-orbitron transition-colors duration-300"
            onClick={handleConfirm}
          >
            Get Started
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

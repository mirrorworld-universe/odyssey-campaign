"use client";
import { useWelcomeModal } from "@/app/store/tutorials";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { trackClick } from "@/lib/track";
import { useLocalStorage, useMount } from "react-use";

export function WelcomeDialog() {
  const { isOpen, onOpen, onClose } = useWelcomeModal();
  const [welcome, setWelcome] = useLocalStorage("sonic-welcome");

  useMount(() => {
    if (!welcome) {
      onOpen();
    }
  });

  const handleConfirm = () => {
    onClose();
    setWelcome("1");
    // ga4
    trackClick({ text: "Get Started Dialog" });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="px-4 md:p-0 max-w-[520px]">
        <div className="p-6 md:p-8 flex flex-col gap-10 md:gap-8 text-primary bg-bg-popup rounded-xl md:rounded-none">
          <div className="flex flex-col gap-3">
            <p className="md:text-headline5 text-headline4 font-orbitron">
              Welcome to Sonic Odyssey Campaign!
            </p>
            <p className="text-body3 text-tertary">
              Here are the steps to participate in the Odyssey Campaign:
            </p>
          </div>
          <div className="flex flex-col gap-6 text-title3 md:text-title2">
            <p>1. Set up Sonic Network in your wallet</p>
            <p>2. Complete tasks</p>
            <p>3. Collect rings</p>
          </div>
          <Button
            className="!text-title2 font-orbitron"
            variant={"primary"}
            size={"lg"}
            onClick={handleConfirm}
          >
            Get Started
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

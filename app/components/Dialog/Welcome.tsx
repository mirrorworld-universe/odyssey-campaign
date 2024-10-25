"use client";
import { useBreakpoint } from "@/app/hooks";
import { useWelcomeModal } from "@/app/store/tutorials";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { trackClick } from "@/lib/track";
import { useLocalStorage, useMount } from "react-use";

export function WelcomeDialog() {
  const { isOpen, onOpen, onClose } = useWelcomeModal();
  const isMobile = useBreakpoint() === "mobile";
  const [welcome, setWelcome] = useLocalStorage("sonic-welcome");

  useMount(() => {
    if (!welcome) {
      onOpen();
      setWelcome("1");
    }
  });

  const handleConfirm = () => {
    onClose();
    // ga4
    trackClick({ text: "Get Started Dialog" });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="p-8 flex flex-col gap-8 text-primary max-w-[520px]">
        <div className="flex flex-col gap-3">
          <p className="text-headline5 font-orbitron">
            Welcome to Sonic Odyssey Campaign!
          </p>
          <p className="text-body3 text-tertary">
            Here are the steps to participate in the Odyssey Campaign:
          </p>
        </div>
        <div className="flex flex-col gap-6 text-title2">
          <p>1. Set up Sonic Network in your wallet</p>
          <p>2. Complete tasks</p>
          <p>3. Collect rings</p>
        </div>
        <Button
          className="!text-title2 font-orbitron"
          variant={"primary"}
          size={isMobile ? "md" : "lg"}
          onClick={handleConfirm}
        >
          Get Started
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}

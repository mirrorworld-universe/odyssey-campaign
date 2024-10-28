"use client";
import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { trackClick } from "@/lib/track";
import { useLocalStorage, useMount } from "react-use";

export function WelcomeDialog() {
  const [welcome, setWelcome] = useLocalStorage("sonic-welcome");
  const { openModal, modalHash, closeModal } = useModalHash();

  useMount(() => {
    if (!welcome) {
      openModal(MODAL_HASH_MAP.welcome);
    }
  });

  const handleConfirm = () => {
    closeModal();
    setWelcome("1");
    // ga4
    trackClick({ text: "Get Started Dialog" });
  };

  return (
    <AlertDialog
      open={modalHash === MODAL_HASH_MAP.welcome}
      onOpenChange={closeModal}
    >
      <AlertDialogContent className="px-4 md:p-0 max-w-[520px]">
        <div className="p-6 md:p-8 flex flex-col gap-6 md:gap-8 text-primary bg-bg-popup">
          <div className="flex flex-col gap-2 md:gap-3">
            <p className="text-headline5 font-orbitron">
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
            className="!text-title2 font-orbitron mt-2 md:mt-auto"
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

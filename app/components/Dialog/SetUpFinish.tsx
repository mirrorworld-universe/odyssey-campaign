"use client";
import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { CheckLogo } from "@/app/logos/CheckLogo";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SetUpFinishDialog() {
  const { modalHash, closeModal } = useModalHash();
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/task");
    closeModal();
  };

  return (
    <AlertDialog
      open={modalHash === MODAL_HASH_MAP.setUpFinish}
      onOpenChange={closeModal}
    >
      <AlertDialogContent className="p-0 max-w-[360px] w-full text-primary">
        <div className="p-6 bg-bg-popup flex flex-col items-center gap-8">
          <CheckLogo className="size-16 pt-4" />
          <div className="flex flex-col gap-2">
            <h1 className="text-headline4 font-orbitron text-center">
              Congratulations
            </h1>
            <p className="text-body3 text-tertary">
              You have completed the wallet setup. Start your journey now! If
              you have any questions, feel free to check out our{" "}
              <a
                href="/task#faq"
                className="text-link cursor-pointer hover:text-primary-blue"
              >
                beginner's guide
              </a>{" "}
              and{" "}
              <a
                href="/task#how-to-play"
                className="text-link cursor-pointer hover:text-primary-blue"
              >
                FAQs
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full font-orbitron text-title2">
            <Button onClick={handleConfirm} variant={"primary"} size={"lg"}>
              Task Center
            </Button>
            <Button
              onClick={closeModal}
              variant={"link"}
              size={"lg"}
              className="text-tertary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

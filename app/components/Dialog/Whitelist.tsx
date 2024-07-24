"use client";

import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
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
import { useWhitelistModal } from "@/app/store/tutorials";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";

export function WhitelistDialog() {
  const router = useRouter();

  const { disconnect } = useWallet();
  const { isOpen, onOpen, onClose } = useWhitelistModal();
  const { isInWhitelist, reset } = useAccountInfo();
  const { setNetworkId } = useNetworkInfo();

  const handleToTaskCenter = () => {
    router.push("/task");
    onClose();
  };

  const handleConfirm = () => {
    disconnect();
    reset();
    setNetworkId("devnet");
    router.push("/");
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[460px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-col justify-start items-center text-white text-[32px] font-orbitron gap-8">
            <p className="flex flex-row justify-center items-center gap-3 text-white text-5xl font-semibold font-orbitron pt-4">
              {isInWhitelist ? (
                <img src="/sonic.png" className="w-16 h-16" />
              ) : (
                <img src="/images/icons/info.svg" className="w-16 h-16" />
              )}
            </p>
            <span className="text-white text-2xl font-semibold font-orbitron">
              {isInWhitelist ? "Congratulations" : "Whitelist Access Required"}
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#717171] text-base text-center mt-4">
            {isInWhitelist ? (
              <p>
                You're whitelisted! Check out this{" "}
                <a
                  className="text-[#25A3ED] hover:underline"
                  href="https://blog.sonic.game/sonic-testnet---frontier-odyssey-guide"
                  target="_blank"
                >
                  guide
                </a>{" "}
                to get started. Please share your feedback with our{" "}
                <a
                  className="text-[#25A3ED] hover:underline"
                  href="https://discord.com/channels/878219562351484948/1263097331750928535"
                  target="_blank"
                >
                  community
                </a>
                . Thank you!
              </p>
            ) : (
              <p>
                Sorry, this wallet address is not whitelisted. Please check our{" "}
                <a
                  className="text-[#25A3ED] hover:underline"
                  href="https://blog.sonic.game/sonic-testnet---frontier-whitelist-guide"
                  target="_blank"
                >
                  blog
                </a>{" "}
                to learn how to get whitelisted and join Sonic Testnet Stage 2.
                Thank you for your support!
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4 mt-12">
          {isInWhitelist ? (
            <>
              <Button
                className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-base font-bold font-orbitron transition-colors duration-300"
                onClick={handleToTaskCenter}
              >
                Task Center
              </Button>
              <Button
                className="w-full h-12 bg-transparent hover:bg-transparent text-white/30 font-orbitron hover:opacity-80 active:opacity-50 transition-colors duration-300"
                onClick={onClose}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-base font-bold font-orbitron transition-colors duration-300"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

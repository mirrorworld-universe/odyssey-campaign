import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Gift } from "@/app/icons/Gift";
import { Ring } from "@/app/icons/Ring";
import { useHowToPlayModal } from "@/app/store/tutorials";
import { useNetworkInfo } from "@/app/store/account";

export function HowToPlayDialog() {
  const { isOpen, onOpen, onClose } = useHowToPlayModal();
  const { networkId } = useNetworkInfo();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[813px] h-[643px] bg-[#1A1A1A] border-none px-8 py-8">
        <DialogHeader className="space-y-0">
          <DialogTitle className="text-white text-[32px] font-orbitron">
            How to Play?
          </DialogTitle>
          <DialogDescription className="text-white/60 text-base">
            Ensure you successfully switch the network in your wallet to Sonic.
            Check{" "}
            <a
              className="text-[#25A3ED] hover:underline"
              href="https://blog.sonic.game/sonic-testnet-odyssey-guide"
              target="_blank"
            >
              guides
            </a>
            .
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-12">
          {/* step 1 */}
          <div className="flex flex-row gap-4 text-lg font-semibold font-orbitron">
            <h3 className="text-[#FBB042]">
              <span>Step</span>
              <span className="inline-flex justify-center w-[27px] ml-[9px]">
                1
              </span>
            </h3>
            <p className="text-white">Request Test SOL</p>
          </div>
          <div className="w-full flex flex-row h-[96px] pl-[70px]">
            <p className="border-l-[2px] border-solid border-[#FBB042] text-white/60 pl-[27px]">
              On Sonic, you need SOL for gas. Ensure your wallet has enough SOL
              to transact. Click{" "}
              <a
                className="text-[#25A3ED] hover:underline"
                href={`https://faucet.sonic.game/#/${
                  networkId === "testnet" ? "?network=testnet" : ""
                }`}
                target="_blank"
              >
                faucet link
              </a>{" "}
              or use the faucet in the navigation bar to claim.
            </p>
          </div>
          {/* step 2 */}
          <div className="flex flex-row gap-4 text-lg font-semibold font-orbitron">
            <h3 className="text-[#FBB042]">
              <span>Step</span>
              <span className="inline-flex justify-center w-[27px] ml-[9px]">
                2
              </span>
            </h3>
            <p className="flex flex-row gap-1 items-center text-white">
              Earn Mystery Box
              <Gift
                color="#FBB042"
                className="w-3 h-3 md:w-[18px] md:h-[18px]"
              />{" "}
            </p>
          </div>
          <div className="w-full flex flex-row h-[96px] pl-[70px]">
            <p className="border-l-[2px] border-solid border-[#FBB042] text-white/60 pl-[27px]">
              In the{" "}
              <span
                className="text-[#25A3ED] hover:underline"
                onClick={onClose}
              >
                task center
              </span>
              , complete tasks to receive corresponding mystery boxes.
            </p>
          </div>
          {/* step 3 */}
          <div className="flex flex-row gap-4 text-lg font-semibold font-orbitron">
            <h3 className="text-[#FBB042]">
              <span>Step</span>
              <span className="inline-flex justify-center w-[27px] ml-[9px]">
                3
              </span>
            </h3>
            <p className="flex flex-row gap-1 items-center text-white">
              Claim Rings
              <Ring width={18} height={18} color="#FBB042" />
            </p>
          </div>
          <div className="w-full flex flex-row h-[96px] pl-[70px]">
            <p className="border-l-[2px] border-solid border-[#FBB042] text-white/60 pl-[27px]">
              Open a mystery box to receive a varying number of rings. Each
              mystery box can yield 1-5 rings. Claim them in the "Rings"
              dropdown section in the navigation bar.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

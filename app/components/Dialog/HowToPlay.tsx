"use client";
import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { ArrowBackLogo } from "@/app/logos/ArrowBackLogo";
import { GiftLogo } from "@/app/logos/GiftLogo";
import { RingLogo } from "@/app/logos/RingLogo";
import { useNetworkInfo } from "@/app/store/account";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getFaucetUrl, GUIDE_URL, NetworkId } from "@/app/data/config";

export function HowToPlayDialog() {
  const { modalHash, closeModal } = useModalHash();
  const { networkId } = useNetworkInfo();

  return (
    <Dialog
      open={modalHash === MODAL_HASH_MAP.howToPlay}
      onOpenChange={closeModal}
    >
      <DialogContent
        closeClassName="hidden md:block"
        className="max-w-[640px] p-0 w-full h-full md:h-auto text-primary"
      >
        <PcHowToPlay
          guideUrl={GUIDE_URL[networkId as NetworkId]}
          faucetUrl={getFaucetUrl()}
        />
        <MobileHowToPlay
          guideUrl={GUIDE_URL[networkId as NetworkId]}
          faucetUrl={getFaucetUrl()}
        />
      </DialogContent>
    </Dialog>
  );
}

function MobileHowToPlay({
  guideUrl,
  faucetUrl
}: {
  guideUrl: string;
  faucetUrl: string;
}) {
  const { closeModal } = useModalHash();
  const router = useRouter();

  return (
    <div className="md:hidden bg-black">
      <div className="h-14 px-4 flex items-center">
        <ArrowBackLogo onClick={closeModal} />
      </div>
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-headline5 font-orbitron">How to Play ?</h1>
          <p className="text-body3 text-tertary">
            Ensure you successfully switch the network in your wallet to Sonic.
            Check{" "}
            <a href={guideUrl} className="text-link">
              guides
            </a>
            .
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem
            value={`item-1`}
            className="border-line px-4 py-6 gap-2 flex flex-col first:border-t"
          >
            <AccordionTrigger className="font-orbitron p-0 text-icon aria-expanded:text-gold-yellow">
              <div className="text-left space-y-1">
                <h4 className="text-title4 text-gold-yellow">Step 1</h4>
                <h2 className="text-title2 text-white">Request Test SOL</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className={cn("!text-body3 text-secondary p-0")}>
              <div className="flex-v gap-6">
                On Sonic, you need test SOL for gas. Ensure your wallet has
                enough test SOL to transact. Click faucet link or use the faucet
                in the navigation bar to claim.
                <Button
                  className="text-title3 text-white font-orbitron"
                  variant={"primary"}
                  size={"sm"}
                  onClick={() => {
                    window.open(faucetUrl, "_blank");
                  }}
                >
                  Faucet
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value={`item-2`}
            className="border-line px-4 py-6 gap-2 flex flex-col first:border-t"
          >
            <AccordionTrigger className="font-orbitron p-0 text-icon aria-expanded:text-gold-yellow">
              <div className="text-left space-y-1">
                <h4 className="text-title4 text-gold-yellow">Step 2</h4>
                <h2 className="text-title2 text-white flex gap-1 items-center">
                  Earn Mystery Box
                  <GiftLogo className="size-[18px] text-gold-yellow" />
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className={cn("!text-body3 text-secondary p-0")}>
              <div className="flex-v gap-6">
                In the task center , complete tasks to receive corresponding
                mystery boxes.
                <Button
                  className="text-title3 text-white font-orbitron"
                  variant={"primary"}
                  size={"sm"}
                  onClick={() => {
                    router.push("/task");
                    closeModal();
                  }}
                >
                  Task Center
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value={`item-3`}
            className="border-line px-4 py-6 gap-2 flex flex-col first:border-t"
          >
            <AccordionTrigger className="font-orbitron p-0 text-icon aria-expanded:text-gold-yellow">
              <div className="text-left space-y-1">
                <h4 className="text-title4 text-gold-yellow">Step 3</h4>
                <h2 className="text-title2 text-white flex gap-1 items-center">
                  Claim Rings
                  <RingLogo className="size-[18px] text-gold-yellow" />
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className={cn("!text-body3 text-secondary p-0")}>
              <div className="flex-v gap-6">
                In the task center , complete tasks to receive corresponding
                mystery boxes.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function PcHowToPlay({
  guideUrl,
  faucetUrl
}: {
  guideUrl: string;
  faucetUrl: string;
}) {
  const { closeModal } = useModalHash();

  return (
    <div className="hidden md:flex-v bg-bg-popup p-8">
      {/* header */}
      <div className="space-y-3">
        <h2 className="text-headline5 font-orbitron">How to Play?</h2>
        <p className="text-body2/normal text-tertary">
          Ensure you successfully switch the network in your wallet to Sonic.
          Check{" "}
          <a
            target="_blank"
            href={guideUrl}
            className="text-link hover:text-primary-blue transition-colors"
          >
            guides
          </a>
          .
        </p>
      </div>
      {/* step 1 */}
      <div className="flex gap-4 mb-4 mt-8">
        <div className="text-gold-yellow flex-v gap-4">
          <h1 className="text-title2 font-orbitron flex gap-0.5">
            Step
            <span className="size-6 flex-center">1</span>
          </h1>
          <div className="bg-current w-0.5 h-24 mr-3 self-end"></div>
        </div>

        <div className="space-y-3">
          <h1 className="text-title2 font-orbitron">Request Test SOL</h1>
          <p className="text-body3 text-tertary">
            On Sonic, you need test SOL for gas. Ensure your wallet has enough
            test SOL to transact. Click{" "}
            <a
              className="text-link hover:text-primary-blue transition-colors"
              href={faucetUrl}
              target="_blank"
            >
              faucet link
            </a>{" "}
            or use the faucet in the navigation bar to claim.
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="text-gold-yellow flex-v gap-4">
          <h1 className="text-title2 font-orbitron flex gap-0.5">
            Step
            <span className="size-6 flex-center">2</span>
          </h1>
          <div className="bg-current w-0.5 h-24 mr-3 self-end"></div>
        </div>

        <div className="space-y-3">
          <h1 className="text-title2 font-orbitron flex items-center gap-1">
            Earn Mystery Box{" "}
            <GiftLogo className="size-[18px] text-gold-yellow" />
          </h1>
          <p className="text-body3 text-tertary">
            In the{" "}
            <span
              className="text-link hover:text-primary-blue cursor-pointer transition-colors"
              onClick={closeModal}
            >
              task center
            </span>
            , complete tasks to receive corresponding mystery boxes.
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="text-gold-yellow flex-v gap-4">
          <h1 className="text-title2 font-orbitron flex gap-0.5">
            Step
            <span className="size-6 flex-center">3</span>
          </h1>
          <div className="bg-current w-0.5 h-24 mr-3 self-end"></div>
        </div>

        <div className="space-y-3">
          <h1 className="text-title2 font-orbitron flex items-center gap-1">
            Claim Rings <RingLogo className="size-[18px] text-gold-yellow" />
          </h1>
          <p className="text-body3 text-tertary">
            Open a mystery box to receive a varying number of rings. Each
            mystery box can yield 1-5 rings. Claim them in the "Rings" dropdown
            section in the navigation bar.
          </p>
        </div>
      </div>
    </div>
  );
}

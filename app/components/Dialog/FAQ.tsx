"use client";
import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { ArrowBackLogo } from "@/app/logos/ArrowBackLogo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function FAQDialog() {
  const { modalHash, closeModal } = useModalHash();

  const faqList: any[] = [
    {
      title: "What is Sonic?",
      content:
        "Sonic is the first Solana Layer 2 for sovereign games built with HyperGrid, the Solana Virtual Machine (SVM) horizontal scaling framework."
    },
    {
      title: "What is Sonic Odyssey?",
      content:
        "Sonic Odyssey is a campaign for the launch of Sonic Testnet. It aims to help more users learn about and experience Sonic. To encourage and thank users for their participation and feedback, a series of rewards has been prepared."
    },
    {
      title: "What is a Ring Mystery Box and Sonic Ring?",
      content:
        "We have prepared two types of rewards for players: Ring Mystery Box and Sonic Ring. Rings are the primary core resource for future rewards, while the Ring Mystery Box is a key way to obtain Sonic Rings."
    },
    {
      title: "How can I obtain a Ring Mystery Box and Sonic Ring?",
      content:
        "Complete various tasks to earn Ring Mystery Boxes. By opening a Ring Mystery Box, you can receive between 1 to 5 rings."
    },
    {
      title: "What is Sonic Odyssey Pass and Sonic Cartridge?",
      content: (
        <>
          The <strong>Sonic Odyssey Pass</strong> is an essential, unlimited NFT
          series marking your participation in Sonic Odyssey. The{" "}
          <strong>Sonic Cartridge</strong> is a limited-edition NFT collection
          offering powerful bonuses.
        </>
      )
    }
  ];

  return (
    <Dialog open={modalHash === MODAL_HASH_MAP.faq} onOpenChange={closeModal}>
      <DialogContent
        closeClassName="hidden md:block"
        className="text-primary p-0 h-full flex-v md:h-auto max-w-[640px]"
      >
        <div className="h-14 md:hidden flex items-center bg-black px-4">
          <ArrowBackLogo onClick={closeModal} />
        </div>
        <div className="flex flex-col gap-6 md:gap-8 p-4 md:p-8 bg-black md:bg-transparent grow">
          <div className="sonic-headline5 font-orbitron">FAQs</div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {faqList.map((faq: any, faqIndex: number) => (
              <AccordionItem
                key={faqIndex}
                value={`item-${faqIndex + 1}`}
                className="border-line px-4 py-6 md:p-8 gap-2 flex flex-col first:border-t"
              >
                <AccordionTrigger className="sonic-title3 md:sonic-title2 group/faq text-left font-orbitron p-0 text-icon aria-expanded:text-gold-yellow transition-colors">
                  <span className="text-primary group-aria-expanded/faq:text-gold-yellow transition-colors">
                    {faq.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className={cn("sonic-body3 text-tertary p-0")}
                >
                  {faq.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}

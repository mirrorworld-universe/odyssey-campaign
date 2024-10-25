"use client";
import { useFAQModal } from "@/app/store/tutorials";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function FAQDialog() {
  const { isOpen, onClose } = useFAQModal();

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-primary p-8 flex flex-col gap-8 max-w-[640px]">
        <div className="text-headline5">FAQs</div>
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
              className="border-line p-8 gap-2 flex flex-col"
            >
              <AccordionTrigger className="text-title2 font-orbitron p-0 aria-expanded:text-[#FBB042] transition-colors">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="text-body3 text-secondary">
                {faq.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}

"use client";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFAQModal } from "@/app/store/tutorials";

export function FAQDialog() {
  const { isOpen, onOpen, onClose } = useFAQModal();

  const faqList: any[] = [
    {
      title: "What is Sonic?",
      content:
        "Sonic is the first Solana Layer 2 for sovereign games built with HyperGrid, the Solana Virtual Machine (SVM) horizontal scaling framework.",
    },
    {
      title: "What is Sonic Odyssey?",
      content:
        "Sonic Odyssey is a campaign for the launch of Sonic Testnet. It aims to help more users learn about and experience Sonic. To encourage and thank users for their participation and feedback, a series of rewards has been prepared.",
    },
    {
      title: "What is a Ring Mystery Box and Sonic Ring?",
      content:
        "We have prepared two types of rewards for players: Ring Mystery Box and Sonic Ring. Rings are the primary core resource for future rewards, while the Ring Mystery Box is a key way to obtain Sonic Rings.",
    },
    {
      title: "How can I obtain a Ring Mystery Box and Sonic Ring?",
      content:
        "Complete various tasks to earn Ring Mystery Boxes. By opening a Ring Mystery Box, you can receive between 1 to 5 rings.",
    },
    {
      title: "What is Sonic Odyssey Pass and Sonic Cartridge?",
      content:
        "The <strong>Sonic Odyssey Pass</strong> is an essential, unlimited NFT series marking your participation in Sonic Odyssey. The <strong>Sonic Cartridge</strong> is a limited-edition NFT collection offering powerful bonuses.",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col max-w-full w-full md:w-[812px] max-h-full h-full md:h-auto bg-[#1A1A1A] border-none p-4 md:p-8">
        <DialogHeader className="text-left space-y-0">
          <DialogTitle className="text-white text-2xl md:text-[32px] font-orbitron pb-12 border-b border-solid border-white/10">
            FAQs
          </DialogTitle>
        </DialogHeader>

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
              className="border-white/10 px-4 md:px-8 py-2 md:py-4 data-[state=open]:py-6 md:data-[state=open]:py-8"
            >
              <AccordionTrigger className="text-white text-sm md:text-lg font-semibold font-orbitron data-[state=open]:text-[#FBB042] outline-none">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="text-white/60 text-sm md:text-base pr-[72px]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: faq.content,
                  }}
                ></div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}

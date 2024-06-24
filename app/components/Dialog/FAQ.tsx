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

  const faqList = [
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
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[812px] bg-[#1A1A1A] border-none px-8 py-8">
        <DialogHeader className="space-y-0">
          <DialogTitle className="text-white text-[32px] font-orbitron pb-12 border-b border-solid border-white/10">
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
              className="border-white/10 px-8 py-4 data-[state=open]:py-8"
            >
              <AccordionTrigger className="text-white text-lg font-semibold font-orbitron data-[state=open]:text-[#FBB042] outline-none">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="text-white/60 text-base pr-[72px]">
                {faq.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}

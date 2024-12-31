import { Ring } from "@/app/icons/Ring";
import { InfoLogo } from "@/app/logos/InfoLogo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

export default function H5Data({ seasons }: { seasons: any[] }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full md:hidden mt-4"
      defaultValue="item-0"
    >
      {seasons.map((season, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-line py-6 gap-6 flex-v"
        >
          <AccordionTrigger className="sonic-title2 group/reward text-left font-orbitron p-0 text-icon aria-expanded:text-gold-yellow transition-colors">
            <div className="text-primary group-aria-expanded/reward:text-gold-yellow transition-colors flex items-center gap-2">
              {season.season}
            </div>
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "sonic-body3 text-tertary p-0 space-y-2 [&>*]:flex [&>*]:justify-between [&>*]:items-center"
            )}
          >
            <div>
              <p>Network</p>
              <p className="text-primary">{season.network}</p>
            </div>
            <div>
              <p>Start Date (UTC)</p>
              <p className="text-primary">{season.startDate}</p>
            </div>
            <div>
              <p>End Date (UTC)</p>
              <p className="text-primary">{season.endDate}</p>
            </div>
            <div>
              <p className="flex items-center gap-1">
                Snapshot Date (UTC){" "}
                <TooltipProvider>
                  <Tooltip open={isOpen}>
                    <TooltipTrigger
                      asChild
                      onClick={() => setIsOpen(!isOpen)}
                      aria-expanded={isOpen}
                    >
                      <button className="hover:text-white transition-colors cursor-pointer">
                        <InfoLogo />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      sideOffset={5}
                      className="z-[100] max-w-[182px] bg-bg-popup border border-line p-3"
                    >
                      <p className="sonic-body4 text-secondary">
                        This timestamp marks the exact start of the snapshot.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <p className="text-primary">{season.snapshotDate}</p>
            </div>
            <div>
              <p>Reward Rings</p>
              <p className="flex items-center gap-1 text-primary">
                <Ring width={16} height={16} color="#FBB042" />
                {season.rings}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

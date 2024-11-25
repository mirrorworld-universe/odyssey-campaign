import { Tag } from "@/app/components/Basic/Tag";
import { Ring } from "@/app/icons/Ring";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function H5Data() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full md:hidden mt-4"
      defaultValue="item-1"
    >
      <AccordionItem value={`item-1`} className="border-line py-6 gap-6 flex-v">
        <AccordionTrigger className="sonic-title2 group/reward text-left font-orbitron p-0 text-icon aria-expanded:text-gold-yellow transition-colors">
          <div className="text-primary group-aria-expanded/reward:text-gold-yellow transition-colors flex items-center gap-2">
            Season 3 <Tag text="Current" />
          </div>
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            "sonic-body3 text-tertary p-0 space-y-2 [&>*]:flex [&>*]:justify-between [&>*]:items-center"
          )}
        >
          <div>
            <p>Network</p>
            <p className="text-primary">Frontier V1</p>
          </div>
          <div>
            <p>Start Date (UTC)</p>
            <p className="text-primary">2024-09-01</p>
          </div>
          <div>
            <p>End Date (UTC)</p>
            <p className="text-primary">2024-09-30</p>
          </div>
          <div>
            <p>Snapshot Date (UTC)</p>
            <p className="text-primary">2024-09-15</p>
          </div>
          <div>
            <p>Reward Rings</p>
            <p className="flex items-center gap-1 text-primary">
              <Ring width={16} height={16} color="#FBB042" />
              100
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

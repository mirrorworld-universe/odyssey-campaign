import { Ring } from "@/app/icons/Ring";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function H5Data({ seasons }: { seasons: any[] }) {
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
              <p>Snapshot Date (UTC)</p>
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

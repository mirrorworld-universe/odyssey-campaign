import { useTaskUrl } from "@/app/hooks";
import { Go as IconGo } from "@/app/icons/Go";
import { Task } from "@/app/types/task";
import { cn, isInWalletCampaignTime } from "@/lib/utils";
import Link from "next/link";
import ExtraTags from "./ExtraTags";
import { useNetworkInfo } from "@/app/store/account";

export function TaskItem({ task }: { task: Task }) {
  const { getTaskUrl } = useTaskUrl();
  const { networkId } = useNetworkInfo();

  return (
    <Link
      href={getTaskUrl(task)}
      className={cn(
        "p-4 overflow-hidden group/task transition-colors duration-300 bg-[#1E1E1E] rounded h-[88px] md:h-[146px] relative cursor-pointer flex-v gap-4",
        getTaskUrl(task) === "#"
          ? "opacity-30 cursor-not-allowed"
          : "opacity-100 cursor-pointer hover:bg-[#181818]"
      )}
    >
      <div className="relative z-10 flex flex-col gap-2 max-w-[224px]">
        <div className="text-title2 md:text-title1 text-secondary font-orbitron flex items-center gap-2">
          {task.name}
          <IconGo
            width={20}
            height={20}
            color="rgba(255,255,255,0.7)"
            className="inline-block md:hidden"
          />
        </div>
        <div className="hidden md:block text-body4 text-tertary">
          {task.description}
        </div>
        {isInWalletCampaignTime(networkId) &&
        task.extraBonus &&
        task.extraBonus.length > 0 ? (
          <div className="md:flex hidden items-center gap-2 text-caption1 text-gold-yellow font-orbitron">
            Extra Bonus:
            {task.extraBonus?.map((extraBonus: any) => (
              <div key={extraBonus.id}>{extraBonus.icon}</div>
            ))}
          </div>
        ) : null}
      </div>
      <ExtraTags
        period={task.period}
        reward={task.reward}
        extraBonus={task.extraBonus}
      />
      <div
        className={cn(
          "absolute transition-all duration-300  rotate-[15deg] z-0",
          "-top-3 md:top-4 right-0 md:-right-8 group-hover/task:-right-4 md:group-hover/task:-right-12 size-[120px] md:size-[150px]"
        )}
      >
        {task.icon}
      </div>
    </Link>
  );
}

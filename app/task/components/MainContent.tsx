import { getTaskUrl, taskGroupList } from "@/app/data/task";
import { useNetworkInfo } from "@/app/store/account";
import { cn } from "@/lib/utils";
import { UTCDate } from "@date-fns/utc";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { Go as IconGo } from "@/app/icons/Go";
import { ExtraBonus } from "@/app/types/task";

export default function MainContent() {
  const { wallet } = useWallet();
  const { networkId } = useNetworkInfo();

  return (
    <div
      className={cn(
        "max-w-view mx-auto px-4 w-full md:pb-12",
        "flex flex-col gap-8 md:gap-12"
      )}
    >
      {taskGroupList.map((taskGroup, index) => (
        <div className="md:p-10 p-4 border border-line relative" key={index}>
          <div className="absolute top-0 left-2 md:left-[22px] px-1 md:px-4 bg-[#111] -translate-y-1/2 font-orbitron text-title4 md:text-title2">
            {taskGroup.name}
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(324px,1fr))] md:gap-10 gap-5">
            {taskGroup.list
              .filter((task) => hasTaskStarted(task.startTime))
              .map((task, taskIndex: number) => (
                <Link
                  href={getTaskUrl(task, wallet?.adapter.name, networkId)}
                  key={taskIndex}
                  className={cn(
                    "p-4 overflow-hidden group/task transition-colors duration-300 bg-[#1E1E1E] rounded h-[88px] md:h-[146px] relative cursor-pointer flex-v gap-4",
                    getTaskUrl(task, wallet?.adapter.name, networkId) === "#"
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
                    {task.extraBonus && task.extraBonus.length > 0 ? (
                      <div className="md:flex hidden items-center gap-2 text-caption1 text-gold-yellow font-orbitron">
                        Extra Bonus:
                        {task.extraBonus?.map((extraBonus: any) => (
                          <div key={extraBonus.id}>{extraBonus.icon}</div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <HourPeriod
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
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const hasTaskStarted = (startTime?: string) => {
  if (!startTime) {
    return true;
  }
  const now = new UTCDate();
  const startShowTime = new UTCDate(startTime);
  return now >= startShowTime;
};

function HourPeriod({
  period,
  reward,
  extraBonus = []
}: {
  period: string;
  reward?: string;
  extraBonus?: ExtraBonus[];
}) {
  const hasExtraBonus = extraBonus.length > 0;
  const hasReward = reward && reward.length > 0 && extraBonus.length === 0;

  return (
    <>
      <div className="md:hidden flex items-center gap-2 text-ten font-orbitron relative z-10">
        <div className="w-fit px-2 py-0.5 bg-[#1F2B33] text-link">{period}</div>
        {hasExtraBonus && (
          <div className="flex items-center gap-2 bg-bg-tag px-2 py-0.5 text-gold-yellow">
            Extra Bonus:
            {extraBonus.map((extraBonus) => extraBonus.icon)}
          </div>
        )}

        {hasReward && (
          <div className="w-fit text-gold-yellow bg-bg-tag px-2 py-0.5">
            {reward}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 hidden md:flex items-center h-5">
        <div className="relative flex items-center z-10 font-orbitron">
          <p className="text-ten w-[117px] flex pl-2">{period}</p>
          {reward ? (
            <div className="text-ten text-gold-yellow">{reward}</div>
          ) : null}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="117"
          height="21"
          viewBox="0 0 117 21"
          fill="none"
          className="absolute bottom-0 left-0"
        >
          <path
            d="M0 0H101.641C102.329 0 102.972 0.340627 103.358 0.909541L117 21H2.07541C0.929194 21 0 20.0708 0 18.9246V0Z"
            fill="#25A3ED"
          />
        </svg>
      </div>
    </>
  );
}

import { ExtraBonus } from "@/app/types/task";

export default function ExtraTags({
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
          <p className="text-ten w-[117px] flex pl-2 text-center">
            <span className="inline-block w-[92px]">{period}</span>
          </p>
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

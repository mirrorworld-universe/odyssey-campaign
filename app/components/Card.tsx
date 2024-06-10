import { cn } from "@/lib/utils";

export enum CardSize {
  Default = "default",
  Medium = "medium",
  Small = "small",
}

export function Card({
  name,
  nameClassName,
  size = CardSize.Default,
  className,
  children,
}: any) {
  const cardClass: any = {
    [CardSize.Medium]: "px-10 py-10 rounded-xl",
    [CardSize.Small]: "px-4 py-4 rounded",
  };

  const nameClass: any = {
    [CardSize.Medium]: "text-[28px] top-[-22px] px-4",
    [CardSize.Small]: "text-[16px] top-[-12px] px-1 left-[13px]",
  };

  return (
    <div
      className={`flex flex-wrap flex-row gap-10 w-full border border-solid border-[#535353] text-white/60 relative ${
        size === CardSize.Default ? "px-12 py-12 rounded-xl" : cardClass[size]
      } ${className}`}
    >
      {/* name */}
      {name && (
        <h4
          className={cn(
            `text-white font-semibold font-orbitron px-4 bg-[#000000] absolute left-7 z-0 ${
              size === CardSize.Default
                ? "text-[32px] top-[-28px]"
                : nameClass[size]
            }`,
            nameClassName
          )}
        >
          {name}
        </h4>
      )}
      {/* content */}
      <div className="content w-full">{children}</div>
    </div>
  );
}

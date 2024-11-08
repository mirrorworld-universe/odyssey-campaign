import { cn } from "@/lib/utils";

export enum CardSize {
  Default = "default",
  Medium = "medium",
  Small = "small",
  List = "list"
}

export function Card({
  name,
  nameClassName,
  contentClassName,
  size = CardSize.Default,
  className,
  children
}: any) {
  const cardClass: any = {
    [CardSize.Medium]: "px-10 py-10 rounded-xl",
    [CardSize.Small]: "px-4 py-4 rounded",
    [CardSize.List]: "px-0 py-6 rounded-xl"
  };

  const nameClass: any = {
    [CardSize.Medium]: "text-[28px] -top-[22px] px-4",
    [CardSize.Small]: "text-base -top-3 px-1 left-[13px]"
  };

  return (
    <div
      className={cn(
        `flex flex-wrap flex-row gap-10 w-full border border-solid border-white/20 text-white/60 relative ${
          size === CardSize.Default ? "px-12 py-12 rounded-xl" : cardClass[size]
        }`,
        className
      )}
    >
      {/* name */}
      {name && (
        <h4
          className={cn(
            `text-white font-semibold font-orbitron px-4 bg-[#111111] absolute left-7 z-0 ${
              size === CardSize.Default ? "text-[32px] -top-7" : nameClass[size]
            }`,
            nameClassName
          )}
        >
          {name}
        </h4>
      )}
      {/* content */}
      <div className={cn("content w-full h-auto", contentClassName)}>
        {children}
      </div>
    </div>
  );
}

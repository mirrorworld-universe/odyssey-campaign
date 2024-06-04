export enum CardSize {
  Default = "default",
  Medium = "medium",
}

export function Card({
  name,
  size = CardSize.Default,
  className,
  children,
}: any) {
  return (
    <div
      className={`flex flex-wrap flex-row gap-10 w-full border border-solid border-[#535353] text-white/60 rounded-xl relative ${
        size === CardSize.Default ? "px-12 py-12" : "px-10 py-10"
      } ${className}`}
    >
      {/* name */}
      {name && (
        <h4
          className={`text-white font-semibold font-orbitron px-4 bg-black absolute left-7 z-0 ${
            size === CardSize.Default
              ? "text-[32px] top-[-32px]"
              : "text-[28px] top-[-28px]"
          }`}
        >
          {name}
        </h4>
      )}
      {/* content */}
      <div className="content">{children}</div>
    </div>
  );
}

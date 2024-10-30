import { cn } from "@/lib/utils";

export function MileStoneLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-[#313131] size-full", props.className)}
      {...props}
    >
      <path
        d="M41.8287 140.625L41.8287 93.186L20.9756 59.375L47.9584 15.625L102.046 15.625L129.029 59.375L108.176 93.186L108.176 140.625L75.0022 129.388L41.8287 140.625ZM51.2037 127.367L75.0022 119.447L98.8006 127.367L98.8006 103.125L51.2037 103.125L51.2037 127.367ZM53.1865 25L31.9365 59.375L53.1865 93.75L96.8178 93.75L118.068 59.375L96.8178 25L53.1865 25ZM68.4397 82.6203L48.4756 62.8125L55.1584 56.1297L68.4397 69.4109L94.8459 42.8484L101.529 49.375L68.4397 82.6203Z"
        fill="currentColor"
      />
    </svg>
  );
}

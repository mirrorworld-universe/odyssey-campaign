import { cn } from "@/lib/utils";

export function CheckInLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      {...props}
      className={cn("text-[#313131] size-full", props.className)}
    >
      <path
        d="M68.4385 112.403L48.415 92.3793L55.1932 85.6012L68.4385 98.8465L94.8088 72.4762L101.587 79.2543L68.4385 112.403ZM21.876 134.375L21.876 28.1246L41.8275 28.1246L41.8275 14.9043L51.4432 14.9043L51.4432 28.1246L98.7994 28.1246L98.7994 14.9043L108.174 14.9043L108.174 28.1246L128.126 28.1246L128.126 134.375L21.876 134.375ZM31.251 125L118.751 125L118.751 64.423L31.251 64.423L31.251 125ZM31.251 55.048L118.751 55.048L118.751 37.4996L31.251 37.4996L31.251 55.048Z"
        fill="currentColor"
      />
    </svg>
  );
}

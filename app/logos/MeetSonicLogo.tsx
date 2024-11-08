import { cn } from "@/lib/utils";

export function MeetSonicLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="151"
      height="151"
      viewBox="0 0 151 151"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-[#313131] size-full opacity-50", props.className)}
      {...props}
    >
      <path
        d="M107.923 28.9564H124.215L88.621 69.6381L130.495 124.997H97.7079L72.0282 91.4219L42.6448 124.997H26.3426L64.4139 81.483L24.2445 28.9564H57.8635L81.0757 59.645L107.923 28.9564ZM102.205 115.245H111.232L52.9581 38.196H43.2703L102.205 115.245Z"
        fill="currentColor"
      />
    </svg>
  );
}

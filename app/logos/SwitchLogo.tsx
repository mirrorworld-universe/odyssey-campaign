import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export function SwitchLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className={cn("text-[#FBD314]", className)}
      {...props}
    >
      <g mask="url(#mask0_664_57452)">
        <path
          d="M19.2001 52.7992L6.40012 39.9992L19.2001 27.1992L22.6001 30.5992L15.6001 37.5992H35.2001V42.3992H15.6001L22.6001 49.3992L19.2001 52.7992ZM44.8001 36.7992L41.4001 33.3992L48.4001 26.3992H28.8001V21.5992H48.4001L41.4001 14.5992L44.8001 11.1992L57.6001 23.9992L44.8001 36.7992Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

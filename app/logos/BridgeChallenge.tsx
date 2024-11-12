import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export function BridgeChallengeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("text-[#313131] size-full opacity-50", props.className)}
    >
      <path
        d="M57.7558 131.384L19.4825 109.287L41.5796 71.014L52.3366 77.3521L40.9566 97.0629L84.2723 85.4564L87.5075 97.5305L44.1918 109.137L63.9026 120.517L57.7558 131.384ZM108.42 78.986L97.6635 72.6479L109.044 52.9371L65.7278 64.5435L62.4925 52.4695L105.808 40.863L86.0975 29.483L92.2443 18.6156L130.518 40.7127L108.42 78.986Z"
        fill="currentColor"
      />
    </svg>
  );
}

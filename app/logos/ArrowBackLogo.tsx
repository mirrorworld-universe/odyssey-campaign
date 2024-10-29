import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export function ArrowBackLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      className={cn("text-icon", props.className)}
    >
      <path
        d="M15.9748 2L17.7498 3.775L9.52475 12L17.7498 20.225L15.9748 22L5.97475 12L15.9748 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

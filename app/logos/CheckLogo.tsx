import { cn } from "@/lib/utils";
import { SVGProps } from "react";
export function CheckLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("text-success", props.className)}
    >
      <path
        d="M9.29448 19L3 12.3638L4.57362 10.7048L9.29448 15.6819L19.4264 5L21 6.65904L9.29448 19Z"
        fill="currentColor"
      />
    </svg>
  );
}

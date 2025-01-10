import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export function SegaLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      className={cn("text-[#313131] size-full opacity-50", className)}
      {...props}
    >
      <path
        d="M46.2046 105.107L15.586 87.4298L33.2637 56.8112L41.8692 61.8816L32.7652 77.6502L67.4178 68.3651L70.006 78.0244L35.3534 87.3095L51.122 96.4135L46.2046 105.107ZM86.7363 63.1887L78.1308 58.1182L87.2348 42.3496L52.5822 51.6348L49.994 41.9755L84.6466 32.6904L68.878 23.5864L73.7954 14.8924L104.414 32.5701L86.7363 63.1887Z"
        fill="currentColor"
      />
    </svg>
  );
}

import { cn } from "@/lib/utils";

export function MysteryNftLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-[#313131] size-full opacity-50", props.className)}
      {...props}
    >
      <path
        d="M70.3125 122.307L70.3125 77.6914L31.25 55.0711L31.25 99.6867L70.3125 122.307ZM79.6875 122.307L118.75 99.6867L118.75 55.0711L79.6875 77.6914L79.6875 122.307ZM75 69.6148L113.594 47.307L75 24.9992L36.4063 47.307L75 69.6148ZM21.875 105.227L21.875 44.7711L75 14.2305L128.125 44.7711L128.125 105.227L75 135.768L21.875 105.227Z"
        fill="currentColor"
      />
    </svg>
  );
}

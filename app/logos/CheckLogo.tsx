import { cn } from "@/lib/utils";

export function CheckLogo({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-success", className)}
    >
      <path
        d="M9.29448 19L3 12.3638L4.57362 10.7048L9.29448 15.6819L19.4264 5L21 6.65904L9.29448 19Z"
        fill="currentColor"
      />
    </svg>
  );
}

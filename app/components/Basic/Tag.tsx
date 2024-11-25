import { cn } from "@/lib/utils";

interface TagProps {
  text: string;
  className?: string;
}

export function Tag({ text, className }: TagProps) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 bg-bg-tag sonic-caption1 text-gold-yellow",
        className
      )}
    >
      {text}
    </span>
  );
}

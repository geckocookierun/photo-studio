import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  once?: boolean;
};

/** CSS-only reveal — no client JS / IntersectionObserver. */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      className={cn("animate-fade-up", className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

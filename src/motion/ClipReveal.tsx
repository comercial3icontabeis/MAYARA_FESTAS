"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Direction = "up" | "down" | "left" | "right";

const FROM: Record<Direction, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
};

type Props = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  start?: string;
};

/** Revela qualquer conteúdo com clip-path ao entrar no viewport. */
export function ClipReveal({ children, className, direction = "up", delay = 0, duration = 1.4, start = "top 85%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ref.current,
          { clipPath: FROM[direction] },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration,
            delay,
            ease: "expo.inOut",
            scrollTrigger: { trigger: ref.current, start, once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

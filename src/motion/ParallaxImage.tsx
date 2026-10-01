"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** Intensidade do deslocamento em % da altura (padrão 10). */
  amount?: number;
};

/** Parallax vertical ligado à rolagem. A moldura fica fixa; a foto desliza dentro dela. */
export function ParallaxImage({ children, className, amount = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ position: "relative", overflow: "hidden" }}>
      <div ref={inner} style={{ position: "absolute", inset: `-${amount}% 0`, willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

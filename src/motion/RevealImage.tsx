"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
};

/**
 * Image reveal: a moldura abre de baixo para cima enquanto a foto
 * desacelera de uma escala maior — uma "cortina" fotográfica.
 * O filho deve ser um <Photo /> (absolute, inset 0).
 */
export function RevealImage({ children, className, delay = 0, start = "top 88%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          delay,
          scrollTrigger: { trigger: ref.current, start, once: true },
        });
        tl.fromTo(
          ref.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
        ).fromTo(inner.current, { scale: 1.3 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.15);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ position: "relative", overflow: "hidden" }}>
      <div ref={inner} style={{ position: "absolute", inset: 0 }}>
        {children}
      </div>
    </div>
  );
}

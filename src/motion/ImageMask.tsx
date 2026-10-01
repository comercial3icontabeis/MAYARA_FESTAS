"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** clip-path inicial (ex.: "inset(18% 22% 18% 22%)"). Abre até preencher a moldura. */
  from?: string;
  start?: string;
  end?: string;
};

/** Máscara que abre conforme a rolagem (scrub), com leve zoom-out da foto. */
export function ImageMask({
  children,
  className,
  from = "inset(16% 20% 16% 20%)",
  start = "top 90%",
  end = "top 20%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start, end, scrub: 0.6 } });
        tl.fromTo(ref.current, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0).fromTo(
          inner.current,
          { scale: 1.25 },
          { scale: 1, ease: "none" },
          0,
        );
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

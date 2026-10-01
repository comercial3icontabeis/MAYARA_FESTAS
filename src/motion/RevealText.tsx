"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  /** "lines" (padrão) sobe linha por linha; "words" para títulos curtos. */
  split?: "lines" | "words";
  delay?: number;
  stagger?: number;
  start?: string;
};

/** Texto que sobe linha a linha por trás de uma máscara ao entrar no viewport. */
export function RevealText({
  as: Tag = "p",
  children,
  className,
  id,
  split = "lines",
  delay = 0,
  stagger = 0.09,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const el = ref.current;
        if (!el) return;
        const st = SplitText.create(el, {
          type: split,
          mask: split,
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(split === "lines" ? self.lines : self.words, {
              yPercent: 115,
              duration: 1.3,
              delay,
              stagger,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start, once: true },
            }),
        });
        return () => st.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

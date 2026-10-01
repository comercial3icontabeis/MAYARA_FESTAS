"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Props = { value: number; prefix?: string; suffix?: string; className?: string };

const fmt = (n: number) => Math.round(n).toLocaleString("pt-BR");

/**
 * Contador animado. Só deve ser usado com números REAIS.
 * O valor final já vem renderizado do servidor (SEO / sem JS / movimento reduzido).
 */
export function AnimatedCounter({ value, prefix = "", suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const el = ref.current;
        if (!el) return;
        const obj = { n: 0 };
        el.textContent = fmt(0);
        gsap.to(obj, {
          n: value,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = fmt(obj.n);
          },
        });
        return () => {
          el.textContent = fmt(value);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>{fmt(value)}</span>
      {suffix}
    </span>
  );
}

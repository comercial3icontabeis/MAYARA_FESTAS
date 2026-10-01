"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

let firstLoad = true;

/**
 * Transição entre páginas: uma cortina na cor do fundo recolhe para cima
 * ao montar a nova rota. Não roda no primeiro carregamento (o Hero já tem
 * a sua própria entrada) nem com movimento reduzido.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        curtain.current,
        { clipPath: "inset(0% 0% 0% 0%)", visibility: "visible" },
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.1,
          ease: "expo.inOut",
          onComplete: () => {
            gsap.set(curtain.current, { visibility: "hidden" });
          },
        },
      );
    });
    return () => mm.revert();
  });

  return (
    <>
      <div
        ref={curtain}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 150,
          background: "var(--night)",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      />
      {children}
    </>
  );
}

"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./HorizontalScroll.module.css";

/** Animação horizontal "mãe" — painéis podem usá-la como containerAnimation. */
const HorizontalContext = createContext<gsap.core.Tween | null>(null);
export const useHorizontalAnimation = () => useContext(HorizontalContext);

type Listener = (p: number) => void;

type Props = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** Conteúdo sobreposto (ex.: contador, barra de progresso). Recebe progresso 0–1. */
  overlay?: (progress: number) => ReactNode;
  label?: string;
};

/** Só o overlay re-renderiza a cada frame — os painéis ficam intactos. */
function Overlay({ render, subscribe }: { render: (p: number) => ReactNode; subscribe: (l: Listener) => () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => subscribe(setP), [subscribe]);
  return <>{render(p)}</>;
}

/**
 * Rolagem horizontal controlada pela rolagem vertical (desktop).
 * - Desktop + movimento: seção fixada (pin) e trilho deslocado com ScrollTrigger.
 * - Mobile: trilho nativo com swipe e scroll-snap (touch-friendly).
 * - Movimento reduzido no desktop: painéis em grade, sem rolagem lateral.
 */
export function HorizontalScroll({ children, className, trackClassName, overlay, label }: Props) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [tween, setTween] = useState<gsap.core.Tween | null>(null);
  const listeners = useRef(new Set<Listener>());
  const emit = (p: number) => listeners.current.forEach((l) => l(p));
  const subscribe = useRef((l: Listener) => {
    listeners.current.add(l);
    return () => {
      listeners.current.delete(l);
    };
  }).current;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        const t = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => emit(self.progress),
          },
        });
        setTween(t);
        return () => setTween(null);
      });

      mm.add("(max-width: 899px)", () => {
        const el = track.current!;
        const onScroll = () => {
          const max = el.scrollWidth - el.clientWidth;
          emit(max > 0 ? el.scrollLeft / max : 0);
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <HorizontalContext.Provider value={tween}>
      <div ref={section} className={`${styles.section} ${className ?? ""}`}>
        <div ref={track} className={`${styles.track} ${trackClassName ?? ""}`} role="region" aria-label={label} tabIndex={0}>
          {children}
        </div>
        {overlay && <Overlay render={overlay} subscribe={subscribe} />}
      </div>
    </HorizontalContext.Provider>
  );
}

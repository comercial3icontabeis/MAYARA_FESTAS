"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Infra global de movimento:
 * - recalcula ScrollTriggers depois que fontes e imagens carregam;
 * - rolagem suave para âncoras internas (/#acervo etc.), respeitando movimento reduzido.
 */
export function MotionProvider() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      history.pushState(null, "", url.hash);
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

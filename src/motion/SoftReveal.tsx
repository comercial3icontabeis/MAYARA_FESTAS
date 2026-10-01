"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Versão suave para quem pediu movimento reduzido (UX #9 / #99):
 * sem parallax, zoom, pins ou deslocamentos — só opacidade, que não provoca
 * desconforto vestibular. Títulos, textos e fotos surgem ao entrar na tela.
 *
 * Usa IntersectionObserver (funciona com saltos de âncora e rolagem rápida)
 * e tem uma rede de segurança: nada fica invisível se algo falhar.
 * Com movimento liberado, não faz nada — as seções têm a coreografia completa.
 */
const TARGETS = [
  "main section h1",
  "main section h2",
  "main section p",
  "main figure",
  "main section li",
  "main section blockquote",
].join(",");

export function SoftReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const vh = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      // só o que começa abaixo da dobra; o que já está visível não pisca
      (el) => el.getBoundingClientRect().top > vh * 0.9,
    );

    const show = (el: HTMLElement) => el.setAttribute("data-soft", "in");
    els.forEach((el) => el.setAttribute("data-soft", ""));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // Rede de segurança: tudo que já passou pela tela aparece, mesmo se o observer falhar
    const safety = () => {
      const limit = window.innerHeight;
      els.forEach((el) => {
        if (el.getAttribute("data-soft") !== "in" && el.getBoundingClientRect().top < limit) show(el);
      });
    };
    let t: number | undefined;
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(safety, 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
      els.forEach((el) => el.removeAttribute("data-soft"));
    };
  }, [pathname]);

  return null;
}

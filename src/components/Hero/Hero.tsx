"use client";

import { useRef } from "react";
import { media, resolvePhoto } from "@/data/media";
import type { GalleryItem } from "@/data/gallery";
import { Photo } from "@/components/Photo/Photo";
import { QuoteButton } from "@/components/ui/Cta";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./Hero.module.css";

const LINES = ["A festa", "começa nos", "detalhes."];

/**
 * Hero.
 * - Com public/fotos/hero.jpg (alta resolução): foto da festa em tela cheia.
 * - Sem ela: três painéis em arco com as fotos da galeria — o mesmo desenho
 *   dos painéis que a Mayara monta nas festas.
 */
export function Hero({ panels }: { panels: GalleryItem[] }) {
  const root = useRef<HTMLElement>(null);
  const fullBleed = Boolean(resolvePhoto(media.hero));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(root);
        gsap.set(q("[data-hero-init]"), { opacity: 1 });

        /* Entrada: painéis sobem como se fossem montados → título linha a linha → texto → botões */
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        if (fullBleed) {
          intro.fromTo(q(`.${styles.bleed}`), { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 2.6 }, 0);
        } else {
          intro.fromTo(
            q(`.${styles.arch}`),
            { clipPath: "inset(100% 0% 0% 0%)", yPercent: 12 },
            { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 1.8, stagger: 0.14, ease: "expo.inOut" },
            0.1,
          );
        }
        intro
          .from(q(`.${styles.label}`), { y: 16, opacity: 0, duration: 1.2 }, 0.5)
          .from(q(".line-inner"), { yPercent: 112, duration: 1.5, stagger: 0.12 }, 0.65)
          .from(q(`.${styles.sub}`), { y: 22, opacity: 0, duration: 1.3 }, 1.25)
          .from(q(`.${styles.ctas} > *`), { y: 18, opacity: 0, duration: 1.2, stagger: 0.1 }, 1.45);

        /* Rolagem: conteúdo sobe e some; painéis em velocidades diferentes; a próxima seção cobre o hero */
        const out = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true, pin: true, pinSpacing: false },
        });
        out.to(q(`.${styles.copy}`), { yPercent: -30, opacity: 0, ease: "none" }, 0);
        if (fullBleed) {
          out.to(q(`.${styles.bleedZoom}`), { scale: 1.12, ease: "none" }, 0);
        } else {
          q(`.${styles.arch}`).forEach((el: Element, i: number) => {
            out.to(el, { yPercent: [-18, -32, -10][i % 3], ease: "none" }, 0);
          });
        }
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} data-mode={fullBleed ? "bleed" : "panels"} aria-labelledby="hero-title">
      {fullBleed ? (
        <div className={styles.bleed} data-hero-init>
          <div className={styles.bleedZoom}>
            <Photo media={media.hero} sizes="100vw" priority />
          </div>
          <div className={styles.shade} aria-hidden="true" />
        </div>
      ) : (
        <div className={styles.panels} data-hero-init>
          {panels.slice(0, 3).map((p, i) => (
            <figure key={i} className={styles.arch} data-i={i}>
              <Photo media={p.media} sizes="(min-width: 900px) 22vw, 33vw" priority={i === 1} compact />
            </figure>
          ))}
        </div>
      )}

      <div className={`${styles.copy} container`}>
        <p className={styles.label} data-hero-init>
          [ CELEBRAÇÕES ]
        </p>
        <h1 id="hero-title" className={`${styles.title} display`} data-hero-init>
          {LINES.map((line) => (
            <span key={line} className="line-mask">
              <span className="line-inner">{line}</span>
            </span>
          ))}
        </h1>
        <p className={`${styles.sub} lead`} data-hero-init>
          Locação e fornecimento de artigos para criar ambientes que combinam com cada momento.
        </p>
        <div className={styles.ctas} data-hero-init>
          <QuoteButton tone="light">Criar minha festa</QuoteButton>
          <a href="#acervo" className="btn btn--ghost btn--light">
            Explorar o acervo
          </a>
        </div>
      </div>
    </section>
  );
}

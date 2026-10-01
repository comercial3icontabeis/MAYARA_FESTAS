"use client";

import { useRef } from "react";
import { media } from "@/data/media";
import { Photo } from "@/components/Photo/Photo";
import { QuoteButton } from "@/components/ui/Cta";
import { Arrow } from "@/components/ui/Arrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./Hero.module.css";

const LINES = ["A festa", "começa nos", "detalhes."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(root);

        /* Entrada: imagem → label → headline linha a linha → subheadline → CTAs */
        /* Libera os elementos escondidos via CSS ANTES de criar os tweens .from(),
           para que eles animem até a opacidade final correta (1). */
        gsap.set(q("[data-hero-init]"), { opacity: 1 });
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .fromTo(q(`.${styles.media}`), { opacity: 0, scale: 1.18 }, { opacity: 1, scale: 1, duration: 2.6 }, 0)
          .from(q(`.${styles.label}`), { y: 18, opacity: 0, duration: 1.2 }, 0.45)
          .from(q(".line-inner"), { yPercent: 112, duration: 1.5, stagger: 0.12 }, 0.6)
          .from(q(`.${styles.sub}`), { y: 24, opacity: 0, duration: 1.3 }, 1.25)
          .from(q(`.${styles.ctas} > *`), { y: 20, opacity: 0, duration: 1.2, stagger: 0.1 }, 1.45)
          .from(q(`.${styles.scroll}`), { opacity: 0, duration: 1.2 }, 1.8);

        /* Rolagem: zoom leve, headline sobe devagar, conteúdo some, próxima seção cobre o hero */
        const out = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });
        out
          .to(q(`.${styles.zoom}`), { scale: 1.12, ease: "none" }, 0)
          .to(q(`.${styles.shade}`), { opacity: 0.75, ease: "none" }, 0)
          .to(q(`.${styles.title}`), { yPercent: -28, ease: "none" }, 0)
          .to(q(`.${styles.aside}`), { yPercent: -40, opacity: 0, ease: "none" }, 0)
          .to(q(`.${styles.content}`), { opacity: 0, ease: "power1.in" }, 0.15);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media} data-hero-init>
        <div className={styles.zoom}>
          <Photo media={media.hero} sizes="100vw" priority quality={85} caption="top" />
        </div>
        <div className={styles.shade} aria-hidden="true" />
      </div>

      <div className={`${styles.content} container`}>
        <p className={`${styles.label} label`} data-hero-init>
          [ Celebrações ]
        </p>

        <h1 id="hero-title" className={`${styles.title} display`} data-hero-init>
          {LINES.map((line, i) => (
            <span key={line} className="line-mask">
              <span className="line-inner">{i === 2 ? <em>{line}</em> : line}</span>
            </span>
          ))}
        </h1>

        <div className={styles.aside}>
          <p className={`${styles.sub} lead`} data-hero-init>
            Locação e fornecimento de artigos para criar ambientes que combinam com cada momento.
          </p>
          <div className={styles.ctas} data-hero-init>
            <QuoteButton tone="light">Criar minha festa</QuoteButton>
            <a href="#acervo" className="btn btn--ghost btn--light">
              Explorar o acervo <Arrow />
            </a>
          </div>
        </div>
      </div>

      <a href="#manifesto" className={styles.scroll} data-hero-init aria-label="Rolar para o conteúdo">
        <span className="label">Role</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}

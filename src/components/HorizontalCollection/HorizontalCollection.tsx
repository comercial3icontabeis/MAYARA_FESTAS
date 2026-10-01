"use client";

import Link from "next/link";
import { useRef } from "react";
import { collections, type Collection } from "@/data/collections";
import { Photo } from "@/components/Photo/Photo";
import { HorizontalScroll, useHorizontalAnimation } from "@/motion/HorizontalScroll";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./HorizontalCollection.module.css";

function Panel({ c, index }: { c: Collection; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const container = useHorizontalAnimation();

  /* Parallax interno da foto e entrada do texto, sincronizados com o trilho horizontal */
  useGSAP(
    () => {
      if (!container) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(
          q(`.${styles.photoInner}`),
          { xPercent: -9 },
          {
            xPercent: 9,
            ease: "none",
            scrollTrigger: { trigger: ref.current, containerAnimation: container, start: "left right", end: "right left", scrub: true },
          },
        );
        gsap.from(q(`.${styles.text} > *`), {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 1.2,
          scrollTrigger: { trigger: ref.current, containerAnimation: container, start: "left 70%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [container] },
  );

  const n = String(index + 1).padStart(2, "0");
  return (
    <article ref={ref} className={styles.panel} data-alt={index % 2 === 1 || undefined} aria-labelledby={`col-${c.slug}`}>
      <Link href={`/acervo/${c.slug}`} className={styles.photo} tabIndex={-1} aria-hidden="true">
        <div className={styles.photoInner}>
          <Photo media={c.photo} sizes="(min-width: 900px) 52vw, 84vw" />
        </div>
      </Link>
      <div className={styles.text}>
        <span className={styles.num} aria-hidden="true">
          {n}
        </span>
        <h3 id={`col-${c.slug}`} className="h3">
          {c.title}
        </h3>
        <p className={styles.tagline}>“{c.tagline}”</p>
        <Link href={`/acervo/${c.slug}`} className={`${styles.more} label`}>
          <span className="link-line">Ver categoria</span>
        </Link>
      </div>
    </article>
  );
}

export function HorizontalCollection() {
  const total = String(collections.length).padStart(2, "0");

  return (
    <HorizontalScroll
      className={styles.wrap}
      trackClassName={styles.track}
      label="Categorias do acervo — role para navegar"
      overlay={(p) => {
        const current = Math.min(collections.length, Math.floor(p * collections.length) + 1);
        return (
          <div className={styles.overlay} aria-hidden="true">
            <span className="num">
              {String(current).padStart(2, "0")} / {total}
            </span>
            <span className={styles.bar}>
              <span style={{ transform: `scaleX(${Math.max(p, 0.02)})` }} />
            </span>
            <span className={`${styles.hint} label`}>Role para explorar</span>
          </div>
        );
      }}
    >
      {collections.map((c, i) => (
        <Panel key={c.slug} c={c} index={i} />
      ))}
      <div className={styles.end}>
        <p className="h3">
          Não encontrou o que procura? Fale com a gente.
        </p>
        <Link href="/acervo" className={`${styles.more} label`}>
          <span className="link-line">Ver todo o acervo</span>
        </Link>
      </div>
    </HorizontalScroll>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { RevealText } from "@/motion/RevealText";
import styles from "./Testimonials.module.css";

/** Exibido enquanto não houver depoimentos reais cadastrados. */
const PLACEHOLDER: Testimonial = {
  quote: "[Depoimento real de um cliente, com autorização — cadastre em src/data/testimonials.ts]",
  name: "[Nome do cliente]",
  event: "[Tipo de evento]",
};

const INTERVAL = 7000;

export function Testimonials() {
  const list = testimonials.length ? testimonials : [PLACEHOLDER];
  const isPlaceholder = testimonials.length === 0;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (list.length < 2 || paused || reduce.current) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % list.length), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, list.length]);

  const go = (d: number) => setIndex((i) => (i + d + list.length) % list.length);

  return (
    <section
      className={styles.section}
      aria-labelledby="depoimentos-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={`${styles.grid} container`}>
        <div className={styles.head}>
          <p className="label dim">[ Depoimentos ]</p>
          <RevealText as="h2" id="depoimentos-title" className={`${styles.title} h2`}>
            Quem celebrou com a gente, <em>conta.</em>
          </RevealText>
        </div>

        <div className={styles.stage} aria-live={paused ? "polite" : "off"} aria-roledescription="carrossel">
          {list.map((t, i) => (
            <figure
              key={i}
              className={styles.slide}
              data-active={i === index || undefined}
              aria-hidden={i !== index}
              aria-roledescription="depoimento"
            >
              <span className={styles.mark} aria-hidden="true">
                “
              </span>
              <blockquote className={`${styles.quote} ${isPlaceholder ? styles.ph : ""}`}>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className={styles.cite}>
                <span className={styles.dash} aria-hidden="true" />
                <span className="label">{t.name}</span>
                {(t.event || t.year) && (
                  <span className={`${styles.meta} label`}>{[t.event, t.year].filter(Boolean).join(" · ")}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {list.length > 1 && (
          <div className={styles.controls}>
            <span className="num">
              {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior" className="link-line label">
              Anterior
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Próximo depoimento" className="link-line label">
              Próximo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

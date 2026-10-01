"use client";

import { useRef, useState } from "react";
import type { GalleryItem } from "@/data/gallery";
import { Photo } from "@/components/Photo/Photo";
import { ParallaxImage } from "@/motion/ParallaxImage";
import { RevealText } from "@/motion/RevealText";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./Portfolio.module.css";

/**
 * Portfólio: todas as fotos de public/fotos/galeria, numa composição assimétrica.
 * Espaços vazios aparecem enquanto houver menos fotos que `portfolioMinSlots`.
 */
export function Portfolio({ items }: { items: GalleryItem[] }) {
  const root = useRef<HTMLElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MQ.motion, () => {
        q(`.${styles.item}`).forEach((el: Element, i: number) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(14% 10% 0% 10%)", opacity: 0.3 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.6,
              ease: "expo.out",
              delay: (i % 2) * 0.12,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });
      });

      mm.add("(hover: hover) and (pointer: fine)", () => {
        const c = cursor.current!;
        const xTo = gsap.quickTo(c, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(c, "y", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="portfolio" className={styles.section} aria-labelledby="portfolio-title" tabIndex={-1}>
      <div className="container">
        <header className={styles.head}>
          <RevealText as="h2" id="portfolio-title" className="h2">
            Já fizemos parte de muitas histórias.
          </RevealText>
          <p className={styles.note}>Algumas das decorações que a Mayara montou. Cada uma pensada para uma festa só.</p>
        </header>

        <div className={styles.gallery}>
          {items.map((item, i) => (
            <figure
              key={`${item.media.slot}-${i}`}
              className={styles.item}
              data-empty={item.empty || undefined}
              onPointerEnter={() => setLabel(item.empty ? "" : item.title)}
              onPointerLeave={() => setLabel("")}
            >
              <ParallaxImage className={styles.frame} amount={6}>
                <Photo media={item.media} sizes="(min-width: 900px) 34vw, 50vw" />
              </ParallaxImage>
              <figcaption className={styles.caption}>
                <span className={styles.num}>{String(i + 1).padStart(3, "0")}</span>
                <span>{item.title}</span>
                {item.detail && <span className={styles.detail}>{item.detail}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div ref={cursor} className={styles.cursor} data-visible={label ? true : undefined} aria-hidden="true">
        <span>{label}</span>
      </div>
    </section>
  );
}

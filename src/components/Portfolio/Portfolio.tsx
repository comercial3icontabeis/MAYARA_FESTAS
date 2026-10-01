"use client";

import { useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Photo } from "@/components/Photo/Photo";
import { ParallaxImage } from "@/motion/ParallaxImage";
import { RevealText } from "@/motion/RevealText";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./Portfolio.module.css";

export function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      /* Molduras se abrem ao entrar; ritmos diferentes para quebrar a grade */
      mm.add(MQ.motion, () => {
        q(`.${styles.item}`).forEach((el: Element, i: number) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(12% 8% 12% 8%)", opacity: 0.2 },
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

      /* Cursor personalizado (somente mouse) */
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
          <p className="label dim">[ Portfólio ]</p>
          <RevealText as="h2" id="portfolio-title" className="h2">
            Já fizemos parte de <em>muitas histórias.</em>
          </RevealText>
        </header>

        <div className={styles.gallery}>
          {portfolio.map((item, i) => (
            <figure
              key={`${item.title}-${i}`}
              className={styles.item}
              data-layout={item.layout}
              data-slot={i < 6 ? i : undefined}
              onPointerEnter={() => setLabel(item.title)}
              onPointerLeave={() => setLabel("")}
            >
              <ParallaxImage className={styles.frame} amount={8}>
                <Photo media={item.photo} sizes={item.layout === "hero" || item.layout === "wide" ? "(min-width: 900px) 58vw, 100vw" : "(min-width: 900px) 30vw, 60vw"} />
              </ParallaxImage>
              <figcaption className={styles.caption}>
                <span className="num">{String(i + 1).padStart(3, "0")}</span>
                <span className="label">{item.title}</span>
                {item.detail && <span className={styles.detail}>{item.detail}</span>}
              </figcaption>
            </figure>
          ))}

          <p className={styles.note}>
            Cada evento pede uma composição própria. Aqui estão alguns dos ambientes que ajudamos a construir.
          </p>
        </div>
      </div>

      <div ref={cursor} className={styles.cursor} data-visible={label ? true : undefined} aria-hidden="true">
        <span>{label}</span>
      </div>
    </section>
  );
}

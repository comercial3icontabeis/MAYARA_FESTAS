"use client";

import { useRef } from "react";
import { media, imagineHotspots } from "@/data/media";
import { Photo } from "@/components/Photo/Photo";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./ImagineSection.module.css";

export function ImagineSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(root);
        /* A câmera começa num detalhe, percorre a composição e abre para o plano geral */
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 },
        });
        tl.fromTo(q(`.${styles.camera}`), { scale: 1.9, xPercent: 18, yPercent: -14 }, { scale: 1.45, xPercent: -10, yPercent: -6, duration: 0.35 }, 0)
          .to(q(`.${styles.camera}`), { scale: 1, xPercent: 0, yPercent: 0, duration: 0.4, ease: "power1.inOut" }, 0.35)
          .fromTo(q(`.${styles.shade}`), { opacity: 0.55 }, { opacity: 0.15, duration: 0.5 }, 0.3)
          .from(q(`.${styles.titleLine}`), { yPercent: 110, stagger: 0.04, duration: 0.12, ease: "power3.out" }, 0.02)
          .to(q(`.${styles.title}`), { opacity: 0, y: -40, duration: 0.12 }, 0.5)
          .from(q(`.${styles.tag}`), { opacity: 0, scale: 0.6, stagger: 0.07, duration: 0.08, ease: "back.out(2)" }, 0.66)
          .from(q(`.${styles.caption}`), { opacity: 0, y: 30, duration: 0.1 }, 0.88);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.section} aria-labelledby="imagine-title">
      <div className={styles.stage}>
        <div className={styles.camera}>
          <Photo media={media.imagine} sizes="100vw" quality={85} caption="top" />
          <div className={styles.shade} aria-hidden="true" />
        </div>

        <h2 id="imagine-title" className={`${styles.title} h2`}>
          <span className="line-mask">
            <span className={styles.titleLine}>Agora imagine</span>
          </span>
          <span className="line-mask">
            <span className={styles.titleLine}>
              tudo isso <em>junto.</em>
            </span>
          </span>
        </h2>

        <ul className={styles.tags} aria-label="Elementos da composição">
          {imagineHotspots.map((h) => (
            <li key={h.label} className={styles.tag} style={{ left: `${h.x}%`, top: `${h.y}%` }}>
              <span className={styles.dot} aria-hidden="true" />
              <span className="label">{h.label}</span>
            </li>
          ))}
        </ul>

        <p className={`${styles.caption} lead`}>
          Mesa, louça, mobiliário e decoração pensados como uma única composição.
        </p>
      </div>
    </section>
  );
}

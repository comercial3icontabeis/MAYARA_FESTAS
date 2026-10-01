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
        /* A câmera começa num detalhe da decoração e se afasta até mostrar a composição inteira */
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 },
        });
        tl.from(q(`.${styles.titleLine}`), { yPercent: 110, stagger: 0.05, duration: 0.14, ease: "power3.out" }, 0)
          .fromTo(q(`.${styles.camera}`), { scale: 2.1, xPercent: 10, yPercent: -8 }, { scale: 1.5, xPercent: -8, yPercent: 6, duration: 0.3 }, 0.05)
          .to(q(`.${styles.camera}`), { scale: 1, xPercent: 0, yPercent: 0, duration: 0.3, ease: "power1.inOut" }, 0.35)
          .fromTo(q(`.${styles.frame}`), { borderRadius: "0px 0px 0px 0px" }, { borderRadius: "999px 999px 0px 0px", duration: 0.25 }, 0.4)
          .from(q(`.${styles.tag}`), { opacity: 0, scale: 0.7, stagger: 0.06, duration: 0.07, ease: "back.out(2)" }, 0.66)
          .from(q(`.${styles.caption}`), { opacity: 0, y: 24, duration: 0.1 }, 0.88);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.section} aria-labelledby="imagine-title">
      <div className={styles.stage}>
        <div className={`${styles.layout} container`}>
          <h2 id="imagine-title" className={`${styles.title} h2`}>
            <span className="line-mask">
              <span className={styles.titleLine}>Agora imagine</span>
            </span>
            <span className="line-mask">
              <span className={styles.titleLine}>tudo isso junto.</span>
            </span>
          </h2>

          <div className={styles.figure}>
            <div className={styles.frame}>
              <div className={styles.camera}>
                <Photo media={media.imagine} sizes="(min-width: 900px) 36vw, 80vw" />
              </div>
            </div>
            <ul className={styles.tags} aria-label="Elementos da composição">
              {imagineHotspots.map((h) => (
                <li key={h.label} className={styles.tag} style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                  <span className={styles.dot} aria-hidden="true" />
                  {h.label}
                </li>
              ))}
            </ul>
          </div>

          <p className={`${styles.caption} lead`}>
            Painéis, balões, mesa, flores e peças pensados como uma única composição.
          </p>
        </div>
      </div>
    </section>
  );
}

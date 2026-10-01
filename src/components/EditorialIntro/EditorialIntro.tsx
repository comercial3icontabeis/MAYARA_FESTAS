"use client";

import { useRef } from "react";
import { media } from "@/data/media";
import { Photo } from "@/components/Photo/Photo";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./EditorialIntro.module.css";

/* clip-path em arco (topo semicircular) → retângulo. Mesma estrutura nos dois lados para o GSAP interpolar. */
const ARCH_FROM = "inset(16% 33% 0% 33% round 40vw 40vw 0vw 0vw)";
const ARCH_FROM_MOBILE = "inset(8% 18% 0% 18% round 60vw 60vw 0vw 0vw)";
const ARCH_TO = "inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)";

const PHRASES = ["Uma mesa.", "Uma peça.", "Uma composição inteira."];

export function EditorialIntro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      /* Desktop: palco fixo (sticky) e uma única linha do tempo ligada à rolagem */
      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        });
        tl.from(q(`.${styles.titleLine}`), { yPercent: 60, opacity: 0, stagger: 0.08, duration: 0.25, ease: "power2.out" }, 0.05)
          /* o arco: a foto nasce dentro de um painel em arco e se abre até ocupar a moldura */
          .fromTo(q(`.${styles.frame}`), { clipPath: ARCH_FROM }, { clipPath: ARCH_TO, duration: 0.55 }, 0.25)
          .fromTo(q(`.${styles.frameInner}`), { scale: 1.45 }, { scale: 1, duration: 0.65 }, 0.25)
          .from(q(`.${styles.lead}`), { y: 40, opacity: 0, duration: 0.18 }, 0.5)
          .from(q(`.${styles.phrase}`), { y: 30, opacity: 0, stagger: 0.08, duration: 0.14 }, 0.62)
          .from(q(`.${styles.closing}`), { y: 30, opacity: 0, duration: 0.14 }, 0.88);
      });

      /* Mobile: animações de entrada independentes, sem fixação */
      mm.add(MQ.mobile, () => {
        gsap.fromTo(
          q(`.${styles.frame}`),
          { clipPath: ARCH_FROM_MOBILE },
          {
            clipPath: ARCH_TO,
            ease: "none",
            scrollTrigger: { trigger: q(`.${styles.frame}`)[0], start: "top 95%", end: "top 30%", scrub: 0.6 },
          },
        );
        gsap.utils.toArray<HTMLElement>(q(`.${styles.titleLine}, .${styles.lead}, .${styles.phrase}, .${styles.closing}`)).forEach((el) => {
          gsap.from(el, { y: 30, opacity: 0, duration: 1.1, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="manifesto" className={styles.section} aria-labelledby="manifesto-title" tabIndex={-1}>
      <div className={styles.stage}>
        <div className={`${styles.grid} container`}>
          <h2 id="manifesto-title" className={`${styles.title} h2`}>
            <span className={styles.titleLine}>Não é sobre</span>
            <span className={styles.titleLine}>
              alugar objetos.
            </span>
          </h2>

          <figure className={styles.frame}>
            <div className={styles.frameInner}>
              <Photo media={media.manifesto} sizes="(min-width: 900px) 60vw, 100vw" />
            </div>
          </figure>

          <div className={styles.copy}>
            <p className={`${styles.lead} lead`}>É sobre criar a atmosfera certa para cada celebração.</p>
            <p className={styles.quote}>
              {PHRASES.map((p) => (
                <span key={p} className={styles.phrase}>
                  {p}{" "}
                </span>
              ))}
              <span className={styles.closing}>Cada escolha participa da história do evento.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

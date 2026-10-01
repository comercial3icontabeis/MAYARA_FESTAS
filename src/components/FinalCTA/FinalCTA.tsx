"use client";

import { useRef } from "react";
import { media } from "@/data/media";
import { Photo } from "@/components/Photo/Photo";
import { QuoteButton, WhatsAppButton } from "@/components/ui/Cta";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        });
        /* A foto se expande e cobre tudo o que veio antes; então o convite aparece */
        tl.fromTo(q(`.${styles.frame}`), { clipPath: "inset(22% 18% 22% 18%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.32 }, 0)
          .fromTo(q(`.${styles.zoom}`), { scale: 1.3 }, { scale: 1.06, duration: 1 }, 0)
          .fromTo(q(`.${styles.shade}`), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.22)
          .fromTo(
            q(`.${styles.line}`),
            { clipPath: "inset(0% 0% 100% 0%)", yPercent: 30 },
            { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, stagger: 0.05, duration: 0.14, ease: "power2.out" },
            0.3,
          )
          .from(q(`.${styles.text}`), { opacity: 0, y: 30, duration: 0.1 }, 0.44)
          .from(q(`.${styles.ctas}`), { opacity: 0, y: 30, duration: 0.1 }, 0.52);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contato" className={styles.section} aria-labelledby="contato-title" tabIndex={-1}>
      <div className={styles.stage}>
        <div className={styles.frame}>
          <div className={styles.zoom}>
            <Photo media={media.finalCta} sizes="100vw" quality={85} caption="top" />
          </div>
          <div className={styles.shade} aria-hidden="true" />
        </div>

        <div className={`${styles.content} container`}>
          <p className="label">[ Contato ]</p>
          <h2 id="contato-title" className={`${styles.title} display`}>
            <span className={styles.line}>Vamos criar</span>
            <span className={styles.line}>
              esse <em>momento?</em>
            </span>
          </h2>
          <p className={`${styles.text} lead`}>
            Conte para a gente o que você está planejando. A partir daí, construímos juntos a composição ideal.
          </p>
          <div className={styles.ctas}>
            <QuoteButton tone="light" />
            <WhatsAppButton tone="light" variant="ghost" fallback="hide" />
          </div>
        </div>
      </div>
    </section>
  );
}

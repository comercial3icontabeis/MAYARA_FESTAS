"use client";

import { useRef, useState } from "react";
import { processSteps } from "@/data/process";
import { Photo } from "@/components/Photo/Photo";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import styles from "./ProcessTimeline.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProcessTimeline() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);
      const n = processSteps.length;

      /* Desktop: palco fixo; a rolagem avança a linha, troca número, imagem e texto */
      mm.add(MQ.desktop, () => {
        gsap.fromTo(
          q(`.${styles.fill}`),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              onUpdate: (self) => {
                const i = Math.min(n - 1, Math.floor(self.progress * n));
                setActive((prev) => (prev === i ? prev : i));
              },
            },
          },
        );
        gsap.from(q(`.${styles.headline} .line-mask > span`), {
          yPercent: 110,
          stagger: 0.1,
          duration: 1.4,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
      });

      /* Mobile: lista corrida; a linha acompanha a rolagem e cada etapa acende ao cruzar o centro */
      mm.add(MQ.mobile, () => {
        gsap.fromTo(
          q(`.${styles.fill}`),
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: q(`.${styles.steps}`)[0], start: "top 60%", end: "bottom 60%", scrub: true } },
        );
        q(`.${styles.step}`).forEach((el: Element, i: number) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="como-funciona" className={styles.section} aria-labelledby="processo-title" tabIndex={-1}>
      <div className={styles.stage}>
        <div className={`${styles.grid} container`}>
          <div className={styles.left}>
            <p className="label dim">[ Como funciona ]</p>
            <h2 id="processo-title" className={`${styles.headline} h2`}>
              <span className="line-mask">
                <span>Simples para você.</span>
              </span>
              <span className="line-mask">
                <span>
                  <em>Cuidado</em> em cada etapa.
                </span>
              </span>
            </h2>

            <div className={styles.timeline}>
              <span className={styles.track} aria-hidden="true">
                <span className={styles.fill} />
              </span>
              <ol className={styles.steps}>
                {processSteps.map((s, i) => (
                  <li
                    key={s.title}
                    className={styles.step}
                    data-active={i === active || undefined}
                    data-done={i < active || undefined}
                    aria-current={i === active ? "step" : undefined}
                  >
                    <span className={`${styles.stepNum} num`}>{pad(i + 1)}</span>
                    <div className={styles.stepBody}>
                      <h3 className={styles.stepTitle}>{s.title}</h3>
                      <p className={styles.stepText}>{s.text}</p>
                      <div className={styles.stepPhoto}>
                        <Photo media={s.photo} sizes="90vw" />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className={styles.right} aria-hidden="true">
            <div className={styles.bigNum}>
              {processSteps.map((_, i) => (
                <span key={i} data-active={i === active || undefined} data-before={i < active || undefined}>
                  {pad(i + 1)}
                </span>
              ))}
            </div>
            <div className={styles.frame}>
              {processSteps.map((s, i) => (
                <div key={s.title} className={styles.layer} data-active={i === active || undefined} data-before={i < active || undefined}>
                  <Photo media={s.photo} sizes="(min-width: 900px) 40vw, 1px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

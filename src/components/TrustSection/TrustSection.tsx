import { company } from "@/config/company";
import { AnimatedCounter } from "@/motion/AnimatedCounter";
import { RevealText } from "@/motion/RevealText";
import styles from "./TrustSection.module.css";

export function TrustSection() {
  return (
    <section className={styles.section} aria-labelledby="confianca-title">
      <div className={`${styles.grid} container`}>
        <div className={styles.head}>
          <p className="label dim">[ Confiança ]</p>
          <RevealText as="h2" id="confianca-title" className="h2">
            Detalhes que fazem <em>diferença.</em>
          </RevealText>
        </div>

        <dl className={styles.stats}>
          {company.stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className="label dim">{s.label}</dt>
              <dd className={styles.value}>
                {s.value !== null ? (
                  <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                ) : (
                  /* Sem dado real: placeholder visível, sem animação */
                  <span className={styles.placeholder} title="Dado a confirmar em src/config/company.ts">
                    [X]{s.suffix}
                  </span>
                )}
              </dd>
              <dd className={styles.caption}>{s.caption}</dd>
            </div>
          ))}
        </dl>

        <ul className={styles.diffs}>
          {company.differentials.map((d, i) => (
            <li key={d}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className={d.startsWith("[") ? "ph" : undefined}>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

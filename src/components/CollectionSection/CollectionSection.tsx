import Link from "next/link";
import { collections } from "@/data/collections";
import { RevealText } from "@/motion/RevealText";
import { HorizontalCollection } from "@/components/HorizontalCollection/HorizontalCollection";
import styles from "./CollectionSection.module.css";

export function CollectionSection() {
  return (
    <section id="acervo" className={styles.section} aria-labelledby="acervo-title" tabIndex={-1}>
      <header className={`${styles.head} container`}>
        <RevealText as="h2" id="acervo-title" className={`${styles.title} h2`}>
          Um acervo para cada momento.
        </RevealText>

        <div className={styles.side}>
          <p className={styles.intro}>
            Mesas, louças, mobiliário, têxteis e peças decorativas escolhidos para conversar entre si. Você não
            aluga itens soltos — monta um ambiente.
          </p>
          <nav aria-label="Categorias do acervo">
            <ol className={styles.index}>
              {collections.map((c, i) => (
                <li key={c.slug}>
                  <Link href={`/acervo/${c.slug}`} className={styles.indexLink}>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{c.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <HorizontalCollection />
    </section>
  );
}

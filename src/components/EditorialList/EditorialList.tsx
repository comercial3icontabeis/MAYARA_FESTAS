import Link from "next/link";
import type { Media } from "@/data/media";
import { Photo } from "@/components/Photo/Photo";
import { RevealImage } from "@/motion/RevealImage";
import { Arrow } from "@/components/ui/Arrow";
import styles from "./EditorialList.module.css";

type Item = { href: string; title: string; text: string; photo: Media };

/** Lista editorial alternada para páginas índice (/acervo, /eventos). */
export function EditorialList({ items }: { items: Item[] }) {
  return (
    <ol className={`${styles.list} container`}>
      {items.map((it, i) => (
        <li key={it.href} className={styles.row} data-alt={i % 2 === 1 || undefined}>
          <Link href={it.href} className={styles.link}>
            <RevealImage className={styles.photo}>
              <Photo media={it.photo} sizes="(min-width: 900px) 50vw, 100vw" />
            </RevealImage>
            <div className={styles.text}>
              <span className={`${styles.num} num`}>{String(i + 1).padStart(2, "0")}</span>
              <h2 className="h3">{it.title}</h2>
              <p className={styles.desc}>{it.text}</p>
              <span className={`${styles.more} label`}>
                <span className="link-line">Ver mais</span> <Arrow />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import type { Media } from "@/data/media";
import { breadcrumbSchema } from "@/lib/schema";
import { Photo } from "@/components/Photo/Photo";
import { RevealImage } from "@/motion/RevealImage";
import { RevealText } from "@/motion/RevealText";
import styles from "./PageHeader.module.css";

type Crumb = { name: string; path: string };

type Props = {
  title: ReactNode;
  intro?: ReactNode;
  photo?: Media;
  crumbs: Crumb[];
  children?: ReactNode;
};

/** Cabeçalho editorial das páginas internas (H1 + breadcrumb com Schema.org). */
export function PageHeader({ title, intro, photo, crumbs, children }: Props) {
  const all = [{ name: "Início", path: "/" }, ...crumbs];
  return (
    <header className={styles.header}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(all)) }} />
      <div className={`${styles.grid} container`}>
        <nav aria-label="Você está em" className={styles.crumbs}>
          <ol>
            {all.map((c, i) => (
              <li key={c.path}>
                {i < all.length - 1 ? (
                  <Link href={c.path} className="link-line">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <RevealText as="h1" className={`${styles.title} display`} start="top 100%">
          {title}
        </RevealText>
        {intro && <div className={`${styles.intro} lead`}>{intro}</div>}
        {children && <div className={styles.extra}>{children}</div>}
      </div>
      {photo && (
        <div className="container">
          <RevealImage className={styles.photo} start="top 100%">
            <Photo media={photo} sizes="(min-width: 1680px) 1600px, 100vw" priority />
          </RevealImage>
        </div>
      )}
    </header>
  );
}

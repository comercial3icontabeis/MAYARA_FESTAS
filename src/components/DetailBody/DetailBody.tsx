import Link from "next/link";
import type { CollectionItem } from "@/data/collections";
import { Photo } from "@/components/Photo/Photo";
import { QuoteButton, WhatsAppButton } from "@/components/ui/Cta";
import styles from "./DetailBody.module.css";

type Related = { href: string; title: string };

type Props = {
  /** Produtos reais da categoria (se houver). */
  items?: CollectionItem[];
  emptyNote?: string;
  eventType?: string;
  relatedTitle: string;
  related: Related[];
};

/** Corpo das páginas de categoria / tipo de evento. */
export function DetailBody({ items, emptyNote, eventType, relatedTitle, related }: Props) {
  return (
    <div className={`${styles.body} container`}>
      {items && (
        <section className={styles.items} aria-label="Peças">
          {items.length ? (
            <ul className={styles.grid}>
              {items.map((it) => (
                <li key={it.name} className={styles.item}>
                  {it.photo && (
                    <div className={styles.itemPhoto}>
                      <Photo media={it.photo} sizes="(min-width: 900px) 30vw, 50vw" />
                    </div>
                  )}
                  <h3 className={styles.itemName}>{it.name}</h3>
                  {it.description && <p className={styles.itemDesc}>{it.description}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>
              <span className="ph">{emptyNote ?? "[Catálogo de peças desta categoria — cadastrar em src/data/collections.ts]"}</span>
            </p>
          )}
        </section>
      )}

      <section className={styles.cta} aria-label="Orçamento">
        <p className={styles.ctaText}>
          Cada composição é montada sob medida. Conte o que você está planejando e indicamos as peças certas.
        </p>
        <div className={styles.ctaRow}>
          <QuoteButton eventType={eventType} />
          <WhatsAppButton fallback="hide" />
        </div>
      </section>

      <nav className={styles.related} aria-label={relatedTitle}>
        <p className="label dim">{relatedTitle}</p>
        <ul>
          {related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="link-line">
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

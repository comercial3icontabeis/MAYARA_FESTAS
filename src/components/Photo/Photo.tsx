import Image from "next/image";
import type { Media } from "@/data/media";
import styles from "./Photo.module.css";

type Props = {
  media: Media;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Esconde a legenda do placeholder (ex.: miniaturas). */
  compact?: boolean;
  quality?: number;
  /** Posição da legenda do placeholder — "top" quando há texto sobreposto embaixo. */
  caption?: "bottom" | "top";
};

/**
 * Imagem fotográfica do site. Sempre preenche o elemento pai (position: relative).
 * Sem `media.src`, renderiza um placeholder tonal identificado com a pauta da foto.
 */
export function Photo({ media, sizes, priority, className, compact, quality = 82, caption = "bottom" }: Props) {
  const cls = [styles.photo, className].filter(Boolean).join(" ");

  if (media.src) {
    return (
      <div className={cls}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={styles.img}
        />
      </div>
    );
  }

  return (
    <div className={`${cls} ${styles.placeholder}`} data-tone={media.tone} role="img" aria-label={media.alt}>
      <span className={styles.light} aria-hidden="true" />
      {!compact && (
        <span className={caption === "top" ? `${styles.caption} ${styles.captionTop}` : styles.caption} aria-hidden="true">
          <span className={styles.tag}>[ foto ]</span>
          {media.brief}
        </span>
      )}
    </div>
  );
}

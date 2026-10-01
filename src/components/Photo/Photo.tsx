import Image from "next/image";
import { resolvePhoto, type Media } from "@/data/media";
import { withBase } from "@/lib/asset";
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
 * Foto do site. Sempre preenche o elemento pai (que deve ter position: relative).
 * Se existir arquivo em public/fotos/<slot>, mostra a foto real; senão, um espaço
 * reservado que diz exatamente qual arquivo salvar e em que proporção.
 */
export function Photo({ media, sizes, priority, className, compact, quality = 85, caption = "bottom" }: Props) {
  const src = resolvePhoto(media);
  const cls = [styles.photo, className].filter(Boolean).join(" ");

  if (src) {
    return (
      <div className={cls}>
        <Image src={withBase(src)} alt={media.alt} fill sizes={sizes} priority={priority} quality={quality} className={styles.img} />
      </div>
    );
  }

  const file = media.slot.endsWith("/") ? `fotos/${media.slot}qualquer-nome.jpg` : `fotos/${media.slot}.jpg`;
  return (
    <div className={`${cls} ${styles.placeholder}`} data-tone={media.tone} role="img" aria-label={`Espaço reservado para foto: ${media.alt}`}>
      {!compact && (
        <span className={caption === "top" ? `${styles.caption} ${styles.captionTop}` : styles.caption} aria-hidden="true">
          <span className={styles.what}>{media.brief}</span>
          <span className={styles.file}>
            {file} · {media.ratio}
          </span>
        </span>
      )}
    </div>
  );
}

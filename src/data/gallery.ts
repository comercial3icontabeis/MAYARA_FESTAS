import manifest from "./photo-manifest.json";
import { portfolioCaptions, portfolioMinSlots } from "./portfolio";
import type { Media, Tone } from "./media";

export type GalleryItem = {
  media: Media;
  title: string;
  detail?: string;
  /** true quando é um espaço vazio esperando foto. */
  empty: boolean;
};

const TONES: Tone[] = ["petal", "linen", "sage", "rose", "stone", "petal"];

/**
 * Fotos de public/fotos/galeria (em ordem) + espaços vazios até completar
 * `portfolioMinSlots`, para o layout nunca ficar pela metade.
 */
export function getGallery(): GalleryItem[] {
  const files = manifest.galeria as string[];
  const items: GalleryItem[] = files.map((src, i) => {
    const file = src.split("/").pop() ?? "";
    const cap = portfolioCaptions[file];
    return {
      media: {
        slot: `galeria/${file}`,
        src,
        alt: cap?.alt ?? "Decoração de festa montada pela Mayara Festas",
        brief: "",
        ratio: "3:4",
        tone: TONES[i % TONES.length],
      },
      title: cap?.title ?? "Decoração",
      detail: cap?.detail,
      empty: false,
    };
  });

  for (let i = items.length; i < portfolioMinSlots; i++) {
    items.push({
      media: {
        slot: "galeria/",
        alt: "Espaço para foto de decoração",
        brief: "Foto de uma decoração montada",
        ratio: "3:4",
        tone: TONES[i % TONES.length],
      },
      title: "Sua próxima decoração",
      empty: true,
    });
  }
  return items;
}

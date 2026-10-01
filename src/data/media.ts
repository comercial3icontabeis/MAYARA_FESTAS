import manifest from "./photo-manifest.json";

/**
 * ESPAÇOS DE FOTO DO SITE
 * ------------------------------------------------------------------
 * Cada espaço tem um `slot`: o nome do arquivo que preenche aquele lugar.
 *
 *   Para colocar a foto da decoração no hero, salve:  public/fotos/hero.jpg
 *   (também vale .jpeg, .png, .webp ou .avif)
 *
 * O site detecta o arquivo sozinho (scripts/scan-photos.mjs roda antes do
 * dev/build). Enquanto não houver foto, o espaço mostra um placeholder com
 * o nome do arquivo esperado e a proporção recomendada.
 *
 * Recomendação: fotos reais das decorações, lado maior ≥ 2400px.
 * O Next Image gera AVIF/WebP responsivos automaticamente.
 */

export type Tone = "night" | "wine" | "rose" | "petal" | "sage" | "linen" | "stone";

export type Media = {
  /** Nome do arquivo em public/fotos (sem extensão). */
  slot: string;
  /** Texto alternativo — descreva a foto real quando ela entrar. */
  alt: string;
  /** O que essa foto deve mostrar (aparece no placeholder). */
  brief: string;
  /** Proporção recomendada para a foto, ex.: "16:9". */
  ratio: string;
  tone: Tone;
  /** Caminho explícito (opcional) — sobrescreve a detecção automática. */
  src?: string;
};

const slots = manifest.slots as Record<string, string>;

/** Caminho da foto real do slot, se o arquivo existir em public/fotos. */
export const resolvePhoto = (media: Media): string | undefined => media.src || slots[media.slot];

export const photo = (slot: string, brief: string, alt: string, ratio: string, tone: Tone): Media => ({
  slot,
  brief,
  alt,
  ratio,
  tone,
});

export const media = {
  hero: photo("hero", "Festa montada em plano aberto — a decoração mais bonita que você já fez", "Decoração de festa montada pela Mayara Festas", "16:9", "night"),
  manifesto: photo("manifesto", "Decoração montada, em alta resolução", "Decoração de 1 ano com tema de borboletas: arco de balões lilás, rosa e verde, painéis em arco com o nome Bella, mesa de cilindros com bolo, número 1 e flores", "4:5", "linen"),
  manifestoDetalhe: photo("manifesto-detalhe", "Close de um detalhe: arranjo, doce, peça decorativa", "Detalhe de peça decorativa", "3:4", "petal"),
  imagine: photo("imagine", "Composição completa: painéis, balões, mesa, flores e peças juntos", "Decoração rosa com painéis em arco, arco de balões com laço, mesa de cilindros brancos com flores, cilindros de acrílico e ursinho de pelúcia", "3:4", "petal"),
  antes: photo("antes", "ANTES — o espaço vazio (mesmo enquadramento da foto 'depois')", "Espaço vazio antes da montagem", "16:9", "stone"),
  depois: photo("depois", "DEPOIS — o mesmo espaço com a decoração montada", "O mesmo espaço com a decoração montada", "16:9", "wine"),
  sobreEquipe: photo("sobre-equipe", "Foto da Mayara e da equipe", "Mayara e equipe", "4:3", "rose"),
  sobreAcervo: photo("sobre-acervo", "O acervo organizado", "Acervo de peças organizado", "3:4", "stone"),
  sobreBastidores: photo("sobre-bastidores", "Bastidores de uma montagem", "Equipe montando uma decoração", "1:1", "sage"),
  sobrePreparacao: photo("sobre-preparacao", "Preparação e conferência das peças", "Conferência das peças antes da entrega", "4:5", "linen"),
  contatoFinal: photo("contato-final", "Festa pronta, iluminada, prestes a receber os convidados", "Festa pronta para receber os convidados", "16:9", "night"),
} satisfies Record<string, Media>;

/**
 * Etiquetas da seção "Imagine sua festa".
 * x / y em % da imagem — ajuste para apontar os elementos reais da foto `imagine`.
 */
export const imagineHotspots = [
  { label: "Painéis em arco", x: 52, y: 30 },
  { label: "Balões", x: 84, y: 44 },
  { label: "Mesa de cilindros", x: 40, y: 58 },
  { label: "Flores", x: 30, y: 68 },
  { label: "Acrílicos", x: 74, y: 72 },
];

/**
 * Fotografias do site.
 * ------------------------------------------------------------------
 * Cada imagem tem `src` (arquivo real em /public/images) e `brief`
 * (descrição da foto que deve ser produzida/fornecida).
 *
 * Enquanto `src` estiver vazio, o site mostra um placeholder tonal
 * identificado com o `brief` — nunca uma foto de banco de imagens
 * apresentada como se fosse da empresa.
 *
 * Recomendações: JPG/WEBP de alta qualidade, lado maior >= 2400px.
 * O Next Image gera AVIF/WebP responsivos automaticamente.
 */

export type Tone = "night" | "ember" | "sand" | "stone" | "blush" | "sage" | "linen";

export type Media = {
  src: string;
  alt: string;
  brief: string;
  tone: Tone;
};

const m = (brief: string, alt: string, tone: Tone, src = ""): Media => ({ src, alt, brief, tone });

export const media = {
  hero: m(
    "Festa montada à noite, mesa posta com luz quente, enquadramento amplo e horizontal",
    "Mesa de festa decorada com louças, flores e iluminação quente",
    "night",
  ),
  editorial: m(
    "Detalhe de mesa posta: louça, taça e guardanapo, luz natural lateral",
    "Detalhe de mesa posta com louça, taça e guardanapo de tecido",
    "linen",
  ),
  editorialDetailA: m("Close de taças de cristal", "Taças de cristal", "stone"),
  editorialDetailB: m("Close de arranjo floral sobre a mesa", "Arranjo floral", "blush"),
  imagine: m(
    "Composição completa de festa em plano aberto: mesa, flores, mobiliário, iluminação e louças",
    "Ambiente de festa completo com mesa posta, flores, mobiliário e iluminação",
    "ember",
  ),
  before: m(
    "ANTES — o espaço vazio, mesmo enquadramento da foto 'depois'",
    "Salão vazio antes da montagem do evento",
    "stone",
  ),
  after: m(
    "DEPOIS — o mesmo espaço montado para o evento, mesmo enquadramento",
    "O mesmo salão montado e decorado para o evento",
    "ember",
  ),
  aboutTeam: m("Foto real da equipe", "Equipe da empresa", "sand"),
  aboutStock: m("O acervo / depósito organizado", "Acervo de peças organizado", "stone"),
  aboutBackstage: m("Bastidores de uma montagem", "Equipe montando um evento", "sage"),
  aboutPrep: m("Preparação e conferência das peças", "Conferência das peças antes da entrega", "linen"),
  finalCta: m(
    "Festa pronta, luz de fim de tarde ou noite, atmosfera acolhedora",
    "Festa pronta para receber os convidados",
    "night",
  ),
} satisfies Record<string, Media>;

/**
 * Etiquetas da seção "Imagine sua festa".
 * x / y em % da imagem — ajuste para apontar os elementos reais da foto `media.imagine`.
 */
export const imagineHotspots = [
  { label: "Mesa", x: 30, y: 66 },
  { label: "Louça", x: 54, y: 74 },
  { label: "Mobiliário", x: 79, y: 52 },
  { label: "Decoração", x: 46, y: 30 },
];

export { m as makeMedia };

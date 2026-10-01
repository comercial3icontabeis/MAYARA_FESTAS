/**
 * CONFIGURAÇÃO CENTRAL DA EMPRESA
 * ------------------------------------------------------------------
 * Toda informação institucional do site vem deste arquivo.
 *
 * REGRA: nada aqui pode ser inventado. Campos vazios ("" / null / [])
 * são exibidos no site como placeholders claramente identificados,
 * por exemplo "[CIDADE]", e são omitidos do Schema.org / SEO.
 *
 * Preencha com os dados reais antes de publicar.
 */

export type Stat = {
  label: string;
  /** Número real. Deixe `null` enquanto não houver dado confirmado. */
  value: number | null;
  prefix?: string;
  suffix?: string;
  caption: string;
};

export const company = {
  /** Nome comercial exibido no site. Confirmar grafia oficial. */
  name: "Mayara Festas",
  /** Razão social (opcional, usada no rodapé). */
  legalName: "",
  /** CNPJ (opcional, usado no rodapé). */
  cnpj: "",
  /** Caminho do logo em /public (ex.: "/images/logo.svg"). Vazio = wordmark tipográfico. */
  logo: "",

  /** URL definitiva do site, sem barra final. Usada em canonical, sitemap e Open Graph. */
  siteUrl: "https://www.exemplo.com.br",

  /** Somente dígitos, com DDI + DDD. Ex.: "5511999999999". Vazio = WhatsApp desativado. */
  whatsapp: "",
  /** Telefone exibido (formato livre). Ex.: "(11) 99999-9999". */
  phone: "",
  email: "",
  /** Usuário do Instagram sem @. */
  instagram: "",

  address: {
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
    country: "BR",
  },

  /** Cidades/regiões atendidas — usado em textos de SEO local e no Schema.org. */
  areaServed: [] as string[],

  /** Horários de atendimento. Ex.: { days: "Seg a Sex", hours: "9h às 18h" } */
  hours: [] as { days: string; hours: string }[],

  /** Números da empresa. Contadores só animam quando `value` é um número real. */
  stats: [
    { label: "Acervo", value: null, suffix: "+", caption: "peças disponíveis" },
    { label: "Experiência", value: null, suffix: " anos", caption: "no mercado" },
    { label: "Eventos", value: null, suffix: "+", caption: "eventos realizados" },
  ] as Stat[],

  /** Diferenciais reais. Substitua os placeholders entre colchetes. */
  differentials: [
    "[Diferencial real — ex.: entrega e montagem no local]",
    "[Diferencial real — ex.: peças higienizadas e conferidas]",
    "[Diferencial real — ex.: atendimento personalizado por evento]",
  ],

  /** Textos da seção Sobre. Escreva a história real da empresa. */
  about: {
    paragraphs: [
      "[História da empresa: como e quando começou, quem fundou, o que motivou.]",
      "[Como a equipe trabalha: cuidado com as peças, atendimento, montagem, pontualidade.]",
      "[Propósito: o que a empresa quer que cada cliente sinta no dia do evento.]",
    ],
    founded: null as number | null,
  },

  seo: {
    title: "Locação e fornecimento de artigos para festas e eventos",
    description:
      "Locação e fornecimento de mesas, cadeiras, louças, peças decorativas e mobiliário para casamentos, aniversários, festas infantis e eventos corporativos.",
  },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

export const isFilled = (v: unknown): boolean =>
  v !== null && v !== undefined && !(typeof v === "string" && v.trim() === "") && !(Array.isArray(v) && v.length === 0);

/** Retorna o valor ou um placeholder visível como "[CIDADE]". */
export const orPlaceholder = (v: string | null | undefined, label: string) =>
  isFilled(v) ? (v as string) : `[${label}]`;

export const cityLabel = () => orPlaceholder(company.address.city, "CIDADE");

export const hasWhatsApp = () => /^\d{10,15}$/.test(company.whatsapp);

export const instagramUrl = () =>
  isFilled(company.instagram) ? `https://instagram.com/${company.instagram}` : null;

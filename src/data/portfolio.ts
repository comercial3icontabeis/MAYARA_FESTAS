import { makeMedia, type Media } from "./media";

/**
 * PORTFÓLIO — apenas eventos reais, com fotos reais.
 * `layout` controla a composição assimétrica da galeria:
 *   "hero" (grande), "tall" (vertical), "wide" (horizontal), "small".
 */

export type PortfolioItem = {
  title: string;
  /** Detalhe opcional: local, mês/ano, estilo. Não inventar. */
  detail?: string;
  photo: Media;
  layout: "hero" | "tall" | "wide" | "small";
};

export const portfolio: PortfolioItem[] = [
  { title: "Casamento", layout: "hero", photo: makeMedia("Foto real de casamento atendido", "Casamento atendido pela empresa", "linen") },
  { title: "Aniversário", layout: "tall", photo: makeMedia("Foto real de aniversário atendido", "Aniversário atendido pela empresa", "ember") },
  { title: "Evento corporativo", layout: "small", photo: makeMedia("Foto real de evento corporativo", "Evento corporativo atendido", "stone") },
  { title: "Festa infantil", layout: "wide", photo: makeMedia("Foto real de festa infantil", "Festa infantil atendida", "blush") },
  { title: "Chá", layout: "small", photo: makeMedia("Foto real de chá / recepção", "Chá atendido pela empresa", "sage") },
  { title: "Celebração", layout: "tall", photo: makeMedia("Foto real de celebração especial", "Celebração atendida pela empresa", "night") },
];

/**
 * PORTFÓLIO
 * ------------------------------------------------------------------
 * Toda foto salva em public/fotos/galeria/ entra no portfólio sozinha,
 * em ordem alfabética do nome do arquivo (use 01-, 02-… para ordenar).
 *
 * Aqui você pode dar título, descrição (alt) e detalhe a cada foto,
 * pelo nome do arquivo. Fotos sem entrada aqui usam um título genérico.
 */

export type PortfolioCaption = {
  title: string;
  /** Descrição da foto para acessibilidade e SEO. */
  alt: string;
  /** Detalhe opcional: tema, local, mês/ano. Não inventar. */
  detail?: string;
};

export const portfolioCaptions: Record<string, PortfolioCaption> = {
  "01-manuela.jpg": {
    title: "Tema rosa com ursinho",
    alt: "Decoração rosa com painéis em arco com o nome Manuela, arco de balões com laço, mesa de cilindros brancos com flores e ursinho de pelúcia",
  },
  "02-bella.jpg": {
    title: "Borboletas — 1 ano",
    alt: "Decoração de 1 ano com tema de borboletas em lilás, rosa e verde, painel com o nome Bella, arco de balões e número 1",
  },
  "03-lays.jpg": {
    title: "Lua e estrelas — 15 anos",
    alt: "Decoração de 15 anos em azul-marinho e dourado com lua e estrelas, painéis em arco com o nome Lays, balões e números 15 em neon",
  },
};

/** Quantos espaços vazios mostrar no portfólio enquanto houver poucas fotos. */
export const portfolioMinSlots = 6;

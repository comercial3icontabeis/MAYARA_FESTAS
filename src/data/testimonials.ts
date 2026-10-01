/**
 * DEPOIMENTOS
 * ------------------------------------------------------------------
 * Somente depoimentos reais, com autorização do cliente.
 * Enquanto a lista estiver vazia, o site exibe um placeholder
 * identificado — nenhuma avaliação é inventada.
 *
 * Exemplo de preenchimento:
 * { quote: "Texto real do cliente.", name: "Nome do cliente", event: "Casamento", year: 2026 }
 */

export type Testimonial = {
  quote: string;
  name: string;
  event?: string;
  year?: number;
};

export const testimonials: Testimonial[] = [];

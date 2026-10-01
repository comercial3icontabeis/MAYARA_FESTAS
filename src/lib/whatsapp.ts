import { company, hasWhatsApp } from "@/config/company";

export type QuoteData = {
  name: string;
  whatsapp: string;
  eventType: string;
  date: string;
  guests: string;
  city: string;
  needs: string;
};

/** Link wa.me com mensagem opcional. Retorna null se o número não estiver configurado. */
export function whatsappLink(message?: string): string | null {
  if (!hasWhatsApp()) return null;
  const base = `https://wa.me/${company.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsAppMessage = () =>
  `Olá! Vim pelo site da ${company.name} e gostaria de conversar sobre uma festa.`;

const formatDate = (iso: string) => {
  const [y, mo, d] = iso.split("-");
  return y && mo && d ? `${d}/${mo}/${y}` : iso;
};

export function buildQuoteMessage(q: QuoteData): string {
  const lines = [
    `Olá! Gostaria de solicitar um orçamento pelo site da ${company.name}.`,
    "",
    `*Nome:* ${q.name}`,
    `*WhatsApp:* ${q.whatsapp}`,
    `*Tipo de evento:* ${q.eventType}`,
    q.date ? `*Data do evento:* ${formatDate(q.date)}` : null,
    q.guests ? `*Convidados:* ${q.guests}` : null,
    q.city ? `*Cidade:* ${q.city}` : null,
    "",
    `*O que preciso:*`,
    q.needs,
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

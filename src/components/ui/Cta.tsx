"use client";

import type { ReactNode } from "react";
import { useQuote } from "@/components/QuoteForm/QuoteProvider";
import { defaultWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";
import { MagneticButton } from "@/motion/MagneticButton";
import { Arrow } from "./Arrow";

type Variant = "solid" | "ghost";
type Tone = "dark" | "light";

const cls = (variant: Variant, tone: Tone, extra?: string) =>
  ["btn", variant === "ghost" && "btn--ghost", tone === "light" && "btn--light", extra].filter(Boolean).join(" ");

type Base = { variant?: Variant; tone?: Tone; className?: string; magnetic?: boolean; children?: ReactNode };

/** Abre o diálogo de orçamento. */
export function QuoteButton({
  variant = "solid",
  tone = "dark",
  className,
  magnetic = true,
  eventType,
  children = "Solicitar orçamento",
}: Base & { eventType?: string }) {
  const { openQuote } = useQuote();
  const btn = (
    <button type="button" className={cls(variant, tone, className)} onClick={() => openQuote(eventType)} aria-haspopup="dialog">
      {children} <Arrow />
    </button>
  );
  return magnetic ? <MagneticButton>{btn}</MagneticButton> : btn;
}

/**
 * Link direto para o WhatsApp. Se o número ainda não estiver configurado,
 * vira um botão de orçamento — nenhum CTA fica quebrado.
 */
export function WhatsAppButton({
  variant = "ghost",
  tone = "dark",
  className,
  magnetic = true,
  children = "Falar no WhatsApp",
  fallback = "quote",
}: Base & { fallback?: "quote" | "hide" }) {
  const href = whatsappLink(defaultWhatsAppMessage());
  if (!href) {
    if (fallback === "hide") return null;
    return (
      <QuoteButton variant={variant} tone={tone} className={className} magnetic={magnetic}>
        Solicitar orçamento
      </QuoteButton>
    );
  }
  const a = (
    <a className={cls(variant, tone, className)} href={href} target="_blank" rel="noopener noreferrer">
      {children} <Arrow />
    </a>
  );
  return magnetic ? <MagneticButton>{a}</MagneticButton> : a;
}

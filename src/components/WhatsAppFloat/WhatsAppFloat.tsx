"use client";

import { useEffect, useState } from "react";
import { useQuote } from "@/components/QuoteForm/QuoteProvider";
import { defaultWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";
import styles from "./WhatsAppFloat.module.css";

function Icon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z"
      />
    </svg>
  );
}

/**
 * CTA persistente no mobile. Aparece depois do hero e some perto do rodapé
 * para não competir com o CTA final. Sem número configurado, abre o orçamento.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const { openQuote } = useQuote();
  const href = whatsappLink(defaultWhatsAppMessage());

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd = window.innerHeight + y > document.documentElement.scrollHeight - window.innerHeight * 1.2;
      setVisible(y > window.innerHeight * 0.6 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const content = (
    <>
      <Icon />
      <span>{href ? "Falar no WhatsApp" : "Solicitar orçamento"}</span>
    </>
  );

  return (
    <div className={styles.wrap} data-visible={visible || undefined} inert={!visible}>
      {href ? (
        <a className={styles.btn} href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <button type="button" className={styles.btn} onClick={() => openQuote()} aria-haspopup="dialog">
          {content}
        </button>
      )}
    </div>
  );
}

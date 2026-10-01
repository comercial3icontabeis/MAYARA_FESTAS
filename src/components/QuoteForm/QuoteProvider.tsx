"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { QuoteForm } from "./QuoteForm";
import styles from "./QuoteDialog.module.css";

type Ctx = { openQuote: (eventType?: string) => void };
const QuoteContext = createContext<Ctx>({ openQuote: () => {} });
export const useQuote = () => useContext(QuoteContext);

/** Disponibiliza `openQuote()` para qualquer CTA e renderiza o diálogo de orçamento. */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState(0);
  const [eventType, setEventType] = useState("");
  const [open, setOpen] = useState(false);

  const openQuote = useCallback((ev?: string) => {
    setEventType(ev ?? "");
    setSession((s) => s + 1);
    setOpen(true);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
  }, [open, session]);

  const close = () => setOpen(false);

  return (
    <QuoteContext.Provider value={{ openQuote }}>
      {children}
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="quote-title"
        onClose={() => {
          setOpen(false);
          document.documentElement.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className={styles.panel}>
          <header className={styles.head}>
            <div>
              <p className="label dim">Orçamento</p>
              <h2 id="quote-title" className={styles.title}>
                Conte o que você está <em>planejando</em>.
              </h2>
            </div>
            <button type="button" className={styles.close} onClick={close} aria-label="Fechar">
              <span />
              <span />
            </button>
          </header>
          {open && <QuoteForm key={session} defaultEventType={eventType} titleId="quote-title" />}
        </div>
      </dialog>
    </QuoteContext.Provider>
  );
}

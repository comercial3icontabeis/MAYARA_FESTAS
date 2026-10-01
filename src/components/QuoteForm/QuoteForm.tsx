"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { company, hasWhatsApp } from "@/config/company";
import { events } from "@/data/events";
import { buildQuoteMessage, whatsappLink, type QuoteData } from "@/lib/whatsapp";
import { Arrow } from "@/components/ui/Arrow";
import styles from "./QuoteForm.module.css";

const EMPTY: QuoteData = { name: "", whatsapp: "", eventType: "", date: "", guests: "", city: "", needs: "" };

type Errors = Partial<Record<keyof QuoteData, string>>;

function validate(d: QuoteData): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Conte como podemos te chamar.";
  if (d.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Informe o WhatsApp com DDD.";
  if (!d.eventType) e.eventType = "Escolha o tipo de evento.";
  if (d.needs.trim().length < 3) e.needs = "Conte um pouco do que você precisa.";
  return e;
}

/** Formata o telefone enquanto digita: (11) 99999-9999 */
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Props = {
  defaultEventType?: string;
  /** Título visível (no diálogo o título é do próprio diálogo). */
  titleId?: string;
};

export function QuoteForm({ defaultEventType = "", titleId }: Props) {
  const uid = useId();
  const [data, setData] = useState<QuoteData>({ ...EMPTY, eventType: defaultEventType });
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<"form" | "review">("form");
  const [copied, setCopied] = useState(false);

  const set = (k: keyof QuoteData) => (e: { target: { value: string } }) => {
    const value = k === "whatsapp" ? maskPhone(e.target.value) : e.target.value;
    setData((d) => ({ ...d, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(data);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStep("review");
  };

  const message = buildQuoteMessage(data);
  const link = whatsappLink(message);
  const [today, setToday] = useState<string>();
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const field = (k: keyof QuoteData) => ({
    id: `${uid}-${k}`,
    name: k,
    value: data[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });

  const err = (k: keyof QuoteData) =>
    errors[k] ? (
      <span id={`${uid}-${k}-err`} className={styles.error} role="alert">
        {errors[k]}
      </span>
    ) : null;

  if (step === "review") {
    return (
      <div className={styles.review} aria-live="polite">
        <p className="label dim">Tudo pronto</p>
        <p className={styles.reviewTitle}>Sua mensagem já está montada.</p>
        <pre className={styles.preview}>{message}</pre>

        <div className={styles.actions}>
          {link ? (
            <a className="btn" href={link} target="_blank" rel="noopener noreferrer">
              Enviar pelo WhatsApp <Arrow />
            </a>
          ) : (
            <>
              <p className={styles.notice} role="status">
                <span className="ph">WhatsApp não configurado</span> Defina o número em{" "}
                <code>src/config/company.ts</code> para ativar o envio direto.
              </p>
              <button type="button" className="btn" onClick={copy}>
                {copied ? "Mensagem copiada" : "Copiar mensagem"}
              </button>
            </>
          )}
          <button type="button" className={`${styles.back} link-line`} onClick={() => setStep("form")}>
            Editar informações
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-labelledby={titleId}>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className="label">Nome</span>
          <input {...field("name")} type="text" autoComplete="name" required />
          {err("name")}
        </label>

        <label className={styles.field}>
          <span className="label">WhatsApp</span>
          <input {...field("whatsapp")} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(00) 00000-0000" required />
          {err("whatsapp")}
        </label>

        <label className={styles.field}>
          <span className="label">Tipo de evento</span>
          <select {...field("eventType")} required>
            <option value="" disabled>
              Selecione
            </option>
            {events.map((ev) => (
              <option key={ev.slug} value={ev.title}>
                {ev.title}
              </option>
            ))}
            <option value="Outro">Outro</option>
          </select>
          {err("eventType")}
        </label>

        <label className={styles.field}>
          <span className="label">Data do evento</span>
          <input {...field("date")} type="date" min={today} />
        </label>

        <label className={styles.field}>
          <span className="label">Número de convidados</span>
          <input {...field("guests")} type="number" inputMode="numeric" min={1} placeholder="Aproximado" />
        </label>

        <label className={styles.field}>
          <span className="label">Cidade</span>
          <input
            {...field("city")}
            type="text"
            autoComplete="address-level2"
            placeholder={company.address.city || undefined}
          />
        </label>

        <label className={`${styles.field} ${styles.full}`}>
          <span className="label">O que você precisa?</span>
          <textarea
            {...field("needs")}
            rows={3}
            placeholder="Ex.: mesas e cadeiras para 80 pessoas, louças, toalhas e alguns arranjos."
            required
          />
          {err("needs")}
        </label>
      </div>

      <div className={styles.actions}>
        <button type="submit" className="btn">
          Continuar <Arrow />
        </button>
        <p className={styles.hint}>
          {hasWhatsApp()
            ? "Na próxima etapa, você envia tudo pelo WhatsApp em um toque."
            : "Na próxima etapa, você revisa a mensagem montada."}
        </p>
      </div>
    </form>
  );
}

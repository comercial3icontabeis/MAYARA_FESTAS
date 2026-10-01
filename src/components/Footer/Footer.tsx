import Link from "next/link";
import { company, cityLabel, instagramUrl, isFilled } from "@/config/company";
import { collections } from "@/data/collections";
import { events } from "@/data/events";
import { navLinks } from "@/lib/nav";
import { whatsappLink, defaultWhatsAppMessage } from "@/lib/whatsapp";
import styles from "./Footer.module.css";

function Ph({ label }: { label: string }) {
  return <span className="ph">[{label}]</span>;
}

export function Footer() {
  const wa = whatsappLink(defaultWhatsAppMessage());
  const ig = instagramUrl();
  const a = company.address;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.grid} container`}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>{company.name}</p>
          <p className={styles.tag}>
            Locação e fornecimento de artigos para festas e eventos em{" "}
            {isFilled(a.city) ? cityLabel() : <Ph label="CIDADE" />}.
          </p>
        </div>

        <nav className={styles.col} aria-label="Rodapé — navegação">
          <p className="label">Navegação</p>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Rodapé — acervo">
          <p className="label">Acervo</p>
          <ul>
            {collections.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/acervo/${c.slug}`} className="link-line">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Rodapé — eventos">
          <p className="label">Eventos</p>
          <ul>
            {events.map((e) => (
              <li key={e.slug}>
                <Link href={`/eventos/${e.slug}`} className="link-line">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className={styles.col}>
          <p className="label">Contato</p>
          <ul>
            <li>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="link-line">
                  WhatsApp {company.phone}
                </a>
              ) : (
                <Ph label="WHATSAPP" />
              )}
            </li>
            <li>
              {isFilled(company.email) ? (
                <a href={`mailto:${company.email}`} className="link-line">
                  {company.email}
                </a>
              ) : (
                <Ph label="E-MAIL" />
              )}
            </li>
            <li>
              {ig ? (
                <a href={ig} target="_blank" rel="noopener noreferrer" className="link-line">
                  @{company.instagram}
                </a>
              ) : (
                <Ph label="INSTAGRAM" />
              )}
            </li>
            <li>
              {isFilled(a.street) ? (
                <>
                  {a.street}
                  {a.neighborhood && `, ${a.neighborhood}`}
                  <br />
                  {a.city}
                  {a.state && ` — ${a.state}`}
                </>
              ) : (
                <Ph label="ENDEREÇO" />
              )}
            </li>
            <li>
              {company.hours.length ? (
                company.hours.map((h) => (
                  <span key={h.days} className={styles.hours}>
                    {h.days}: {h.hours}
                  </span>
                ))
              ) : (
                <Ph label="HORÁRIOS" />
              )}
            </li>
          </ul>
        </address>
      </div>

      <div className={`${styles.bottom} container`}>
        <p>
          © {year} {company.legalName || company.name}
          {company.cnpj && ` · CNPJ ${company.cnpj}`}
        </p>
        <a href="#top" className="link-line">
          Voltar ao topo ↑
        </a>
      </div>

      <p className={styles.giant} aria-hidden="true">
        {company.name}
      </p>
    </footer>
  );
}

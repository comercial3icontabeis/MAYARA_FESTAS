"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, instagramUrl } from "@/config/company";
import { navLinks } from "@/lib/nav";
import { useQuote } from "@/components/QuoteForm/QuoteProvider";
import { whatsappLink, defaultWhatsAppMessage } from "@/lib/whatsapp";
import styles from "./Navbar.module.css";

export function Navbar() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openQuote } = useQuote();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    firstLink.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = overHero && !scrolled && !open;
  const wa = whatsappLink(defaultWhatsAppMessage());
  const ig = instagramUrl();

  return (
    <>
      <header
        className={styles.nav}
        data-scrolled={scrolled || undefined}
        data-light={light || undefined}
        data-open={open || undefined}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label={`${company.name} — página inicial`}>
            {company.logo ? (
              <Image src={company.logo} alt={company.name} width={140} height={40} priority />
            ) : (
              <span className={styles.wordmark}>{company.name}</span>
            )}
          </Link>

          <nav className={styles.links} aria-label="Principal">
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

          <button type="button" className={styles.cta} onClick={() => openQuote()} aria-haspopup="dialog">
            Solicitar orçamento
          </button>

          <button
            ref={toggleRef}
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={styles.menu} data-open={open || undefined} inert={!open}>
        <nav aria-label="Menu móvel" className={styles.menuNav}>
          <ol>
            {navLinks.map((l, i) => (
              <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                <Link href={l.href} ref={i === 0 ? firstLink : undefined} onClick={() => setOpen(false)}>
                  <span className={styles.menuIdx}>{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.menuFoot} style={{ "--i": navLinks.length } as React.CSSProperties}>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setOpen(false);
              openQuote();
            }}
          >
            Solicitar orçamento
          </button>
          <div className={styles.menuMeta}>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            )}
            {ig && (
              <a href={ig} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

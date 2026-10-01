"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { media } from "@/data/media";
import { Photo } from "@/components/Photo/Photo";
import { RevealText } from "@/motion/RevealText";
import { ClipReveal } from "@/motion/ClipReveal";
import styles from "./BeforeAfter.module.css";

const clamp = (n: number) => Math.min(100, Math.max(0, n));

export function BeforeAfter() {
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const fromEvent = useCallback((clientX: number) => {
    const r = frame.current!.getBoundingClientRect();
    setPos(clamp(((clientX - r.left) / r.width) * 100));
  }, []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    frame.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    fromEvent(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) fromEvent(e.clientX);
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    frame.current?.releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const map: Record<string, number> = { ArrowLeft: pos - step, ArrowRight: pos + step, Home: 0, End: 100 };
    if (e.key in map) {
      e.preventDefault();
      setPos(clamp(map[e.key]));
    }
  };

  return (
    <section className={styles.section} aria-labelledby="ba-title">
      <div className="container">
        <header className={styles.head}>
          <RevealText as="h2" id="ba-title" className="h2">
            Do espaço à celebração.
          </RevealText>
          <p className={styles.intro}>Arraste para ver o mesmo ambiente antes e depois da composição.</p>
        </header>

        <ClipReveal direction="up" duration={1.6} className={styles.reveal}>
          <div
            ref={frame}
            className={styles.frame}
            data-dragging={dragging || undefined}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <div className={styles.layer}>
              <Photo media={media.antes} sizes="(min-width: 1680px) 1600px, 100vw" />
            </div>
            <div className={styles.layer} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              <Photo media={media.depois} sizes="(min-width: 1680px) 1600px, 100vw" />
            </div>

            <span className={`${styles.tag} ${styles.tagBefore} label`} style={{ opacity: pos < 12 ? 0 : 1 }}>
              Antes
            </span>
            <span className={`${styles.tag} ${styles.tagAfter} label`} style={{ opacity: pos > 88 ? 0 : 1 }}>
              Depois
            </span>

            <div
              className={styles.handle}
              style={{ left: `${pos}%` }}
              role="slider"
              tabIndex={0}
              aria-label="Comparar antes e depois"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(100 - pos)}% do ambiente montado visível`}
              onKeyDown={onKey}
            >
              <span className={styles.knob} aria-hidden="true">
                <svg viewBox="0 0 28 12" fill="none">
                  <path d="M6 1 1 6l5 5M22 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            </div>
          </div>
        </ClipReveal>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { events } from "@/data/events";
import { Photo } from "@/components/Photo/Photo";
import { RevealText } from "@/motion/RevealText";
import styles from "./EventTypes.module.css";

export function EventTypes() {
  const [active, setActive] = useState(0);

  return (
    <section id="eventos" className={styles.section} aria-labelledby="eventos-title" tabIndex={-1}>
      <div className={`${styles.grid} container`}>
        <div className={styles.head}>
          <RevealText as="h2" id="eventos-title" className="h2">
            Para cada ocasião, uma composição.
          </RevealText>
        </div>

        <ol className={styles.list}>
          {events.map((ev, i) => (
            <li key={ev.slug} data-active={i === active || undefined}>
              <Link
                href={`/eventos/${ev.slug}`}
                className={styles.item}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className={styles.name}>{ev.title}</span>
                <span className={styles.short}>{ev.short}</span>
                <span className={styles.thumb} aria-hidden="true">
                  <Photo media={ev.photo} sizes="30vw" compact />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.frame}>
            {events.map((ev, i) => (
              <div key={ev.slug} className={styles.layer} data-active={i === active || undefined} data-before={i < active || undefined}>
                <Photo media={ev.photo} sizes="(min-width: 900px) 34vw, 1px" />
              </div>
            ))}
          </div>
          <p className={`${styles.caption} label`}>
            {events[active].title}
          </p>
        </div>
      </div>
    </section>
  );
}

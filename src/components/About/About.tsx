import { company, cityLabel, isFilled } from "@/config/company";
import { media } from "@/data/media";
import { Photo } from "@/components/Photo/Photo";
import { RevealText } from "@/motion/RevealText";
import { RevealImage } from "@/motion/RevealImage";
import { ParallaxImage } from "@/motion/ParallaxImage";
import styles from "./About.module.css";

const isPh = (s: string) => s.trim().startsWith("[");

export function About() {
  const city = cityLabel();
  const cityIsPh = !isFilled(company.address.city);

  return (
    <section id="sobre" className={styles.section} aria-labelledby="sobre-title" tabIndex={-1}>
      <div className={`${styles.grid} container`}>
        <div className={styles.head}>
          <p className="label dim">[ Sobre ]</p>
          <RevealText as="h2" id="sobre-title" className="h2">
            Por trás de cada evento, <em>existe uma equipe.</em>
          </RevealText>
        </div>

        <RevealImage className={styles.team}>
          <Photo media={media.aboutTeam} sizes="(min-width: 900px) 56vw, 100vw" />
        </RevealImage>

        <div className={styles.copy}>
          {company.about.paragraphs.map((p) => (
            <p key={p} className={isPh(p) ? `${styles.p} ph` : styles.p}>
              {p}
            </p>
          ))}
          <p className={styles.local}>
            Locação e fornecimento de artigos para festas e eventos em{" "}
            <span className={cityIsPh ? "ph" : undefined}>{city}</span>
            {company.areaServed.length > 0 && <> e região — {company.areaServed.join(", ")}</>}.
          </p>
        </div>

        <ParallaxImage className={styles.stock} amount={14}>
          <Photo media={media.aboutStock} sizes="(min-width: 900px) 24vw, 50vw" />
        </ParallaxImage>
        <ParallaxImage className={styles.backstage} amount={8}>
          <Photo media={media.aboutBackstage} sizes="(min-width: 900px) 30vw, 50vw" />
        </ParallaxImage>
        <ParallaxImage className={styles.prep} amount={18}>
          <Photo media={media.aboutPrep} sizes="(min-width: 900px) 22vw, 50vw" />
        </ParallaxImage>
      </div>
    </section>
  );
}

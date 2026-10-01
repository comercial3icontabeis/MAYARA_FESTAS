import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company, isFilled } from "@/config/company";
import { events, getEvent } from "@/data/events";
import { collections } from "@/data/collections";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { DetailBody } from "@/components/DetailBody/DetailBody";

type Params = { params: Promise<{ slug: string }> };

const where = isFilled(company.address.city) ? ` em ${company.address.city}` : "";

export const dynamicParams = false;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const e = getEvent((await params).slug);
  if (!e) return {};
  return {
    title: `Locação de artigos para ${e.title.toLowerCase()}${where}`,
    description: e.intro,
    alternates: { canonical: `/eventos/${e.slug}` },
    openGraph: { title: `${e.title} — ${company.name}`, description: e.intro, url: `/eventos/${e.slug}` },
  };
}

export default async function EventPage({ params }: Params) {
  const e = getEvent((await params).slug);
  if (!e) notFound();

  return (
    <>
      <PageHeader
        title={e.title}
        intro={e.intro}
        photo={e.photo}
        crumbs={[
          { name: "Eventos", path: "/eventos" },
          { name: e.title, path: `/eventos/${e.slug}` },
        ]}
      />
      <DetailBody
        eventType={e.title}
        relatedTitle="Peças do acervo para este evento"
        related={collections.map((c) => ({ href: `/acervo/${c.slug}`, title: c.title }))}
      />
    </>
  );
}

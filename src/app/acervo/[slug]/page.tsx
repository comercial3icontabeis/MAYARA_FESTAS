import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company, isFilled } from "@/config/company";
import { collections, getCollection } from "@/data/collections";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { DetailBody } from "@/components/DetailBody/DetailBody";

type Params = { params: Promise<{ slug: string }> };

const where = isFilled(company.address.city) ? ` em ${company.address.city}` : "";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCollection((await params).slug);
  if (!c) return {};
  return {
    title: `Locação de ${c.title.toLowerCase()}${where}`,
    description: c.intro,
    alternates: { canonical: `/acervo/${c.slug}` },
    openGraph: { title: `${c.title} — ${company.name}`, description: c.intro, url: `/acervo/${c.slug}` },
  };
}

export default async function CollectionPage({ params }: Params) {
  const c = getCollection((await params).slug);
  if (!c) notFound();

  return (
    <>
      <PageHeader
        title={c.title}
        intro={c.intro}
        photo={c.photo}
        crumbs={[
          { name: "Acervo", path: "/acervo" },
          { name: c.title, path: `/acervo/${c.slug}` },
        ]}
      />
      <DetailBody
        items={c.items}
        relatedTitle="Outras categorias"
        related={collections.filter((o) => o.slug !== c.slug).map((o) => ({ href: `/acervo/${o.slug}`, title: o.title }))}
      />
    </>
  );
}

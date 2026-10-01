import type { Metadata } from "next";
import { company, isFilled } from "@/config/company";
import { collections } from "@/data/collections";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { EditorialList } from "@/components/EditorialList/EditorialList";

const where = isFilled(company.address.city) ? ` em ${company.address.city}` : "";

export const metadata: Metadata = {
  title: `Acervo — locação de artigos para festas${where}`,
  description: `Mesas, cadeiras, louças, cristais, mobiliário, têxteis e peças decorativas para locação${where}.`,
  alternates: { canonical: "/acervo" },
};

export default function AcervoPage() {
  return (
    <>
      <PageHeader
        kicker="[ Acervo ]"
        title={
          <>
            Um acervo para <em>cada momento.</em>
          </>
        }
        intro={`Peças para locação${where}, escolhidas para conversar entre si e compor ambientes completos.`}
        crumbs={[{ name: "Acervo", path: "/acervo" }]}
      />
      <EditorialList
        items={collections.map((c) => ({ href: `/acervo/${c.slug}`, title: c.title, text: c.intro, photo: c.photo }))}
      />
    </>
  );
}

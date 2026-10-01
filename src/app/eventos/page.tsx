import type { Metadata } from "next";
import { company, isFilled } from "@/config/company";
import { events } from "@/data/events";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { EditorialList } from "@/components/EditorialList/EditorialList";

const where = isFilled(company.address.city) ? ` em ${company.address.city}` : "";

export const metadata: Metadata = {
  title: `Eventos — locação para casamentos, aniversários e festas${where}`,
  description: `Locação de artigos para casamentos, aniversários, festas infantis, eventos corporativos, chás e recepções${where}.`,
  alternates: { canonical: "/eventos" },
};

export default function EventosPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Para cada ocasião, uma composição.
          </>
        }
        intro="Do jantar íntimo à grande recepção: cada tipo de evento pede peças, escala e atmosfera próprias."
        crumbs={[{ name: "Eventos", path: "/eventos" }]}
      />
      <EditorialList items={events.map((e) => ({ href: `/eventos/${e.slug}`, title: e.title, text: e.intro, photo: e.photo }))} />
    </>
  );
}

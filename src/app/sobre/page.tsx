import type { Metadata } from "next";
import { company } from "@/config/company";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { About } from "@/components/About/About";
import { TrustSection } from "@/components/TrustSection/TrustSection";
import { ProcessTimeline } from "@/components/ProcessTimeline/ProcessTimeline";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça a ${company.name}: equipe, acervo e o cuidado em cada etapa da locação para festas e eventos.`,
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Quem está por trás dos detalhes.
          </>
        }
        crumbs={[{ name: "Sobre", path: "/sobre" }]}
      />
      <About />
      <ProcessTimeline />
      <TrustSection />
    </>
  );
}

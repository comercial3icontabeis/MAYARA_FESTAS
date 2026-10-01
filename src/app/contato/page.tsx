import type { Metadata } from "next";
import { company, isFilled } from "@/config/company";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { QuoteForm } from "@/components/QuoteForm/QuoteForm";
import styles from "./contato.module.css";

const where = isFilled(company.address.city) ? ` em ${company.address.city}` : "";

export const metadata: Metadata = {
  title: "Contato e orçamento",
  description: `Solicite um orçamento de locação de artigos para festas e eventos${where}. Conte o que você está planejando.`,
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        kicker="[ Contato ]"
        title={
          <>
            Vamos criar esse <em>momento?</em>
          </>
        }
        intro="Conte para a gente o que você está planejando. A partir daí, construímos juntos a composição ideal."
        crumbs={[{ name: "Contato", path: "/contato" }]}
      />
      <div className={`${styles.wrap} container`}>
        <h2 id="form-title" className="sr-only">
          Formulário de orçamento
        </h2>
        <QuoteForm titleId="form-title" />
      </div>
    </>
  );
}

import { Hero } from "@/components/Hero/Hero";
import { EditorialIntro } from "@/components/EditorialIntro/EditorialIntro";
import { CollectionSection } from "@/components/CollectionSection/CollectionSection";
import { ImagineSection } from "@/components/ImagineSection/ImagineSection";
import { EventTypes } from "@/components/EventTypes/EventTypes";
import { Portfolio } from "@/components/Portfolio/Portfolio";
import { BeforeAfter } from "@/components/BeforeAfter/BeforeAfter";
import { ProcessTimeline } from "@/components/ProcessTimeline/ProcessTimeline";
import { TrustSection } from "@/components/TrustSection/TrustSection";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { About } from "@/components/About/About";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";

/**
 * Jornada: inspiração → descoberta → imaginação → confiança → orçamento.
 */
export default function Home() {
  return (
    <>
      {/* Inspiração */}
      <Hero />
      <EditorialIntro />
      {/* Descoberta */}
      <CollectionSection />
      {/* Imaginação */}
      <ImagineSection />
      <EventTypes />
      <Portfolio />
      <BeforeAfter />
      {/* Confiança */}
      <ProcessTimeline />
      <TrustSection />
      <Testimonials />
      <About />
      {/* Orçamento */}
      <FinalCTA />
    </>
  );
}

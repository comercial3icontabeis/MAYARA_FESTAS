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
import { getGallery } from "@/data/gallery";

/**
 * Jornada: inspiração → descoberta → imaginação → confiança → orçamento.
 */
export default function Home() {
  const gallery = getGallery();
  return (
    <>
      {/* Inspiração */}
      <Hero panels={gallery} />
      <EditorialIntro />
      {/* Descoberta */}
      <CollectionSection />
      {/* Imaginação */}
      <ImagineSection />
      <EventTypes />
      <Portfolio items={gallery} />
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

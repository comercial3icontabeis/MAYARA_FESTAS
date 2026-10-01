import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { company, isFilled } from "@/config/company";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { QuoteProvider } from "@/components/QuoteForm/QuoteProvider";
import { WhatsAppFloat } from "@/components/WhatsAppFloat/WhatsAppFloat";
import { MotionProvider } from "@/motion/MotionProvider";
import "./globals.css";

const serif = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const city = isFilled(company.address.city) ? ` em ${company.address.city}` : "";
const defaultTitle = `${company.name} — ${company.seo.title}${city}`;

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: defaultTitle, template: `%s — ${company.name}` },
  description: company.seo.description,
  applicationName: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: company.name,
    title: defaultTitle,
    description: company.seo.description,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: company.seo.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7efec",
  width: "device-width",
  initialScale: 1,
};

/** Aplica `motion` no <html> antes do primeiro paint (evita flash do conteúdo animado). */
const motionBootstrap = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema(), websiteSchema()]) }}
        />
      </head>
      <body id="top">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <QuoteProvider>
          <Navbar />
          <main id="conteudo" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </QuoteProvider>
        <MotionProvider />
      </body>
    </html>
  );
}

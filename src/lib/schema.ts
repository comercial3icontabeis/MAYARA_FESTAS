import { company, isFilled } from "@/config/company";

/** JSON-LD gerado somente com dados reais preenchidos em company.ts. */
export function organizationSchema() {
  const a = company.address;
  const hasAddress = isFilled(a.city);
  const sameAs = [company.instagram && `https://instagram.com/${company.instagram}`].filter(Boolean);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${company.siteUrl}/#business`,
    name: company.name,
    url: company.siteUrl,
    description: company.seo.description,
  };
  if (isFilled(company.legalName)) data.legalName = company.legalName;
  if (isFilled(company.logo)) data.logo = `${company.siteUrl}${company.logo}`;
  if (isFilled(company.phone)) data.telephone = company.phone;
  if (isFilled(company.email)) data.email = company.email;
  if (sameAs.length) data.sameAs = sameAs;
  if (hasAddress) {
    data.address = {
      "@type": "PostalAddress",
      ...(a.street && { streetAddress: a.street }),
      addressLocality: a.city,
      ...(a.state && { addressRegion: a.state }),
      ...(a.postalCode && { postalCode: a.postalCode }),
      addressCountry: a.country,
    };
  }
  if (company.areaServed.length) data.areaServed = company.areaServed.map((name) => ({ "@type": "City", name }));
  if (company.hours.length) {
    data.openingHours = company.hours.map((h) => `${h.days} ${h.hours}`);
  }
  return data;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${company.siteUrl}/#website`,
    url: company.siteUrl,
    name: company.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${company.siteUrl}/#business` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${company.siteUrl}${it.path}`,
    })),
  };
}

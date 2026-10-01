import type { MetadataRoute } from "next";
import { company } from "@/config/company";
import { collections } from "@/data/collections";
import { events } from "@/data/events";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });

  return [
    page("", 1),
    page("/acervo", 0.9),
    ...collections.map((c) => page(`/acervo/${c.slug}`, 0.8)),
    page("/eventos", 0.9),
    ...events.map((e) => page(`/eventos/${e.slug}`, 0.8)),
    page("/sobre", 0.6),
    page("/contato", 0.7),
  ];
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.sridevivilasmittaikadai.com";
  return ["", "/menu", "/about", "/contact", "/gallery"].map((p) => ({
    url: base + p,
    lastModified: new Date(),
  }));
}

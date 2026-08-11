import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Static routes for now; once /flights, /hotels etc. have real dynamic
 * detail pages (e.g. /hotels/[slug]), extend this by fetching slugs and
 * mapping them into additional entries here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/flights", "/hotels", "/tours", "/visa", "/offers", "/blog", "/about"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}

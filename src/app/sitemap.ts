import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { hotDeals, helpTiles, topDestinations, trendingDestinations } from "@/features/home/data";
import { newsItems } from "@/features/content/data/news-items";
import { blogPosts } from "@/features/content/data/blog-posts";
import { travelGuides } from "@/features/content/data/travel-guides";
import { umrahPackages } from "@/features/packages/data/umrah-packages";
import { hajjPackages } from "@/features/packages/data/hajj-packages";
import { tourPackages } from "@/features/packages/data/tour-packages";
import { holidayPackages } from "@/features/holiday/data/holiday-packages";
import { allHotels } from "@/features/hotels/data/hotels";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/flights", "/hotels", "/destinations", "/visa", "/offers", "/blog", "/about", "/news", "/travel-guide", "/umrah-packages", "/hajj-packages", "/tour-packages", "/holiday-packages"];
  const detailRoutes = [
    ...trendingDestinations.map((item) => item.href),
    ...topDestinations.map((item) => item.href),
    ...allHotels.map((item) => item.href),
    ...holidayPackages.map((item) => item.href),
    ...umrahPackages.map((item) => item.href),
    ...hajjPackages.map((item) => item.href),
    ...tourPackages.map((item) => item.href),
    ...travelGuides.map((item) => item.href),
    ...blogPosts.map((item) => item.href),
    ...newsItems.map((item) => item.href),
    ...hotDeals.map((item) => item.href),
    ...helpTiles.map((item) => item.href),
  ];
  const uniqueRoutes = [...new Set([...routes, ...detailRoutes])];

  return uniqueRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}

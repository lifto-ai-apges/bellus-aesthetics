import { MetadataRoute } from "next";
import { servicesData } from "../data/services";
import { articlesData } from "../data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bellus.ph";

  // Static routes
  const staticRoutes = [
    "",
    "/services",
    "/products",
    "/quiz",
    "/articles",
    "/about",
    "/contact",
    "/book",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic service categories
  const categoryRoutes = servicesData.map((cat) => ({
    url: `${baseUrl}/services/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic articles slugs
  const articleRoutes = articlesData.map((art) => ({
    url: `${baseUrl}/articles/${art.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}

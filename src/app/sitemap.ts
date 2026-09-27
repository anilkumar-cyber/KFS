import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllLoans } from "@/lib/queries/loans";
import { getAllProperties } from "@/lib/queries/properties";
import { getAllTaxServices } from "@/lib/queries/tax-services";
import { getAllPosts } from "@/lib/queries/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();
  const [loanProducts, properties, taxServices, blogPosts] = await Promise.all([
    getAllLoans(),
    getAllProperties(),
    getAllTaxServices(),
    getAllPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/loans`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/real-estate`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/auction-properties`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tax-services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/emi-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/eligibility-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/testimonials`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/sitemap-page`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const loanRoutes: MetadataRoute.Sitemap = loanProducts.map((loan) => ({
    url: `${baseUrl}/loans/${loan.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${baseUrl}/real-estate/${property.slug}`,
    lastModified: property.postedOn,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const taxServiceRoutes: MetadataRoute.Sitemap = taxServices.map((service) => ({
    url: `${baseUrl}/tax-services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.publishedOn,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...loanRoutes, ...propertyRoutes, ...taxServiceRoutes, ...blogRoutes];
}

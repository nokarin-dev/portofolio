import { blogPosts } from "@/lib/blog"
import type { MetadataRoute } from "next"

const BASE_URL = "https://nokarin.xyz"

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects/aqloss`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...blogRoutes,
  ]
}

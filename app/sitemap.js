import { supabase } from "@/lib/supabase";
import { getAllBlogSlugs } from "@/lib/blog";

export default async function sitemap() {
  const baseUrl = "https://unknwnquotes.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Blog posts
  let blogPages = [];
  try {
    const blogSlugs = await getAllBlogSlugs();
    blogPages = blogSlugs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (err) {
    console.error("Sitemap: Error fetching blog posts:", err);
  }

  // Category pages
  let categoryPages = [];
  try {
    const { data } = await supabase
      .from("quotes")
      .select("category")
      .limit(5000);

    if (data) {
      const categories = [
        ...new Set(data.map((d) => d.category).filter(Boolean)),
      ];
      categoryPages = categories.map((cat) => ({
        url: `${baseUrl}/categories/${cat}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error("Sitemap: Error fetching categories:", err);
  }

  // Quote combo pages (existing genre/category/language routes)
  let quoteComboPages = [];
  try {
    const { data } = await supabase
      .from("quotes")
      .select("genre, category, language")
      .limit(5000);

    if (data) {
      const combos = new Set(
        data
          .filter((d) => d.genre)
          .map((d) => `${d.genre}/${d.category}/${d.language}`)
      );
      quoteComboPages = [...combos].map((combo) => ({
        url: `${baseUrl}/quotes/${combo}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      }));
    }
  } catch (err) {
    console.error("Sitemap: Error fetching quote combos:", err);
  }

  // Individual quote detail pages
  let quoteDetailPages = [];
  try {
    const { data } = await supabase
      .from("quotes")
      .select("slug, id, updated_at")
      .limit(5000);

    if (data) {
      quoteDetailPages = data
        .filter((q) => q.slug)
        .map((q) => ({
          url: `${baseUrl}/quote/${q.slug}`,
          lastModified: q.updated_at ? new Date(q.updated_at) : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        }));
    }
  } catch (err) {
    console.error("Sitemap: Error fetching quote details:", err);
  }

  return [
    ...staticPages,
    ...blogPages,
    ...categoryPages,
    ...quoteComboPages,
    ...quoteDetailPages,
  ];
}

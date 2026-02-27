import { supabase } from "@/lib/supabase";

const POSTS_PER_PAGE = 12;

/**
 * Fetch paginated blog posts with their linked quote
 */
export async function getBlogPosts({ page = 1, category = null, limit = POSTS_PER_PAGE } = {}) {
  let query = supabase
    .from("blog_posts")
    .select("*, quotes(*)", { count: "exact" })
    .order("publish_date", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, count, error } = await query;
  if (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], total: 0 };
  }

  return { posts: data || [], total: count || 0 };
}

/**
 * Fetch a single blog post by slug with its linked quote
 */
export async function getBlogPostBySlug(slug) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, quotes(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data;
}

/**
 * Fetch related posts by category (excluding current post)
 */
export async function getRelatedPosts(category, excludeSlug, limit = 3) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, featured_image, publish_date, category")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .order("publish_date", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch all unique blog categories
 */
export async function getBlogCategories() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("category")
    .limit(1000);

  if (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }

  return [...new Set((data || []).map((d) => d.category).filter(Boolean))].sort();
}

/**
 * Fetch all blog post slugs (for sitemap generation)
 */
export async function getAllBlogSlugs() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .order("publish_date", { ascending: false })
    .limit(5000);

  if (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }

  return data || [];
}

import Link from "next/link";
import { getBlogPosts, getBlogCategories } from "@/lib/blog";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — Quotes, Stories & Deep Insights",
  description:
    "Explore in-depth articles about the stories behind powerful quotes. Motivation, discipline, growth, leadership, and personal development insights.",
  alternates: {
    canonical: "https://unknwnquotes.com/blog",
  },
  openGraph: {
    title: "Blog — unknwnquotes.com",
    description:
      "Explore in-depth articles about the stories behind powerful quotes.",
    url: "https://unknwnquotes.com/blog",
    siteName: "unknwnquotes.com",
    images: [
      { url: "/logo.png", width: 512, height: 512, alt: "unknwnquotes.com" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — unknwnquotes.com",
    description:
      "Explore in-depth articles about the stories behind powerful quotes.",
    images: ["/logo.png"],
  },
};

export default async function BlogPage({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const category = searchParams?.category || null;
  const [{ posts, total }, categories] = await Promise.all([
    getBlogPosts({ page, category }),
    getBlogCategories(),
  ]);

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-12 text-center animate-fade-in-up">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          The Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/50">
          Stories, insights, and deep dives into the quotes that shape how we
          think, act, and grow.
        </p>
      </section>

      {/* Category filters */}
      {categories.length > 0 && (
        <section className="mb-10 animate-fade-in-up">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/blog"
              className={`rounded-full border px-4 py-2 text-sm capitalize transition-all duration-200 ${
                !category
                  ? "border-white bg-white text-black font-medium"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`rounded-full border px-4 py-2 text-sm capitalize transition-all duration-200 ${
                  category === cat
                    ? "border-white bg-white text-black font-medium"
                    : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdBanner slot="blog-top" />

      {/* Posts grid */}
      {posts.length > 0 ? (
        <section className="animate-fade-in-up">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <article
                key={post.id}
                className="group relative flex flex-col rounded-xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]"
              >
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading={i < 6 ? "eager" : "lazy"}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {post.category && (
                    <span className="mb-2 inline-block w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs capitalize text-white/50">
                      {post.category}
                    </span>
                  )}
                  <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-white/90">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-white/40">
                      {post.excerpt.length > 150
                        ? post.excerpt.slice(0, 150) + "…"
                        : post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <time dateTime={post.publish_date}>
                      {new Date(post.publish_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    {post.author && (
                      <>
                        <span>·</span>
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Linked quote preview */}
                {post.quotes && (
                  <div className="border-t border-white/5 px-6 py-3">
                    <p className="text-xs italic text-white/30 line-clamp-2">
                      &ldquo;{post.quotes.quote}&rdquo;
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`/blog?page=${page - 1}${category ? `&category=${category}` : ""}`}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  ← Previous
                </Link>
              )}
              <span className="px-4 py-2 text-sm text-white/40">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/blog?page=${page + 1}${category ? `&category=${category}` : ""}`}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  Next →
                </Link>
              )}
            </nav>
          )}
        </section>
      ) : (
        <section className="py-20 text-center">
          <p className="mb-2 text-2xl text-white/30">No posts yet</p>
          <p className="text-sm text-white/20">
            Blog posts will appear here once they are published.
          </p>
        </section>
      )}

      <AdBanner slot="blog-bottom" />
    </div>
  );
}

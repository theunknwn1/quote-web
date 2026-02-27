import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/blog";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: `https://unknwnquotes.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.meta_title || post.title} — unknwnquotes.com`,
      description: post.meta_description || post.excerpt,
      url: `https://unknwnquotes.com/blog/${post.slug}`,
      siteName: "unknwnquotes.com",
      images: [
        {
          url: post.featured_image || "/logo.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publish_date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.meta_title || post.title} — unknwnquotes.com`,
      description: post.meta_description || post.excerpt,
      images: [post.featured_image || "/logo.png"],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(
    post.category,
    post.slug,
    3
  );

  // Article structured data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.featured_image || "https://unknwnquotes.com/logo.png",
    datePublished: post.publish_date,
    dateModified: post.updated_at || post.publish_date,
    author: {
      "@type": "Person",
      name: post.author || "unknwnquotes Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: "unknwnquotes.com",
      logo: {
        "@type": "ImageObject",
        url: "https://unknwnquotes.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://unknwnquotes.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/40 animate-fade-in">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="transition-colors hover:text-white">
            Blog
          </Link>
          <span>/</span>
          <span className="text-white/70 line-clamp-1">{post.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main article */}
          <article className="animate-fade-in-up">
            {/* Header */}
            <header className="mb-8">
              {post.category && (
                <Link
                  href={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs capitalize text-white/50 transition-colors hover:text-white"
                >
                  {post.category}
                </Link>
              )}
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                {post.author && <span>By {post.author}</span>}
                <time dateTime={post.publish_date}>
                  {new Date(post.publish_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </header>

            {/* Featured image */}
            {post.featured_image && (
              <div className="mb-8 overflow-hidden rounded-xl">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full object-cover"
                  loading="eager"
                />
              </div>
            )}

            {/* Linked Quote */}
            {post.quotes && (
              <blockquote className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-lg italic leading-relaxed text-white/80">
                  &ldquo;{post.quotes.quote}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {post.quotes.category && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs capitalize text-white/40">
                      {post.quotes.category}
                    </span>
                  )}
                  {post.quotes.genre && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs capitalize text-white/40">
                      {post.quotes.genre}
                    </span>
                  )}
                </div>
              </blockquote>
            )}

            <AdBanner slot="blog-post-top" />

            {/* Article body */}
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:tracking-tight prose-headings:font-semibold
                prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl
                prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl
                prose-p:leading-relaxed prose-p:text-white/70
                prose-blockquote:border-white/20 prose-blockquote:text-white/60 prose-blockquote:italic
                prose-a:text-white prose-a:underline prose-a:underline-offset-4
                prose-strong:text-white/90
                prose-ul:text-white/70 prose-ol:text-white/70
                prose-li:marker:text-white/30"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <AdBanner slot="blog-post-bottom" />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Internal links */}
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <Link
                href="/"
                className="text-white/40 underline underline-offset-4 transition-colors hover:text-white"
              >
                ← Back to Home
              </Link>
              <Link
                href="/blog"
                className="text-white/40 underline underline-offset-4 transition-colors hover:text-white"
              >
                All Posts
              </Link>
              {post.category && (
                <Link
                  href={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="text-white/40 underline underline-offset-4 transition-colors hover:text-white capitalize"
                >
                  More in {post.category}
                </Link>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdBanner slot="blog-sidebar" />

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="mb-4 text-lg font-semibold">Related Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="block group"
                    >
                      <p className="text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                        {rp.title}
                      </p>
                      <p className="mt-1 text-xs text-white/30">
                        {new Date(rp.publish_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Explore categories */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-4 text-lg font-semibold">Explore</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog"
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 transition-all hover:border-white/30 hover:text-white"
                >
                  All Posts
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 transition-all hover:border-white/30 hover:text-white"
                >
                  Quotes
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 transition-all hover:border-white/30 hover:text-white"
                >
                  About
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

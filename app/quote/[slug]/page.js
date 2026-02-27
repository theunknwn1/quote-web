import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdBanner from "@/components/AdBanner";
import LikeButton from "@/components/LikeButton";

export const dynamic = "force-dynamic";

async function getQuoteBySlug(slug) {
  // Try slug first, then fallback to id
  let { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    // Fallback: try as UUID
    const result = await supabase
      .from("quotes")
      .select("*")
      .eq("id", slug)
      .single();
    data = result.data;
    error = result.error;
  }

  return data;
}

async function getRelatedQuotes(category, genre, excludeId) {
  const { data } = await supabase
    .from("quotes")
    .select("id, quote, slug, category, genre, language, likes, author")
    .eq("category", category)
    .neq("id", excludeId)
    .order("likes", { ascending: false })
    .limit(6);

  return data || [];
}

export async function generateMetadata({ params }) {
  const quote = await getQuoteBySlug(params.slug);
  if (!quote) return { title: "Quote Not Found" };

  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
  const title =
    quote.meta_title ||
    `${quote.quote?.slice(0, 60)}… — ${cap(quote.category)} Quote`;
  const description =
    quote.meta_description ||
    `Explore the deep meaning and story behind this ${quote.category} quote. ${quote.quote?.slice(0, 120)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://unknwnquotes.com/quote/${quote.slug || quote.id}`,
    },
    openGraph: {
      title: `${title} — unknwnquotes.com`,
      description,
      url: `https://unknwnquotes.com/quote/${quote.slug || quote.id}`,
      siteName: "unknwnquotes.com",
      images: [
        { url: "/logo.png", width: 512, height: 512, alt: "unknwnquotes.com" },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — unknwnquotes.com`,
      description,
      images: ["/logo.png"],
    },
  };
}

export default async function QuoteDetailPage({ params }) {
  const quote = await getQuoteBySlug(params.slug);
  if (!quote) notFound();

  const relatedQuotes = await getRelatedQuotes(
    quote.category,
    quote.genre,
    quote.id
  );

  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: quote.meta_title || `${cap(quote.category)} Quote — Deep Meaning & Story`,
    description:
      quote.meta_description || `Explore the deep meaning behind: ${quote.quote?.slice(0, 120)}`,
    author: {
      "@type": "Person",
      name: quote.author || "Unknown",
    },
    publisher: {
      "@type": "Organization",
      name: "unknwnquotes.com",
      logo: {
        "@type": "ImageObject",
        url: "https://unknwnquotes.com/logo.png",
      },
    },
    datePublished: quote.created_at,
    dateModified: quote.updated_at || quote.created_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://unknwnquotes.com/quote/${quote.slug || quote.id}`,
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
          {quote.category && (
            <>
              <Link
                href={`/categories/${quote.category}`}
                className="capitalize transition-colors hover:text-white"
              >
                {quote.category}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-white/70 line-clamp-1">Quote</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <article className="animate-fade-in-up">
            {/* The Quote */}
            <section className="mb-10">
              <blockquote className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <span className="absolute -top-4 left-6 text-6xl leading-none text-white/10 select-none">
                  &ldquo;
                </span>
                <p className="text-2xl font-light leading-relaxed text-white/90 sm:text-3xl lg:text-4xl">
                  {quote.quote}
                </p>
                {quote.author && (
                  <footer className="mt-6 text-lg text-white/50">
                    — {quote.author}
                  </footer>
                )}
              </blockquote>

              {/* Meta tags */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {quote.genre && (
                  <Link
                    href={`/quotes/${quote.genre}/success/english`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm capitalize text-white/50 transition-colors hover:text-white"
                  >
                    {quote.genre}
                  </Link>
                )}
                {quote.category && (
                  <Link
                    href={`/categories/${quote.category}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm capitalize text-white/50 transition-colors hover:text-white"
                  >
                    {quote.category}
                  </Link>
                )}
                {quote.language && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm capitalize text-white/50">
                    {quote.language}
                  </span>
                )}
                <LikeButton quoteId={quote.id} initialLikes={quote.likes || 0} />
              </div>
            </section>

            <AdBanner slot="quote-detail-top" />

            {/* Deep Meaning */}
            {quote.deep_meaning && (
              <section className="mb-10">
                <h2 className="mb-5 text-2xl font-semibold tracking-tight text-white">
                  Deep Meaning
                </h2>
                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-p:leading-relaxed prose-p:text-white/70
                    prose-headings:tracking-tight prose-headings:font-semibold
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-blockquote:border-white/20 prose-blockquote:text-white/60
                    prose-strong:text-white/90"
                  dangerouslySetInnerHTML={{ __html: quote.deep_meaning }}
                />
              </section>
            )}

            <AdBanner slot="quote-detail-mid" />

            {/* Story */}
            {quote.story && (
              <section className="mb-10">
                <h2 className="mb-5 text-2xl font-semibold tracking-tight text-white">
                  The Story Behind the Words
                </h2>
                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-p:leading-relaxed prose-p:text-white/70
                    prose-headings:tracking-tight prose-headings:font-semibold
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-blockquote:border-white/20 prose-blockquote:text-white/60
                    prose-strong:text-white/90"
                  dangerouslySetInnerHTML={{ __html: quote.story }}
                />
              </section>
            )}

            {/* If no deep_meaning and no story yet */}
            {!quote.deep_meaning && !quote.story && (
              <section className="mb-10 rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center">
                <p className="text-white/40">
                  Deep meaning and story for this quote are coming soon.
                </p>
              </section>
            )}

            <AdBanner slot="quote-detail-bottom" />

            {/* Internal links */}
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <Link
                href="/"
                className="text-white/40 underline underline-offset-4 transition-colors hover:text-white"
              >
                ← Back to Home
              </Link>
              {quote.category && (
                <Link
                  href={`/categories/${quote.category}`}
                  className="text-white/40 underline underline-offset-4 transition-colors hover:text-white capitalize"
                >
                  More {quote.category} Quotes
                </Link>
              )}
              <Link
                href="/blog"
                className="text-white/40 underline underline-offset-4 transition-colors hover:text-white"
              >
                Read the Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdBanner slot="quote-detail-sidebar" />

            {/* Related quotes */}
            {relatedQuotes.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="mb-4 text-lg font-semibold">
                  More {cap(quote.category)} Quotes
                </h3>
                <div className="space-y-4">
                  {relatedQuotes.map((rq) => (
                    <Link
                      key={rq.id}
                      href={`/quote/${rq.slug || rq.id}`}
                      className="block group"
                    >
                      <blockquote className="border-l-2 border-white/20 pl-3 text-sm text-white/60 transition-colors group-hover:text-white/80">
                        &ldquo;
                        {rq.quote.length > 100
                          ? rq.quote.slice(0, 100) + "…"
                          : rq.quote}
                        &rdquo;
                      </blockquote>
                      {rq.author && (
                        <p className="mt-1 pl-3 text-xs text-white/30">
                          — {rq.author}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Explore */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-4 text-lg font-semibold">Explore</h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="text-sm text-white/50 transition-colors hover:text-white"
                >
                  → Trending Quotes
                </Link>
                <Link
                  href="/blog"
                  className="text-sm text-white/50 transition-colors hover:text-white"
                >
                  → Blog & Articles
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-white/50 transition-colors hover:text-white"
                >
                  → About Us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

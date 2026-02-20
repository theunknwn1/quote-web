import Link from "next/link";
import { supabase } from "@/lib/supabase";
import QuoteCard from "@/components/QuoteCard";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";

const QUOTES_PER_PAGE = 12;

export async function generateMetadata({ params }) {
  const { genre, category, language } = params;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const title = `${cap(genre)} ${cap(category)} Quotes in ${cap(language)}`;
  const description = `Explore the best ${genre} ${category} quotes in ${language} on unknwnquotes.com.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://unknwnquotes.com/quotes/${genre}/${category}/${language}`,
    },
    openGraph: {
      title: `${title} – unknwnquotes.com`,
      description,
      url: `https://unknwnquotes.com/quotes/${genre}/${category}/${language}`,
      siteName: "unknwnquotes.com",
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: "unknwnquotes.com",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} – unknwnquotes.com`,
      description,
      images: ["/logo.png"],
    },
  };
}

async function getQuotes(genre, category, language, page) {
  const from = (page - 1) * QUOTES_PER_PAGE;
  const to = from + QUOTES_PER_PAGE - 1;

  const { data, count } = await supabase
    .from("quotes")
    .select("*", { count: "exact" })
    .eq("genre", genre)
    .eq("category", category)
    .eq("language", language)
    .order("likes", { ascending: false })
    .range(from, to);

  return { quotes: data || [], total: count || 0 };
}

async function getRecommended(genre, category, language) {
  // Same genre + category, sorted by likes
  const { data } = await supabase
    .from("quotes")
    .select("*")
    .eq("genre", genre)
    .eq("category", category)
    .eq("language", language)
    .order("likes", { ascending: false })
    .limit(3);
  return data || [];
}

async function getTrendingInGenre(genre) {
  const { data } = await supabase
    .from("quotes")
    .select("*")
    .eq("genre", genre)
    .order("likes", { ascending: false })
    .limit(3);
  return data || [];
}

export default async function GenreCategoryLanguagePage({
  params,
  searchParams,
}) {
  const { genre, category, language } = params;
  const page = Number(searchParams?.page) || 1;

  const [{ quotes, total }, recommended, trending] = await Promise.all([
    getQuotes(genre, category, language, page),
    getRecommended(genre, category, language),
    getTrendingInGenre(genre),
  ]);

  const totalPages = Math.ceil(total / QUOTES_PER_PAGE);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <header className="mb-12 animate-fade-in-up">
        <nav className="mb-4 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/quotes/${genre}/${category}/english`}
            className="capitalize transition-colors hover:text-white"
          >
            {genre}
          </Link>
          <span>/</span>
          <Link
            href={`/quotes/${genre}/${category}/${language}`}
            className="capitalize transition-colors hover:text-white"
          >
            {category}
          </Link>
          <span>/</span>
          <span className="capitalize text-white/70">{language}</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {cap(genre)} {cap(category)} Quotes in {cap(language)}
        </h1>
        <p className="text-white/50">
          {total} quote{total !== 1 ? "s" : ""} found
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div>
          {quotes.length > 0 ? (
            <div className="grid gap-4">
              {quotes.map((quote, i) => (
                <div key={quote.id}>
                  <QuoteCard quote={quote} />
                  {(i + 1) % 4 === 0 && <AdBanner slot="category-inline" />}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 p-12 text-center">
              <p className="mb-2 text-xl text-white/30">No quotes found</p>
              <p className="text-sm text-white/20">
                No {language} {genre} {category} quotes yet. Check back soon!
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`/quotes/${genre}/${category}/${language}?page=${page - 1}`}
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
                  href={`/quotes/${genre}/${category}/${language}?page=${page + 1}`}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  Next →
                </Link>
              )}
            </nav>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Trending in genre */}
          {trending.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-4 text-lg font-semibold">
                🔥 Trending in {cap(genre)}
              </h3>
              <div className="space-y-4">
                {trending.map((q) => (
                  <blockquote
                    key={q.id}
                    className="border-l-2 border-white/20 pl-3 text-sm text-white/60"
                  >
                    &ldquo;
                    {q.quote.length > 100
                      ? q.quote.slice(0, 100) + "…"
                      : q.quote}
                    &rdquo;
                    <span className="mt-1 block text-xs text-white/30">
                      ♥ {q.likes || 0} likes
                    </span>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          <AdBanner slot="category-sidebar" />

          {/* Explore more categories in this genre */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="mb-4 text-lg font-semibold">Explore More</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "success",
                "discipline",
                "life",
                "love",
                "existence",
                "mindset",
                "growth",
                "happiness",
              ]
                .filter((c) => c !== category)
                .slice(0, 6)
                .map((c) => (
                  <Link
                    key={c}
                    href={`/quotes/${genre}/${c}/${language}`}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs capitalize text-white/50 transition-all hover:border-white/30 hover:text-white"
                  >
                    {c}
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

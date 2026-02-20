import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import QuoteCard from "@/components/QuoteCard";
import AdBanner from "@/components/AdBanner";
import FilterBar from "@/components/FilterBar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Trending Quotes – unknwnquotes.com",
  description:
    "Explore trending quotes across all genres, categories, and languages on unknwnquotes.com.",
  openGraph: {
    title: "Trending Quotes – unknwnquotes.com",
    description:
      "Explore trending quotes across all genres, categories, and languages on unknwnquotes.com.",
    url: "https://unknwnquotes.com",
    siteName: "unknwnquotes.com",
    images: [
      { url: "/logo.png", width: 512, height: 512, alt: "unknwnquotes.com" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending Quotes – unknwnquotes.com",
    description:
      "Explore trending quotes across all genres, categories, and languages on unknwnquotes.com.",
    images: ["/logo.png"],
  },
};

async function getFilteredQuotes(genre, category, language) {
  let query = supabase
    .from("quotes")
    .select("*")
    .order("likes", { ascending: false })
    .limit(100);

  if (genre && genre !== "all") query = query.eq("genre", genre);
  if (category && category !== "all") query = query.eq("category", category);
  if (language && language !== "all") query = query.eq("language", language);

  const { data } = await query;
  return data || [];
}

async function getDistinct(column) {
  const { data } = await supabase
    .from("quotes")
    .select(column)
    .limit(5000);
  if (!data) return [];
  return [...new Set(data.map((d) => d[column]).filter(Boolean))].sort();
}

export default async function HomePage({ searchParams }) {
  const genre = searchParams?.genre || "all";
  const category = searchParams?.category || "all";
  const language = searchParams?.language || "all";

  const isFiltered =
    genre !== "all" || category !== "all" || language !== "all";

  const [quotes, genres, categories, languages] = await Promise.all([
    getFilteredQuotes(genre, category, language),
    getDistinct("genre"),
    getDistinct("category"),
    getDistinct("language"),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-16 text-center animate-fade-in-up">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Quotes That Move You
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/50">
          Explore trending quotes across every genre, category, and language.
          Updated daily.
        </p>
      </section>

      {/* Filter Bar */}
      {(genres.length > 0 ||
        categories.length > 0 ||
        languages.length > 0) && (
        <Suspense fallback={null}>
          <FilterBar
            genres={genres}
            categories={categories}
            languages={languages}
          />
        </Suspense>
      )}

      {/* Quotes */}
      {quotes.length > 0 && (
        <section className="mb-16 animate-fade-in-up">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              {isFiltered ? "📋 Filtered Quotes" : "🔥 Trending Quotes"}
            </h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40">
              {quotes.length} quote{quotes.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quotes.slice(0, 6).map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>

          <AdBanner slot="home-after-trending" />

          {quotes.length > 6 && (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quotes.slice(6, 18).map((quote) => (
                  <QuoteCard key={quote.id} quote={quote} />
                ))}
              </div>
              <AdBanner slot="home-mid-trending" />
            </>
          )}

          {quotes.length > 18 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quotes.slice(18, 100).map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          )}
        </section>
      )}

      <AdBanner slot="home-bottom" />

      {/* Empty state */}
      {quotes.length === 0 && (
        <section className="py-20 text-center">
          <p className="mb-2 text-2xl text-white/30">
            {isFiltered ? "No matching quotes" : "No quotes yet"}
          </p>
          <p className="text-sm text-white/20">
            {isFiltered
              ? "Try adjusting your filters to find quotes."
              : "Add quotes to your Supabase quotes table to see them here."}
          </p>
        </section>
      )}
    </div>
  );
}

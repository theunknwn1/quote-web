import Link from "next/link";
import { supabase } from "@/lib/supabase";
import QuoteCard from "@/components/QuoteCard";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { category } = params;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const title = `${cap(category)} Quotes — Curated Collection`;
  const description = `Explore the best ${category} quotes on unknwnquotes.com. Carefully curated for inspiration, motivation, and personal growth.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://unknwnquotes.com/categories/${category}`,
    },
    openGraph: {
      title: `${title} — unknwnquotes.com`,
      description,
      url: `https://unknwnquotes.com/categories/${category}`,
      siteName: "unknwnquotes.com",
      images: [
        { url: "/logo.png", width: 512, height: 512, alt: "unknwnquotes.com" },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — unknwnquotes.com`,
      description,
      images: ["/logo.png"],
    },
  };
}

async function getQuotesByCategory(category, page = 1) {
  const perPage = 24;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count } = await supabase
    .from("quotes")
    .select("*", { count: "exact" })
    .eq("category", category)
    .order("likes", { ascending: false })
    .range(from, to);

  return { quotes: data || [], total: count || 0, perPage };
}

async function getAllCategories() {
  const { data } = await supabase
    .from("quotes")
    .select("category")
    .limit(5000);
  if (!data) return [];
  return [...new Set(data.map((d) => d.category).filter(Boolean))].sort();
}

export default async function CategoryPage({ params, searchParams }) {
  const { category } = params;
  const page = Number(searchParams?.page) || 1;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const [{ quotes, total, perPage }, allCategories] = await Promise.all([
    getQuotesByCategory(category, page),
    getAllCategories(),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-white/40 animate-fade-in">
        <Link href="/" className="transition-colors hover:text-white">
          Home
        </Link>
        <span>/</span>
        <span className="capitalize text-white/70">{category}</span>
      </nav>

      {/* Header */}
      <header className="mb-12 animate-fade-in-up">
        <h1 className="mb-2 text-3xl font-bold tracking-tight capitalize sm:text-4xl">
          {cap(category)} Quotes
        </h1>
        <p className="text-white/50">
          {total} quote{total !== 1 ? "s" : ""} in this collection
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        {/* Main content */}
        <div>
          {quotes.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {quotes.map((quote, i) => (
                  <div key={quote.id}>
                    <QuoteCard quote={quote} />
                    {(i + 1) % 6 === 0 && <AdBanner slot="category-inline" />}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-10 flex items-center justify-center gap-2">
                  {page > 1 && (
                    <Link
                      href={`/categories/${category}?page=${page - 1}`}
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
                      href={`/categories/${category}?page=${page + 1}`}
                      className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      Next →
                    </Link>
                  )}
                </nav>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-white/10 p-12 text-center">
              <p className="mb-2 text-xl text-white/30">No quotes found</p>
              <p className="text-sm text-white/20">
                No {category} quotes yet. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <AdBanner slot="category-sidebar" />

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="mb-4 text-lg font-semibold">Browse Categories</h3>
            <div className="flex flex-wrap gap-2">
              {allCategories
                .filter((c) => c !== category)
                .slice(0, 12)
                .map((c) => (
                  <Link
                    key={c}
                    href={`/categories/${c}`}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs capitalize text-white/50 transition-all hover:border-white/30 hover:text-white"
                  >
                    {c}
                  </Link>
                ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="mb-4 text-lg font-semibold">Explore</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                → All Trending Quotes
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
  );
}

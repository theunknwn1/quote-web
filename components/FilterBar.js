"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBar({ genres, categories, languages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    searchParams.get("language") || "all"
  );

  const navigate = useCallback(
    (genre, category, language) => {
      const params = new URLSearchParams();
      if (genre !== "all") params.set("genre", genre);
      if (category !== "all") params.set("category", category);
      if (language !== "all") params.set("language", language);

      const qs = params.toString();
      router.push(qs ? `/?${qs}` : "/");
    },
    [router]
  );

  const selectGenre = (g) => {
    setSelectedGenre(g);
    navigate(g, selectedCategory, selectedLanguage);
  };

  const selectCategory = (c) => {
    setSelectedCategory(c);
    navigate(selectedGenre, c, selectedLanguage);
  };

  const selectLanguage = (l) => {
    setSelectedLanguage(l);
    navigate(selectedGenre, selectedCategory, l);
  };

  return (
    <section className="mb-16 animate-fade-in-up">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">
          Find Quotes
        </h2>

        {/* Genre */}
        <div className="mb-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
            Genre
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill
              label="All"
              active={selectedGenre === "all"}
              onClick={() => selectGenre("all")}
            />
            {genres.map((g) => (
              <Pill
                key={g}
                label={g}
                active={selectedGenre === g}
                onClick={() => selectGenre(g)}
              />
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill
              label="All"
              active={selectedCategory === "all"}
              onClick={() => selectCategory("all")}
            />
            {categories.map((c) => (
              <Pill
                key={c}
                label={c}
                active={selectedCategory === c}
                onClick={() => selectCategory(c)}
              />
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
            Language
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill
              label="All"
              active={selectedLanguage === "all"}
              onClick={() => selectLanguage("all")}
            />
            {languages.map((l) => (
              <Pill
                key={l}
                label={l}
                active={selectedLanguage === l}
                onClick={() => selectLanguage(l)}
              />
            ))}
          </div>
        </div>

        {/* Active filters indicator */}
        {(selectedGenre !== "all" ||
          selectedCategory !== "all" ||
          selectedLanguage !== "all") && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 animate-fade-in">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/40">Filtering:</span>
              {selectedGenre !== "all" && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs capitalize text-white/70">
                  {selectedGenre}
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs capitalize text-white/70">
                  {selectedCategory}
                </span>
              )}
              {selectedLanguage !== "all" && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs capitalize text-white/70">
                  {selectedLanguage}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedGenre("all");
                setSelectedCategory("all");
                setSelectedLanguage("all");
                router.push("/");
              }}
              className="text-xs text-white/40 transition-colors hover:text-white"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm capitalize transition-all duration-200 ${
        active
          ? "border-white bg-white text-black font-medium"
          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

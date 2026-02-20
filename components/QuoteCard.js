"use client";

import LikeButton from "./LikeButton";

export default function QuoteCard({ quote }) {
  return (
    <article className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]">
      {/* Decorative quote mark */}
      <span className="absolute -top-3 left-5 text-4xl leading-none text-white/10 select-none">
        &ldquo;
      </span>

      <blockquote className="mb-4 text-lg font-light leading-relaxed text-white/90 sm:text-xl">
        {quote.quote}
      </blockquote>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {quote.genre && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs capitalize text-white/50">
              {quote.genre}
            </span>
          )}
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs capitalize text-white/50">
            {quote.category}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs capitalize text-white/50">
            {quote.language}
          </span>
        </div>
        <LikeButton quoteId={quote.id} initialLikes={quote.likes || 0} />
      </div>
    </article>
  );
}

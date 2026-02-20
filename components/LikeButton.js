"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function LikeButton({ quoteId, initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("liked_quotes") || "[]");
    if (stored.includes(quoteId)) {
      setLiked(true);
    }
  }, [quoteId]);

  const handleLike = async () => {
    if (liked) return;

    setAnimating(true);
    setLiked(true);
    setLikes((prev) => prev + 1);

    // Store in localStorage
    const stored = JSON.parse(localStorage.getItem("liked_quotes") || "[]");
    stored.push(quoteId);
    localStorage.setItem("liked_quotes", JSON.stringify(stored));

    // Update Supabase
    try {
      await supabase
        .from("quotes")
        .update({ likes: likes + 1 })
        .eq("id", quoteId);
    } catch (err) {
      console.error("Failed to update like:", err);
    }

    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={`group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all duration-300 ${
        liked
          ? "border-white/30 bg-white/10 text-white"
          : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
      }`}
      aria-label={liked ? "Already liked" : "Like this quote"}
    >
      <svg
        className={`h-4 w-4 transition-transform duration-300 ${
          animating ? "scale-125" : "scale-100"
        } ${liked ? "fill-white" : "fill-none"}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={liked ? 0 : 2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="tabular-nums">{likes}</span>
    </button>
  );
}

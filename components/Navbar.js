"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const GENRES = [
  "motivation",
  "sad",
  "philosophy",
  "love",
  "funny",
  "inspirational",
];

const CATEGORIES = [
  "success",
  "discipline",
  "life",
  "love",
  "existence",
  "mindset",
  "growth",
  "happiness",
];

const LANGUAGES = ["english", "tamil", "hindi", "spanish", "french"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="unknwnquotes.com logo"
            width={36}
            height={36}
            className="rounded transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            unknwn<span className="text-white/50">quotes</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <NavDropdown label="Genres" items={GENRES} type="genre" />
          <NavDropdown label="Categories" items={CATEGORIES} type="category" />
          <NavDropdown label="Languages" items={LANGUAGES} type="language" />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-black px-4 pb-6 pt-4 md:hidden animate-fade-in">
          <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
            Genres
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <Link
                key={g}
                href={`/quotes/${g}/success/english`}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/70 transition-colors hover:bg-white hover:text-black"
              >
                {g}
              </Link>
            ))}
          </div>

          <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
            Categories
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/quotes/motivation/${cat}/english`}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/70 transition-colors hover:bg-white hover:text-black"
              >
                {cat}
              </Link>
            ))}
          </div>

          <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
            Languages
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <Link
                key={lang}
                href={`/quotes/motivation/success/${lang}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/70 transition-colors hover:bg-white hover:text-black"
              >
                {lang}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavDropdown({ label, items, type }) {
  const buildHref = (item) => {
    switch (type) {
      case "genre":
        return `/quotes/${item}/success/english`;
      case "category":
        return `/quotes/motivation/${item}/english`;
      case "language":
        return `/quotes/motivation/success/${item}`;
      default:
        return "/";
    }
  };

  return (
    <div className="group relative">
      <button className="flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white">
        {label}
        <svg
          className="h-3 w-3 transition-transform group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-[180px] rounded-lg border border-white/10 bg-black/95 p-2 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {items.map((item) => (
          <Link
            key={item}
            href={buildHref(item)}
            className="block rounded-md px-3 py-2 text-sm capitalize text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

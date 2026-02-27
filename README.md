# unknwnquotes.com

A curated quotes platform with blog system, SEO optimization, and Google AdSense integration. Built with **Next.js 14**, **Supabase**, and **Tailwind CSS**.

🌐 **Live Site**: [https://unknwnquotes.com](https://unknwnquotes.com)

---

## Features

- **Curated Quotes** — Browse quotes by genre, category, and language
- **Blog System** — Database-driven blog posts linked to individual quotes
- **SEO Optimized** — Dynamic meta tags, Open Graph, Twitter cards, JSON-LD structured data, sitemap, robots.txt
- **AdSense Ready** — Cookie consent banner, conditional ad loading, ad placement zones
- **Contact Form** — With email validation, honeypot anti-spam, and API backend
- **Mobile Responsive** — Full responsive design across all pages
- **Google Analytics** — Optional GA4 integration via environment variable

---

## Pages & Routes

| Route                                   | Description                                                            |
| --------------------------------------- | ---------------------------------------------------------------------- |
| `/`                                     | Homepage — trending quotes with genre/category/language filters        |
| `/blog`                                 | Blog index — paginated posts with category filtering                   |
| `/blog/[slug]`                          | Individual blog post with linked quote, related posts, structured data |
| `/categories/[category]`                | Category page — quotes filtered by category                            |
| `/quotes/[genre]/[category]/[language]` | Specific quote collection view                                         |
| `/about`                                | About page — mission, philosophy, contact info                         |
| `/privacy-policy`                       | Privacy policy — cookies, AdSense, analytics, data protection          |
| `/terms-of-service`                     | Terms of service — usage rules, IP, liability                          |
| `/contact`                              | Contact form with API backend                                          |

---

## Setup

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Clone & Install

```bash
git clone https://github.com/theunknwn1/quote-web.git
cd quote-web
npm install
```

### 2. Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Optional:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://unknwnquotes.com
```

### 3. Database Setup

Run these SQL migrations in your Supabase SQL Editor (in order):

1. **Create quotes table** (if not exists — see your initial schema)
2. **Add genre column**: `scripts/migration-add-genre.sql`
3. **Create blog_posts table**: `scripts/migration-blog-posts.sql`

### 4. Seed Data (optional)

```bash
node scripts/seed.js
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

---

## SEO Checklist

- [x] Unique `<title>` and `<meta description>` per page
- [x] Canonical URLs on all pages
- [x] Open Graph and Twitter Card meta tags
- [x] JSON-LD Article structured data on blog posts
- [x] `sitemap.xml` auto-generated with all routes
- [x] `robots.txt` allowing all crawlers
- [x] Proper heading hierarchy (single H1 per page)
- [x] Semantic HTML throughout
- [x] Alt text on images
- [x] Internal linking between blog posts, categories, and homepage
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify domain ownership in Search Console

---

## Google AdSense Setup

1. Sign up for [Google AdSense](https://www.google.com/adsense)
2. Get your publisher ID (format: `ca-pub-XXXXXXXXXX`)
3. Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` in your environment variables
4. The site will automatically load AdSense after cookie consent
5. Ad placement zones are pre-configured:
   - Top banner areas
   - In-article placements
   - Sidebar placements
   - Between content sections

---

## Sitemap Submission

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://unknwnquotes.com`
3. Navigate to **Sitemaps** in the left sidebar
4. Submit: `https://unknwnquotes.com/sitemap.xml`
5. Repeat for [Bing Webmaster Tools](https://www.bing.com/webmasters)

---

## Project Structure

```
├── app/
│   ├── about/page.js              # About page
│   ├── api/contact/route.js       # Contact form API
│   ├── blog/
│   │   ├── page.js                # Blog index
│   │   └── [slug]/page.js         # Blog post page
│   ├── categories/[category]/     # Category page
│   ├── contact/page.js            # Contact form
│   ├── privacy-policy/page.js     # Privacy policy
│   ├── terms-of-service/page.js   # Terms of service
│   ├── quotes/[genre]/[category]/[language]/  # Quote collection
│   ├── layout.js                  # Root layout
│   ├── page.js                    # Homepage
│   ├── sitemap.js                 # Auto-generated sitemap
│   ├── robots.js                  # Robots.txt
│   └── globals.css                # Global styles
├── components/
│   ├── AdBanner.js                # Consent-gated ad component
│   ├── CookieConsent.js           # Cookie consent banner
│   ├── GoogleAnalytics.js         # GA4 integration
│   ├── Navbar.js                  # Navigation bar
│   ├── QuoteCard.js               # Quote display card
│   ├── FilterBar.js               # Quote filter UI
│   └── LikeButton.js              # Quote like button
├── lib/
│   ├── supabase.js                # Supabase client
│   └── blog.js                    # Blog data access layer
├── scripts/
│   ├── migration-add-genre.sql    # Genre column migration
│   ├── migration-blog-posts.sql   # Blog posts table migration
│   └── seed.js                    # Sample quote seeder
└── public/
    ├── favicon.ico
    └── logo.png
```

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + Typography plugin
- **Hosting**: Vercel
- **Analytics**: Google Analytics 4 (optional)
- **Ads**: Google AdSense (optional, consent-gated)

---

## License

All rights reserved. © unknwnquotes.com

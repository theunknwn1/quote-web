import Link from "next/link";

export const metadata = {
  title: "About — Our Mission & Philosophy",
  description:
    "Learn about unknwnquotes.com — our mission to curate powerful quotes, our editorial philosophy, and why we believe words have the power to transform lives.",
  alternates: {
    canonical: "https://unknwnquotes.com/about",
  },
  openGraph: {
    title: "About — unknwnquotes.com",
    description:
      "Learn about unknwnquotes.com — our mission to curate powerful quotes and stories that change how people think.",
    url: "https://unknwnquotes.com/about",
    siteName: "unknwnquotes.com",
    images: [
      { url: "/logo.png", width: 512, height: 512, alt: "unknwnquotes.com" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — unknwnquotes.com",
    description:
      "Learn about unknwnquotes.com — our mission to curate powerful quotes and stories that change how people think.",
    images: ["/logo.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="animate-fade-in-up">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            About unknwnquotes
          </h1>
          <p className="text-lg text-white/50">
            Words that move minds. Stories that shape lives.
          </p>
        </header>

        <div className="space-y-8 text-white/70 leading-relaxed text-lg">
          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              Our Mission
            </h2>
            <p>
              At unknwnquotes.com, we believe that a single sentence can change
              the trajectory of someone&apos;s entire life. We&apos;ve all
              experienced it — that moment when you read a quote and something
              clicks. A perspective shifts. A decision crystallizes. A burden
              feels lighter. Our mission is to create that moment for as many
              people as possible, every single day.
            </p>
            <p className="mt-4">
              We are not just another quotes website. We are a curated
              destination for words that matter — carefully selected,
              thoughtfully organized, and presented in a way that respects both
              the wisdom they contain and the people who seek them. Every quote
              on this platform has been chosen because it has the power to
              inspire action, provoke thought, or provide comfort when it&apos;s
              needed most.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              Why Quotes Matter
            </h2>
            <p>
              In a world drowning in content — endless feeds, algorithmic noise,
              and information overload — quotes stand apart. They are the
              distilled essence of human experience. A great quote takes
              decades of lived wisdom and compresses it into a single breath.
              It takes complex emotions, hard-earned lessons, and profound
              truths and makes them accessible to anyone willing to listen.
            </p>
            <p className="mt-4">
              Quotes have been the currency of wisdom across every culture and
              era. From the ancient Stoic philosophers who helped emperors
              navigate the burdens of power, to modern thinkers who challenge
              our assumptions about success and happiness — the tradition of
              sharing wisdom through concise, memorable language is one of
              humanity&apos;s oldest and most powerful tools for growth.
            </p>
            <p className="mt-4">
              We believe that the right quote at the right time can serve as a
              compass. It can help someone find their way when they&apos;re
              lost, summon courage when they&apos;re afraid, and find meaning
              when everything feels meaningless. That is what drives us to do
              this work.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              What Makes Us Different
            </h2>
            <p>
              Most quote websites are automated content farms — scraping text
              from the internet, littering pages with ads, and offering no
              genuine value beyond what a quick Google search could provide. We
              built unknwnquotes.com to be the opposite of that.
            </p>
            <p className="mt-4">
              <strong className="text-white/90">Curated, not scraped.</strong>{" "}
              Every quote in our collection is reviewed for accuracy,
              attribution, and impact. We don&apos;t publish misattributed
              quotes or generic filler content. If a quote is on our platform,
              it&apos;s there because it earned its place.
            </p>
            <p className="mt-4">
              <strong className="text-white/90">Organized for discovery.</strong>{" "}
              Our categorization system goes beyond simple topics. We organize
              quotes by genre, category, and language — making it easy to find
              exactly the kind of wisdom you&apos;re looking for, whether
              it&apos;s motivational discipline quotes in English or
              philosophical reflections on existence in Tamil.
            </p>
            <p className="mt-4">
              <strong className="text-white/90">
                Deep content, not shallow clicks.
              </strong>{" "}
              Through our{" "}
              <Link
                href="/blog"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                blog
              </Link>
              , we go beyond the quote itself. We explore the stories behind the
              words, the psychology that makes them powerful, and the practical
              ways you can apply their wisdom in your daily life. Each article is
              crafted to provide genuine value — not keyword-stuffed filler.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              Our Editorial Philosophy
            </h2>
            <p>
              We operate under a simple but demanding standard: publish nothing
              that doesn&apos;t genuinely help the reader. Every quote we
              feature, every article we publish, and every page on this website
              exists to serve the person reading it.
            </p>
            <p className="mt-4">
              We prioritize quality over quantity. We would rather have a
              smaller, carefully curated collection than a massive database of
              mediocre content. We believe that respect for the reader means
              respecting their time — and that means every piece of content
              should be worth the minutes they invest in consuming it.
            </p>
            <p className="mt-4">
              Our editorial process values accuracy, thoughtfulness, and
              genuine insight. We fact-check attributions, avoid recycled
              platitudes, and constantly ask ourselves: &ldquo;Would this
              actually help someone having a hard day?&rdquo; If the answer
              isn&apos;t a confident yes, it doesn&apos;t make the cut.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              Explore More
            </h2>
            <p>
              Ready to dive in? Browse our{" "}
              <Link
                href="/"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                trending quotes
              </Link>
              , explore the{" "}
              <Link
                href="/blog"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                blog
              </Link>{" "}
              for deeper insights, or discover quotes across different{" "}
              <Link
                href="/?genre=motivation"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                genres
              </Link>{" "}
              and categories.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              Get in Touch
            </h2>
            <p>
              Have a quote suggestion? Want to collaborate? Just want to say
              hello? We&apos;d love to hear from you.
            </p>
            <p className="mt-4">
              Email us at{" "}
              <a
                href="mailto:contact.unknwnquotes@gmail.com"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                contact.unknwnquotes@gmail.com
              </a>{" "}
              or use our{" "}
              <Link
                href="/contact"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                contact form
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

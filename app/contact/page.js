import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with unknwnquotes.com. Send us quote suggestions, collaboration ideas, bug reports, or general feedback.",
  alternates: {
    canonical: "https://unknwnquotes.com/contact",
  },
  openGraph: {
    title: "Contact Us — unknwnquotes.com",
    description:
      "Get in touch with unknwnquotes.com. We'd love to hear from you.",
    url: "https://unknwnquotes.com/contact",
    siteName: "unknwnquotes.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — unknwnquotes.com",
    description:
      "Get in touch with unknwnquotes.com. We'd love to hear from you.",
    images: ["/logo.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="animate-fade-in-up">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="text-lg text-white/50">
            Have a question, suggestion, or want to collaborate? We&apos;d love
            to hear from you.
          </p>
        </header>

        <div className="grid gap-12 md:grid-cols-[1fr_300px]">
          <ContactForm />

          <div className="space-y-8">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Other Ways to Reach Us
              </h2>
              <div className="space-y-3 text-sm text-white/60">
                <div>
                  <p className="font-medium text-white/80">Email</p>
                  <a
                    href="mailto:contact.unknwnquotes@gmail.com"
                    className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
                  >
                    contact.unknwnquotes@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white/80">Response Time</p>
                  <p>We typically respond within 24–48 hours.</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">
                What You Can Reach Out About
              </h2>
              <ul className="space-y-2 text-sm text-white/60">
                <li>💡 Quote suggestions</li>
                <li>🤝 Collaboration opportunities</li>
                <li>🐛 Report issues or bugs</li>
                <li>📝 Content or attribution corrections</li>
                <li>💬 General feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Terms of Service",
  description:
    "Read the terms of service for unknwnquotes.com. Understand the rules governing the use of our website, content, and services.",
  alternates: {
    canonical: "https://unknwnquotes.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service — unknwnquotes.com",
    description:
      "Read the terms of service for unknwnquotes.com.",
    url: "https://unknwnquotes.com/terms-of-service",
    siteName: "unknwnquotes.com",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="animate-fade-in-up">
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-white/50">
            Last updated: March 1, 2026
          </p>
        </header>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <p>
              Welcome to unknwnquotes.com. By accessing or using our website at{" "}
              <strong className="text-white/90">https://unknwnquotes.com</strong>{" "}
              (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of
              Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms,
              please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              1. Content Usage Rules
            </h2>
            <p>
              The content on this Site — including quotes, articles, blog posts,
              graphics, and other materials — is provided for personal,
              non-commercial use only. You may share individual quotes on social
              media or personal platforms, provided that you include proper
              attribution to unknwnquotes.com.
            </p>
            <p className="mt-3">You may not:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Reproduce, distribute, or republish substantial portions of the
                Site&apos;s content without prior written permission.
              </li>
              <li>
                Use the content for commercial purposes, including but not
                limited to reselling, licensing, or monetizing the content on
                other platforms.
              </li>
              <li>
                Scrape, crawl, or use automated tools to extract content from the
                Site without explicit authorization.
              </li>
              <li>
                Modify, adapt, or create derivative works based on our original
                content (articles, blog posts, curated collections) without
                permission.
              </li>
            </ul>
            <p className="mt-3">
              Quotes themselves are attributed to their original authors and may
              be in the public domain. Our curation, organization, commentary,
              and original written content are the intellectual property of
              unknwnquotes.com.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              2. Intellectual Property
            </h2>
            <p>
              The Site and its original content, features, and functionality are
              owned by unknwnquotes.com and are protected by international
              copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3">
              Our logo, brand name, design elements, and original written content
              are proprietary. You may not use our branding, logo, or proprietary
              content without prior written consent.
            </p>
            <p className="mt-3">
              Individual quotes displayed on the Site are attributed to their
              respective authors. We make reasonable efforts to ensure proper
              attribution. If you believe a quote has been misattributed or if
              you are the rights holder of content displayed on our Site, please
              contact us at{" "}
              <a
                href="mailto:contact.unknwnquotes@gmail.com"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                contact.unknwnquotes@gmail.com
              </a>{" "}
              so we can address the matter promptly.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              3. User Conduct
            </h2>
            <p>When using our Site, you agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Use the Site in any way that violates applicable local, state,
                national, or international laws or regulations.
              </li>
              <li>
                Attempt to interfere with, compromise, or disrupt the Site&apos;s
                systems, servers, or networks.
              </li>
              <li>
                Submit false, misleading, or spam content through our contact
                form or any other interactive feature.
              </li>
              <li>
                Impersonate any person or entity, or misrepresent your affiliation
                with any person or entity.
              </li>
              <li>
                Engage in any activity that could damage, disable, or impair the
                functioning of the Site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              4. Limitations of Liability
            </h2>
            <p>
              The Site and its content are provided on an &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; basis without warranties of any kind,
              either express or implied. We do not guarantee that the Site will be
              uninterrupted, secure, or error-free.
            </p>
            <p className="mt-3">
              To the fullest extent permitted by law, unknwnquotes.com shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or relating to your use of, or
              inability to use, the Site. This includes, but is not limited to,
              damages for loss of profits, goodwill, data, or other intangible
              losses.
            </p>
            <p className="mt-3">
              The quotes and articles on our Site are intended for informational
              and inspirational purposes only. They do not constitute
              professional advice — medical, legal, financial, or otherwise. You
              should consult qualified professionals for advice specific to your
              situation.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              5. Third-Party Links and Services
            </h2>
            <p>
              Our Site may contain links to third-party websites or services that
              are not owned or controlled by unknwnquotes.com. We have no control
              over and assume no responsibility for the content, privacy policies,
              or practices of any third-party websites or services. You
              acknowledge and agree that we are not responsible for any damage or
              loss caused by or in connection with the use of any such content,
              goods, or services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              6. Termination
            </h2>
            <p>
              We reserve the right to terminate or restrict your access to the
              Site, without prior notice or liability, for any reason whatsoever,
              including but not limited to a breach of these Terms. Upon
              termination, your right to use the Site will immediately cease.
            </p>
            <p className="mt-3">
              All provisions of these Terms that by their nature should survive
              termination shall survive, including but not limited to ownership
              provisions, warranty disclaimers, indemnity, and limitations of
              liability.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              7. Modifications to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time at
              our sole discretion. If a revision is material, we will update the
              &ldquo;Last updated&rdquo; date at the top of this page. Your
              continued use of the Site after any changes to these Terms
              constitutes acceptance of those changes.
            </p>
            <p className="mt-3">
              We encourage you to review these Terms periodically for any
              updates. Changes become effective immediately upon posting to this
              page.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              8. Governing Law
            </h2>
            <p>
              These Terms shall be governed and construed in accordance with
              applicable laws, without regard to conflict of law provisions. Any
              disputes arising under or in connection with these Terms shall be
              subject to the exclusive jurisdiction of the courts in the
              applicable jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-3">
              <strong className="text-white/90">Email:</strong>{" "}
              <a
                href="mailto:contact.unknwnquotes@gmail.com"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                contact.unknwnquotes@gmail.com
              </a>
            </p>
            <p className="mt-1">
              <strong className="text-white/90">Website:</strong>{" "}
              https://unknwnquotes.com
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy for unknwnquotes.com. Learn how we collect, use, and protect your personal data, including our use of Google AdSense and cookies.",
  alternates: {
    canonical: "https://unknwnquotes.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy — unknwnquotes.com",
    description:
      "Read the privacy policy for unknwnquotes.com. Learn how we handle your data.",
    url: "https://unknwnquotes.com/privacy-policy",
    siteName: "unknwnquotes.com",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="animate-fade-in-up">
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-white/50">
            Effective Date: March 1, 2026
          </p>
        </header>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <p>
              This privacy policy describes how unknwnquotes.com (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and
              protects your personal information when you visit our website at{" "}
              <strong className="text-white/90">https://unknwnquotes.com</strong>{" "}
              (the &ldquo;Site&rdquo;). By using the Site, you consent to the
              practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              1. Information We Collect
            </h2>
            <p>We may collect the following types of information:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white/90">
                  Personal Information:
                </strong>{" "}
                When you contact us through our contact form, we collect your
                name, email address, and message content. This information is
                provided voluntarily and is used only to respond to your inquiry.
              </li>
              <li>
                <strong className="text-white/90">
                  Usage Data:
                </strong>{" "}
                We automatically collect certain information when you visit our
                Site, including your IP address, browser type, operating system,
                referring URL, pages visited, and the dates and times of your
                visits. This data is collected through cookies and similar
                technologies.
              </li>
              <li>
                <strong className="text-white/90">
                  Local Storage Data:
                </strong>{" "}
                We use your browser&apos;s local storage to remember your preferences,
                such as liked quotes and cookie consent choices. This data remains
                on your device and is not transmitted to our servers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              2. Cookies and Tracking Technologies
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit a
              website. We use cookies and similar technologies for the following
              purposes:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white/90">Essential Cookies:</strong>{" "}
                To remember your cookie consent preferences and ensure the Site
                functions properly.
              </li>
              <li>
                <strong className="text-white/90">Analytics Cookies:</strong>{" "}
                To understand how visitors interact with our Site, which pages are
                most popular, and how we can improve the user experience.
              </li>
              <li>
                <strong className="text-white/90">Advertising Cookies:</strong>{" "}
                Used by Google AdSense and its partners to serve personalized
                advertisements based on your browsing history and interests.
              </li>
            </ul>
            <p className="mt-3">
              You can manage your cookie preferences through your browser settings
              or through our cookie consent banner. Rejecting non-essential cookies
              will prevent advertising and analytics cookies from being set.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              3. Google AdSense and Personalized Ads
            </h2>
            <p>
              We use Google AdSense to display advertisements on our Site. Google
              AdSense uses cookies to serve ads based on your prior visits to our
              Site or other websites on the internet. Google&apos;s use of
              advertising cookies enables it and its partners to serve
              personalized ads to you based on your visit to our Site and/or
              other sites on the internet.
            </p>
            <p className="mt-3">
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                Google&apos;s Ads Settings
              </a>
              . You may also opt out of third-party vendor cookies by visiting
              the{" "}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                Network Advertising Initiative opt-out page
              </a>
              .
            </p>
            <p className="mt-3">
              AdSense ads are only loaded after you provide consent through our
              cookie consent banner. If you reject cookies, no advertising scripts
              will be loaded during your session.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              4. Third-Party Vendors
            </h2>
            <p>We work with the following third-party service providers:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white/90">Google AdSense:</strong>{" "}
                For displaying advertisements. Google may use cookies to serve ads
                based on your browsing behavior.
              </li>
              <li>
                <strong className="text-white/90">Google Analytics:</strong>{" "}
                For website traffic analysis and usage statistics. Google Analytics
                uses cookies to collect anonymous usage data.
              </li>
              <li>
                <strong className="text-white/90">Vercel:</strong>{" "}
                For website hosting and deployment. Vercel may process certain
                technical data necessary for serving web pages.
              </li>
              <li>
                <strong className="text-white/90">Supabase:</strong>{" "}
                For database services. Supabase processes data related to quotes
                and user interactions (such as like counts).
              </li>
            </ul>
            <p className="mt-3">
              Each of these providers has their own privacy policies governing how
              they handle data. We encourage you to review their respective
              policies.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              5. Analytics Usage
            </h2>
            <p>
              We use Google Analytics to collect and analyze information about how
              visitors use our Site. This helps us understand traffic patterns,
              popular content, and areas for improvement. Google Analytics collects
              information such as how often you visit the Site, what pages you
              visit, and what other sites you visited before coming to our Site.
            </p>
            <p className="mt-3">
              The data collected through Google Analytics is aggregated and
              anonymized. We do not use Google Analytics to collect personally
              identifiable information. You can prevent Google Analytics from
              recognizing you on return visits by disabling cookies in your
              browser or by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                Google Analytics opt-out browser add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              6. Children&apos;s Privacy
            </h2>
            <p>
              Our Site is not directed at children under the age of 13. We do not
              knowingly collect personal information from children under 13. If we
              become aware that a child under 13 has provided us with personal
              information, we will take steps to delete such information promptly.
              If you believe that we may have collected information from a child
              under 13, please contact us at{" "}
              <a
                href="mailto:contact.unknwnquotes@gmail.com"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                contact.unknwnquotes@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              7. Your Consent
            </h2>
            <p>
              By using our Site, you consent to the collection and use of your
              information as described in this privacy policy. You have the right
              to withdraw your consent at any time by adjusting your cookie
              preferences through our cookie consent banner or by contacting us
              directly.
            </p>
            <p className="mt-3">
              If you do not agree with this policy, please do not use our Site. Your
              continued use of the Site after any changes to this policy will
              constitute your acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              8. Data Protection
            </h2>
            <p>
              We take reasonable measures to protect the personal information we
              collect from unauthorized access, use, alteration, or destruction.
              These measures include using secure hosting providers, encrypted
              connections (HTTPS), and limiting access to personal information to
              those who need it to perform their duties.
            </p>
            <p className="mt-3">
              However, no method of transmission over the internet or method of
              electronic storage is 100% secure. While we strive to protect your
              personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time to reflect
              changes in our practices, technologies, legal requirements, or other
              factors. We will post the updated policy on this page with a revised
              effective date. We encourage you to review this page periodically
              for the latest information on our privacy practices.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              10. Contact Us
            </h2>
            <p>
              If you have any questions, concerns, or requests related to this
              privacy policy or your personal data, please contact us at:
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

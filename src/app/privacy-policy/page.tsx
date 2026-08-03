import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Kavya Financial Services privacy policy to understand how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const lastUpdated = "August 1, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy-policy" }]} />

      <section className="bg-hero-gradient py-14 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-3">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">Privacy Policy</h1>
            <p className="text-white/70">Last updated: {lastUpdated}</p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col gap-8 text-foreground/85 leading-relaxed">
            <p>
              {siteConfig.name} (&quot;Kavya&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy of every
              visitor to our website and every customer who uses our loan facilitation, real estate advisory, and
              taxation services. This Privacy Policy explains what information we collect, how we use it, and the
              choices you have regarding your data. By using our website or services, you agree to the terms of
              this policy.
            </p>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">1. Information We Collect</h2>
              <p className="mb-3">We may collect the following categories of information when you interact with us:</p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>
                  <strong>Personal identification information:</strong> Name, mobile number, email address, city,
                  and any details you provide through our contact forms, lead forms, or during a consultation.
                </li>
                <li>
                  <strong>Financial and KYC information:</strong> When you apply for a loan or tax service through
                  us, we may collect income details, PAN, Aadhaar, bank statements, and other documents required by
                  our lending or compliance partners.
                </li>
                <li>
                  <strong>Technical information:</strong> IP address, browser type, device information, and usage
                  data collected automatically through cookies and analytics tools when you browse our website.
                </li>
                <li>
                  <strong>Communication records:</strong> Records of calls, emails, and messages exchanged with our
                  team for quality and training purposes.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">2. How We Use Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>Assess your eligibility for loan, real estate, or taxation services and process your requests.</li>
                <li>Connect you with our partner banks, NBFCs, or legal experts relevant to your enquiry.</li>
                <li>Communicate with you regarding your application, appointment, or service status.</li>
                <li>Improve our website, services, and customer experience.</li>
                <li>Send you relevant offers, updates, or marketing communications (with an option to opt out).</li>
                <li>Comply with applicable legal, regulatory, and audit requirements.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">3. Data Sharing with Lending Partners</h2>
              <p>
                As a loan facilitator / Direct Selling Agent (DSA), we routinely share your application details and
                supporting documents with our partner banks and NBFCs solely for the purpose of processing your loan
                application. We only share information with partners relevant to the specific service you have
                requested, and we require our partners to handle your data securely and in accordance with
                applicable law. We do not sell your personal information to third parties for unrelated marketing
                purposes.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">4. Cookies</h2>
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience,
                analyze site traffic, and remember your preferences. You can control or disable cookies through your
                browser settings; however, doing so may affect certain website functionality.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">5. Data Security</h2>
              <p>
                We implement reasonable administrative, technical, and physical safeguards designed to protect your
                personal and financial information from unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the internet or electronic storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">6. Your Rights</h2>
              <p className="mb-3">Subject to applicable law, you have the right to:</p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>Request access to the personal information we hold about you.</li>
                <li>Request correction of inaccurate or incomplete information.</li>
                <li>Request deletion of your personal information, subject to our legal and regulatory obligations.</li>
                <li>Withdraw consent for marketing communications at any time.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact our Grievance Officer using the details in Section 8
                below.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">7. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfil the purposes outlined in
                this policy, including any legal, accounting, or regulatory record-keeping requirements applicable
                to financial services in India.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">8. Grievance Officer</h2>
              <p>
                In accordance with applicable Indian data protection and IT laws, if you have any concerns,
                complaints, or grievances regarding your personal information or this Privacy Policy, please
                contact our Grievance Officer at:{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-secondary underline underline-offset-2">
                  {siteConfig.email}
                </a>
                . We aim to acknowledge and address grievances within 30 days of receipt.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                requirements. Any changes will be posted on this page with a revised &quot;Last updated&quot; date. We
                encourage you to review this policy periodically.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">10. Governing Law</h2>
              <p>
                This Privacy Policy is governed by the laws of India. Any disputes arising from this policy shall be
                subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana.
              </p>
            </div>

            <div className="rounded-2xl bg-muted/60 p-6">
              <h3 className="font-heading font-bold mb-2">Contact Us</h3>
              <p className="text-sm">
                {siteConfig.name}
                <br />
                {siteConfig.address}
                <br />
                Phone: {siteConfig.phone} &middot; Email: {siteConfig.email}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

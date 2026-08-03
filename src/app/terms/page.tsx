import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing the use of Kavya Financial Services' website and loan facilitation, real estate, and taxation services.",
  alternates: { canonical: "/terms" },
};

const lastUpdated = "August 1, 2026";

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Terms & Conditions", href: "/terms" }]} />

      <section className="bg-hero-gradient py-14 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-3">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">
              Terms &amp; Conditions
            </h1>
            <p className="text-white/70">Last updated: {lastUpdated}</p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col gap-8 text-foreground/85 leading-relaxed">
            <p>
              These Terms &amp; Conditions ("Terms") govern your access to and use of the website and services
              provided by {siteConfig.name} ("Kavya", "we", "us", or "our"). By accessing our website or engaging
              our services, you agree to be bound by these Terms. If you do not agree, please discontinue use of
              our website and services.
            </p>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">1. Acceptance of Terms</h2>
              <p>
                By using this website, submitting an enquiry, or engaging any of our services, you confirm that you
                are at least 18 years of age and legally capable of entering into a binding agreement, and that you
                accept these Terms in full.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">2. Nature of Services</h2>
              <p>
                {siteConfig.name} acts as a loan facilitator / Direct Selling Agent (DSA) and referral intermediary
                connecting customers with partner banks, NBFCs, real estate sellers, and legal/compliance
                professionals. We are <strong>not</strong> a bank, NBFC, or lender ourselves. Our role is limited to
                advisory, documentation assistance, and facilitation — the actual sanctioning and disbursal of any
                loan, or the sale/transfer of any property, is carried out solely by the respective bank, NBFC, or
                third party involved.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">3. No Guarantee of Loan Approval</h2>
              <p>
                While we strive to match you with lenders best suited to your profile, we do not guarantee approval,
                sanction, or disbursal of any loan, nor any specific interest rate or loan amount. Final approval is
                entirely at the discretion of the respective bank or NBFC, based on their own credit policies and
                underwriting criteria.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">4. Third-Party Bank/NBFC Terms Apply</h2>
              <p>
                Once your application is processed by a partner bank or NBFC, the terms, conditions, interest rates,
                fees, and repayment schedule offered by that institution will govern your loan agreement. We
                encourage you to carefully read and understand all documents provided by the lender before signing.
                {siteConfig.name} is not responsible for the acts, omissions, or service quality of any third-party
                bank, NBFC, developer, or legal professional we refer you to.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">5. User Responsibilities</h2>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>Provide accurate, current, and complete information when submitting enquiries or applications.</li>
                <li>Furnish genuine documents; submission of false or forged documents may lead to rejection and legal action.</li>
                <li>Use our website and services only for lawful purposes.</li>
                <li>Not misuse, copy, or reproduce content from our website without permission.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">6. Fees &amp; Charges Disclosure</h2>
              <p>
                Any service fee, processing fee, or facilitation charge applicable for a specific service (such as
                taxation or company registration services) will be communicated to you transparently before you
                proceed. For most loan facilitation services, {siteConfig.name} is compensated by partner banks/NBFCs
                and does not charge the customer directly, unless explicitly stated otherwise in writing.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">7. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and design, is the property of{" "}
                {siteConfig.name} or its licensors and is protected under applicable intellectual property laws. You
                may not reproduce, distribute, or create derivative works from this content without our prior
                written consent.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, {siteConfig.name} shall not be liable for any indirect,
                incidental, or consequential damages arising from your use of our website or services, including but
                not limited to loss of loan approval, property transaction delays, or third-party service failures.
                Our total liability, if any, shall not exceed the service fee (if any) paid by you to us directly.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless {siteConfig.name}, its employees, and affiliates from any
                claims, damages, or expenses arising out of your breach of these Terms, misuse of our services, or
                submission of inaccurate or fraudulent information.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-3">10. Governing Law &amp; Jurisdiction</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
                arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of
                the courts located in Hyderabad, Telangana.
              </p>
            </div>

            <div className="rounded-2xl bg-muted/60 p-6">
              <h3 className="font-heading font-bold mb-2">11. Contact Information</h3>
              <p className="text-sm">
                For any questions regarding these Terms, please contact us at:
                <br />
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

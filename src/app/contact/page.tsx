import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { LeadForm } from "@/components/shared/lead-form";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Kavya Financial Services for loans, real estate and taxation services. Call, email, or visit our office in Hyderabad — we serve Telangana, Andhra Pradesh & Karnataka.",
  alternates: { canonical: "/contact" },
};

const interestOptions = [
  { value: "Home Loan", label: "Home Loan" },
  { value: "Personal Loan", label: "Personal Loan" },
  { value: "Business Loan", label: "Business Loan" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Tax Services", label: "Tax Services" },
  { value: "Other", label: "Other" },
];

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    lines: [siteConfig.phone],
    href: `tel:${siteConfig.phoneRaw}`,
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    lines: [siteConfig.phone, "Chat with us instantly"],
    href: siteConfig.whatsappUrl,
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [siteConfig.email],
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [...siteConfig.addressLines],
    href: `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}`,
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: [siteConfig.hours],
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />

      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">Get in Touch</h1>
            <p className="text-white/70 max-w-xl text-pretty">
              Have a question about loans, real estate or taxation services? Our team is here to help — reach out
              any way that&apos;s convenient for you.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {contactCards.map((card) => {
              const Content = (
                <div className="rounded-2xl border border-border/70 p-6 h-full hover:shadow-premium transition-shadow">
                  <div
                    className={
                      card.icon === WhatsAppIcon
                        ? "flex size-11 items-center justify-center rounded-xl bg-[#25D366] text-white mb-4"
                        : "flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4"
                    }
                  >
                    <card.icon className="size-5" />
                  </div>
                  <h3 className="font-heading font-bold mb-2">{card.title}</h3>
                  {card.lines.map((line) => (
                    <p key={line} className="text-sm text-muted-foreground leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              );
              return card.href ? (
                <a key={card.title} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {Content}
                </a>
              ) : (
                <div key={card.title}>{Content}</div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Reach Out"
                title="Send Us a Message"
                description="Fill out the form and our team will get back to you within 24 hours."
              />
              <div className="mt-8 rounded-3xl border border-border/80 shadow-premium p-6 sm:p-8 bg-card">
                <LeadForm
                  interestOptions={interestOptions}
                  source="contact-page"
                  title="Get a Free Consultation"
                  description="Tell us what you need and one of our experts will reach out shortly."
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl overflow-hidden border border-border/70 h-80 lg:h-[420px]">
                <iframe
                  title="Kavya Financial Services Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="rounded-2xl bg-card border border-border/70 p-6">
                <h3 className="font-heading font-bold mb-2">Our Offices</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Headquartered in Pragathi Nagar, Hyderabad, we serve customers across{" "}
                  {siteConfig.locations.join(", ")} through our network of relationship managers, branch
                  partners and digital channels. Can&apos;t visit in person? Our team is happy to assist over phone,
                  email or WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

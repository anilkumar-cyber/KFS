import type { Metadata } from "next";
import {
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  Database,
  Globe,
  LayoutTemplate,
  MessageSquare,
  Rocket,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { LeadForm } from "@/components/shared/lead-form";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Digital Marketing & Lead Generation Services",
  description:
    "Grow your business with Kavya Financial Services' marketing arm — qualified lead generation, Facebook & Google Ads, SEO, WhatsApp marketing, AI chatbots and conversion-optimized landing pages.",
  alternates: { canonical: "/lead-generation" },
};

const interestOptions = [
  { value: "lead-generation", label: "Lead Generation" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "whatsapp-marketing", label: "WhatsApp Marketing" },
  { value: "ai-chatbot", label: "AI Chatbot" },
  { value: "landing-pages", label: "Landing Page Development" },
  { value: "crm-setup", label: "CRM Setup" },
];

const overviewPoints = [
  {
    icon: Target,
    title: "Qualified Lead Sourcing",
    description: "We identify and capture high-intent leads through paid, organic and conversational channels — not just clicks.",
  },
  {
    icon: Database,
    title: "CRM Handoff",
    description: "Every lead is scored, tagged and pushed straight into your CRM or WhatsApp — ready for your sales team to act on.",
  },
  {
    icon: Globe,
    title: "Industries We Serve",
    description: "Real estate, financial services, healthcare, education, retail and local service businesses across South India.",
  },
];

const digitalMarketingChannels = [
  {
    icon: Users,
    title: "Facebook & Instagram Ads",
    description: "Highly targeted campaigns that put your business in front of the right audience at the right time.",
    features: ["Audience research & targeting", "Creative design & copywriting", "A/B tested ad sets", "Weekly performance reports"],
  },
  {
    icon: Search,
    title: "Google Ads",
    description: "Search, display and shopping campaigns that capture demand from people actively looking for you.",
    features: ["Keyword & competitor research", "Search & display campaigns", "Conversion tracking setup", "Ongoing bid optimization"],
  },
  {
    icon: TrendingUp,
    title: "SEO",
    description: "Long-term organic visibility so your business ranks where your customers are searching.",
    features: ["Technical SEO audit", "On-page & content optimization", "Local SEO / Google Business Profile", "Monthly ranking reports"],
  },
];

const whatsappFeatures = [
  "Bulk broadcast campaigns to opted-in customer lists",
  "Automated drip sequences for nurturing new leads",
  "Product/service catalog sharing inside WhatsApp",
  "Two-way conversation handoff to your sales team",
];

const chatbotFeatures = [
  "Instant lead qualification with smart, guided questions",
  "24/7 automated customer support on your website & WhatsApp",
  "Seamless handoff to a human agent when needed",
  "Conversation analytics to keep improving response quality",
];

const landingPageFeatures = [
  "Fast-loading, mobile-first pages built for conversion",
  "Custom design aligned to your campaign & brand",
  "Built-in lead capture forms with CRM/WhatsApp integration",
  "A/B testing to continuously improve conversion rates",
];

const pricingTiers = [
  {
    name: "Starter",
    price: "₹9,999",
    period: "/mo",
    description: "For small businesses starting their digital growth journey.",
    features: ["1 ad platform (Facebook or Google)", "Monthly performance report", "Basic landing page", "Email support"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹24,999",
    period: "/mo",
    description: "For businesses ready to scale lead volume across channels.",
    features: [
      "Facebook + Google Ads",
      "WhatsApp broadcast campaigns",
      "Custom landing page + A/B testing",
      "CRM integration",
      "Bi-weekly strategy calls",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For established businesses needing a full-funnel growth partner.",
    features: [
      "All Growth features",
      "AI chatbot for lead qualification",
      "SEO & content strategy",
      "Dedicated growth manager",
      "Weekly reporting & optimization",
    ],
    highlighted: false,
  },
];

export default function LeadGenerationPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Lead Generation & Marketing", href: "/lead-generation" }]} />

      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <Rocket className="size-7" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
              Grow Your Business with Data-Driven Marketing
            </h1>
            <p className="text-white/70 max-w-2xl text-pretty">
              Kavya&apos;s marketing arm helps businesses across South India generate qualified leads, engage customers on
              WhatsApp, automate support with AI, and convert traffic with high-performing landing pages.
            </p>
          </div>
        </Container>
      </section>

      <section id="lead-generation" className="py-14 sm:py-20 scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="Lead Generation"
            title="Leads That Are Ready to Buy"
            description="We don't just drive traffic — we build a system that sources, qualifies and delivers leads your sales team can convert."
          />
          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            {overviewPoints.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border/70 bg-card p-6 hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                  <item.icon className="size-5" />
                </div>
                <h3 className="font-heading font-bold text-base mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="digital-marketing" className="py-14 sm:py-20 bg-muted/40 scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="Digital Marketing"
            title="Facebook Ads, Google Ads & SEO"
            description="Full-funnel digital advertising and organic growth, managed end-to-end by our in-house team."
          />
          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {digitalMarketingChannels.map((channel) => (
              <div
                key={channel.title}
                className="flex flex-col rounded-2xl border border-border/70 bg-card p-6 hover:shadow-premium transition-all duration-300"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white mb-4">
                  <channel.icon className="size-6" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1.5">{channel.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{channel.description}</p>
                <ul className="mt-auto space-y-2">
                  {channel.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="whatsapp-marketing" className="py-14 sm:py-20 scroll-mt-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="WhatsApp Marketing"
                title="Reach Customers Where They Already Are"
                description="Broadcast campaigns, automated drip sequences and catalog sharing — all inside WhatsApp, India's most-used messaging app."
              />
            </div>
            <div className="rounded-3xl border border-border/80 shadow-premium p-6 sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                <MessageSquare className="size-6" />
              </div>
              <ul className="space-y-3">
                {whatsappFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="ai-chatbot" className="py-14 sm:py-20 bg-muted/40 scroll-mt-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl border border-border/80 shadow-premium p-6 sm:p-8 lg:order-1 order-2">
              <div className="flex size-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4">
                <Bot className="size-6" />
              </div>
              <ul className="space-y-3">
                {chatbotFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:order-2 order-1">
              <SectionHeading
                align="left"
                eyebrow="AI Chatbot"
                title="Never Miss a Lead, Day or Night"
                description="Our AI chatbot qualifies leads instantly and handles common customer questions 24/7 — on your website and WhatsApp."
              />
            </div>
          </div>
        </Container>
      </section>

      <section id="landing-pages" className="py-14 sm:py-20 scroll-mt-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Landing Page Development"
                title="Pages Built to Convert, Not Just Look Good"
                description="Fast-loading, mobile-first landing pages designed around a single goal: turning visitors into leads."
              />
            </div>
            <div className="rounded-3xl border border-border/80 shadow-premium p-6 sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                <LayoutTemplate className="size-6" />
              </div>
              <ul className="space-y-3">
                {landingPageFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, Transparent Packages"
            description="Illustrative pricing — final quotes are tailored to your industry, channels and lead volume goals."
          />
          <div className="mt-12 grid lg:grid-cols-3 gap-6 items-start">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={
                  tier.highlighted
                    ? "relative flex flex-col rounded-3xl border-2 border-secondary bg-card p-7 shadow-premium lg:-translate-y-3"
                    : "relative flex flex-col rounded-3xl border border-border/70 bg-card p-7"
                }
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white">
                    Most Popular
                  </Badge>
                )}
                <h3 className="font-heading font-bold text-xl mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-3xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-sm text-muted-foreground">{tier.period}</span>}
                </div>
                <ul className="space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="size-4 text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-5">
                <Sparkles className="size-7" />
              </div>
              <SectionHeading
                align="left"
                eyebrow="Free Audit"
                title="Get a Free Marketing Audit"
                description="Share a few details about your business and our marketing team will review your current presence and share a growth plan — no obligation."
              />
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="size-5 text-secondary" />
                Includes a review of your ads, SEO, WhatsApp and landing page performance.
              </div>
            </div>
            <div className="rounded-3xl border border-border/80 shadow-premium p-6 sm:p-7">
              <LeadForm
                interestOptions={interestOptions}
                source="lead-generation-inquiry"
                title="Get a Free Marketing Audit"
                description="Tell us about your business and goals — we'll get back to you within 24 hours."
                compact
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

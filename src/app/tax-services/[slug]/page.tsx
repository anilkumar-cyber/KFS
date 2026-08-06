import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, FileStack, IndianRupee } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { LeadForm } from "@/components/shared/lead-form";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/shared/json-ld";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getAllTaxServices, getTaxServiceBySlug } from "@/lib/queries/tax-services";
import { getIcon } from "@/lib/icon-map";
import { ProcessStepper } from "@/components/tax-services/process-stepper";
import { ServiceIcon } from "@/components/tax-services/service-icon";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getAllTaxServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getTaxServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.name} - ${service.tagline}`,
    description: service.description,
    alternates: { canonical: `/tax-services/${slug}` },
  };
}

export default async function TaxServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, taxServices] = await Promise.all([getTaxServiceBySlug(slug), getAllTaxServices()]);
  if (!service) notFound();

  const interestOptions = taxServices.map((s) => ({ value: s.slug, label: s.name }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Tax & Compliance Services", href: "/tax-services" },
          { name: service.name, href: `/tax-services/${service.slug}` },
        ]}
      />
      <FaqJsonLd faqs={service.faqs} />

      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <Breadcrumb className="mb-6">
            <BreadcrumbList className="text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-white">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/tax-services" className="hover:text-white">
                  Tax &amp; Compliance
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">{service.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <ServiceIcon name={service.icon} className="size-7" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
              {service.name}
            </h1>
            <p className="text-white/70 max-w-2xl text-pretty">{service.tagline}</p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <IndianRupee className="size-4 text-gold" />
                {service.price}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <Clock className="size-4 text-gold" />
                {service.timeline}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-14">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-3">Overview</h2>
                <p className="text-muted-foreground text-pretty leading-relaxed">{service.description}</p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4"
                    >
                      <CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">Our Process</h2>
                <ProcessStepper steps={service.process} />
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">Documents Required</h2>
                <div className="rounded-2xl border border-border/70 bg-card p-6">
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.documents.map((doc) => (
                      <li key={doc} className="flex items-start gap-2.5 text-sm">
                        <FileStack className="size-4 text-secondary shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <Accordion className="w-full rounded-2xl border border-border/70 bg-card px-6">
                  {service.faqs.map((faq, i) => (
                    <AccordionItem key={faq.question} value={`faq-${i}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 rounded-3xl border border-border/80 shadow-premium p-6 sm:p-7">
              <LeadForm
                interestOptions={interestOptions}
                defaultInterest={service.slug}
                source={`tax-service-${service.slug}`}
                title="Get Started"
                description={`Share your details and our team will help you with ${service.name.toLowerCase()}.`}
                compact
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Explore More"
            title="Other Tax & Compliance Services"
            description="Browse our full range of taxation and compliance offerings."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {taxServices
              .filter((s) => s.slug !== service.slug)
              .slice(0, 4)
              .map((s) => {
                const OtherIcon = getIcon(s.icon);
                return (
                  <Link
                    key={s.slug}
                    href={`/tax-services/${s.slug}`}
                    className="group flex flex-col rounded-2xl border border-border/70 bg-card p-5 hover:shadow-premium hover:border-secondary/40 transition-all duration-300"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white mb-3 group-hover:bg-secondary transition-colors">
                      <OtherIcon className="size-5" />
                    </div>
                    <h3 className="font-heading font-bold text-sm mb-1">{s.name}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-secondary group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="size-3.5" />
                    </span>
                  </Link>
                );
              })}
          </div>
        </Container>
      </section>
    </>
  );
}

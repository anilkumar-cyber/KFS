"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, footerLinks } from "@/lib/site-config";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/shared/social-icons";

const social = [
  { href: siteConfig.whatsappUrl, icon: WhatsAppIcon, label: "WhatsApp" },
  { href: siteConfig.social.facebook, icon: FacebookIcon, label: "Facebook" },
  { href: siteConfig.social.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: siteConfig.social.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
  { href: siteConfig.social.twitter, icon: TwitterIcon, label: "Twitter" },
  { href: siteConfig.social.youtube, icon: YouTubeIcon, label: "YouTube" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/60 hover:text-gold transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-white/10">
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo light />
            <p className="mt-4 text-sm text-white/60 max-w-xs">{siteConfig.description}</p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm text-white/70">
              <a href={`tel:${siteConfig.phoneRaw}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="size-4 shrink-0" /> {siteConfig.phone}
              </a>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <WhatsAppIcon className="size-4 shrink-0 text-[#25D366]" /> WhatsApp: {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="size-4 shrink-0" /> {siteConfig.email}
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={
                    s.label === "WhatsApp"
                      ? "flex size-9 items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5A] transition-colors"
                      : "flex size-9 items-center justify-center rounded-full bg-white/5 hover:bg-gold hover:text-primary transition-colors"
                  }
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Loan Services" links={footerLinks.loans} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Services" links={footerLinks.services} />

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-white/60 mb-3">Get loan tips, rate updates & property listings in your inbox.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email"
                required
                className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-gold"
              />
              <Button type="submit" className="bg-gold text-primary hover:bg-gold/90 font-semibold">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-2 text-xs text-white/50">
          {siteConfig.locations.map((loc, i) => (
            <span key={loc} className="flex items-center gap-2">
              {loc}
              {i < siteConfig.locations.length - 1 && <span className="opacity-40">&bull;</span>}
            </span>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {footerLinks.legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-white/50 hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}

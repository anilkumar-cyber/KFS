"use client";

import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent("Hi, I'd like to know more about your services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 active:scale-95"
      >
        <WhatsAppIcon className="relative z-10 size-7" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40 group-hover:opacity-0" />
      </a>
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        aria-label="Call us"
        className="flex size-14 items-center justify-center rounded-full bg-secondary text-white shadow-[0_8px_24px_rgba(30,136,229,0.45)] transition-transform hover:scale-110 active:scale-95"
      >
        <Phone className="size-5" fill="currentColor" />
      </a>
    </div>
  );
}

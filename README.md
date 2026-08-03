# Kavya Financial Services — Public Website

Premium, SEO-optimized marketing site for Kavya Financial Services — loan facilitation, real estate, GST/tax services, and marketing/lead-generation services across Telangana, Andhra Pradesh & Karnataka.

This is **Phase 1** of the platform: the public-facing lead-generation website (no auth, no customer/employee/admin portals yet — see [Roadmap](#roadmap) below for what's next).

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Kit:** shadcn (base-ui flavor — see [Notes on base-ui](#notes-on-base-ui) below)
- **Animation:** Framer Motion
- **Forms & Validation:** React Hook Form + Zod
- **Charts:** Recharts (EMI calculator pie chart)
- **Theming:** next-themes (light/dark mode)
- **Toasts:** Sonner

No backend/database yet — the lead form posts to a local Next.js API route (`/api/leads`) that validates and logs submissions in-memory. See Roadmap.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project Structure

```
src/
  app/                        Routes (Next.js App Router)
    page.tsx                  Home
    loans/                    Loan Services hub + 13 dynamic detail pages ([slug])
    real-estate/               Property listing (filters, compare, favorites) + detail pages
    auction-properties/        Bank-auctioned properties
    tax-services/               Tax/GST hub + 8 dynamic detail pages
    lead-generation/            Marketing/lead-gen services (anchor sections)
    emi-calculator/             Standalone EMI calculator
    eligibility-calculator/     Standalone loan eligibility calculator
    blogs/                      Blog list + detail pages
    about/ testimonials/ faq/ careers/ contact/
    privacy-policy/ terms/ sitemap-page/
    sitemap.ts robots.ts        Dynamic sitemap.xml / robots.txt
    api/leads/                  Lead capture endpoint (validation + rate limiting)
  components/
    layout/                    Navbar (mega menu), Footer, floating WhatsApp/Call buttons
    home/                       Home page sections (hero, calculators, stats, testimonials, etc.)
    calculators/                Reusable EmiCalculator / EligibilityCalculator widgets
    loans/ real-estate/ tax-services/ blog/   Feature-scoped components
    shared/                     Container, SectionHeading, LeadForm, JSON-LD helpers, Logo
    ui/                         shadcn primitives (button, card, dialog, accordion, etc.)
    theme-provider.tsx theme-toggle.tsx
  lib/
    site-config.ts              Company info, nav structure
    data/                       Sample content: loans, properties, banks, testimonials, blogs, tax services, FAQs, stats
    calculators.ts              EMI / eligibility math
    icon-map.ts                 String → lucide icon resolver (for data-driven icons)
    validation/lead.ts           Zod schema for the lead capture form
```

## Content Data

All sample content (loan products, property listings, partner banks, testimonials, blog posts, tax services, FAQs) lives in `src/lib/data/*.ts` as typed TypeScript — no CMS/database in this phase. Replace these with real data or wire them to a CMS/API in Phase 2.

## SEO

- Per-page `metadata` (title, description, canonical) on every route, dynamic `generateMetadata` on all `[slug]` routes.
- JSON-LD: Organization (`FinancialService`) schema sitewide, `BreadcrumbList` and `FAQPage` schema on relevant pages (`src/components/shared/json-ld.tsx`).
- Dynamic `sitemap.xml` (`src/app/sitemap.ts`) covering all static + dynamic (loan/property/tax-service/blog) routes.
- `robots.txt` (`src/app/robots.ts`), disallowing `/api/`.
- Open Graph / Twitter card metadata, theme-color for light/dark.

## Notes on base-ui

This shadcn install uses [Base UI](https://base-ui.com) primitives rather than Radix for most components (`select`, `accordion`, `dialog`, `sheet`, `tooltip`, etc.). Two things worth knowing if you extend the UI kit:

- **`Button`** (`src/components/ui/button.tsx`) was patched to support the classic `asChild` (Radix Slot) pattern, so `<Button asChild><Link href="/x">Text</Link></Button>` works as expected throughout the codebase.
- **Other trigger primitives** (Dialog/Sheet/Popover/DropdownMenu/Tooltip triggers) use base-ui's native `render={<Component />}` prop instead of `asChild` — see `src/components/layout/navbar.tsx` for an example.
- `Select`'s `onValueChange` is typed `(value: string | null) => void` — guard with `(v) => v && setState(v)`.
- `Accordion` has no `type`/`collapsible` props (base-ui default is single-open, toggle-to-close); each `AccordionItem` needs a unique `value`.

## Roadmap (not built in this phase)

Per the original spec, the following are intentionally out of scope for this phase and would be separate, substantial workstreams:

- **Backend:** NestJS/Node API + PostgreSQL/Prisma, replacing the in-memory `/api/leads` route with a real database, and the `src/lib/data/*` sample content with real persisted content (properties, blog CMS, etc.).
- **Auth:** JWT + refresh tokens, OTP login, Google login.
- **Customer Portal:** login/registration, loan application tracking, document upload, saved calculators, wishlist, support tickets.
- **Employee Portal:** assigned leads, call logs, commission/performance dashboards.
- **Admin Panel:** CRM (pipeline, lead assignment, follow-ups), analytics dashboards, content/property/blog management, role & permission management.
- **AI features:** chat assistant, document OCR/verification, WhatsApp/email automation.
- **i18n:** Telugu/Kannada language switcher.
- **PWA/offline support.**

## Deployment

Standard Next.js deployment — works out of the box on Vercel, or via Docker + Node on any host:

```bash
npm run build
npm run start
```

Set `NEXT_PUBLIC_SITE_URL` / update `siteConfig.url` in `src/lib/site-config.ts` to the production domain before deploying (used for canonical URLs, sitemap, and JSON-LD).

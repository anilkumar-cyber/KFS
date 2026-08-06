# Kavya Financial Services — Platform

Premium, SEO-optimized platform for Kavya Financial Services — loan facilitation, real estate, GST/tax services, and marketing/lead-generation services across Telangana, Andhra Pradesh & Karnataka.

- **Phase 1:** the public-facing lead-generation website.
- **Phase 2 (current):** a Postgres/Prisma backend, credentials-based admin panel (dashboard, Leads/CRM, staff Users), and full content-management CRUD for every content type — with the public site reading live from the database instead of static sample data.

See [Roadmap](#roadmap) for what's still ahead (customer/employee portals, real auth for end users, AI features, etc).

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM 6
- **Styling:** Tailwind CSS v4
- **UI Kit:** shadcn (base-ui flavor — see [Notes on base-ui](#notes-on-base-ui) below)
- **Animation:** Framer Motion
- **Forms & Validation:** React Hook Form + Zod
- **Charts:** Recharts (EMI calculator pie chart)
- **Auth:** Custom JWT session cookie (`jose`) + `bcryptjs` password hashing — admin panel only, see [Admin Panel](#admin-panel)
- **Theming:** next-themes (light/dark mode)
- **Toasts:** Sonner

## Getting Started

### 1. Database

Start Postgres via the included `docker-compose.yml`:

```bash
docker compose up -d
```

This starts a `postgres:16-alpine` container on `localhost:5435` (not 5432, to avoid colliding with any other local Postgres install) with a persistent named volume.

### 2. Environment

```bash
cp .env.example .env
```

The defaults in `.env.example` already match the docker-compose service (`DATABASE_URL`) and are fine for local dev. Generate a real `SESSION_SECRET` for anything beyond local dev:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Install, migrate, seed

```bash
npm install
npm run db:migrate   # applies prisma/migrations against your DB
npm run db:seed      # seeds sample loans/properties/blog posts/etc + admin users
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

**Seeded admin credentials** (see `prisma/seed.ts` — change/remove in any shared environment):
- Admin: `admin@kavyafinancialservices.com` / `Admin@12345`
- Employee: `employee@kavyafinancialservices.com` / `Employee@12345`

```bash
npm run build       # production build
npm run start        # serve the production build
npm run lint          # ESLint
npm run db:studio    # Prisma Studio (browse/edit DB directly)
```

## Admin Panel

`/admin/*` — credentials login, JWT session cookie (`kfs_session`, httpOnly), gated by `src/proxy.ts` (Next's middleware convention) plus a server-side session check in `src/app/admin/(dashboard)/layout.tsx`. Two roles: `ADMIN` (full access, including Users management) and `EMPLOYEE` (everything except `/admin/users`).

Sections (`src/lib/admin-nav.ts`):
- **Dashboard** — lead counts by status, recent leads, content counts.
- **Leads / CRM** — filterable list, detail view, status/assignment changes, notes timeline. The public lead form (`/api/leads`) persists directly here.
- **Properties, Auction Properties, Loan Products, Tax Services, Blog Posts, Testimonials (with moderation), FAQs, Partner Banks** — full CRUD (list, create, edit, delete), each backed by a `"use server"` actions file in `src/lib/actions/`.
- **Users** (admin-only) — create/edit/deactivate/delete staff accounts, reset passwords.

Mutations use Next.js Server Actions (not a separate REST API) and call `revalidatePath` so both the admin views and the public pages update — public content pages also carry `export const revalidate = 60`, so an edit is live within a minute even without a manual action, and instantly in dev mode.

## Project Structure

```
prisma/
  schema.prisma                Full data model (users, leads, all content types, audit log)
  seed.ts                      Seeds admin/employee users + sample content from the old static data
docker-compose.yml              Local Postgres service
src/
  middleware.ts → proxy.ts     Route protection for /admin/*
  app/
    page.tsx                   Home (Server Component, fetches from Postgres)
    loans/ real-estate/ auction-properties/ tax-services/ blogs/ testimonials/ faq/  Public pages, DB-backed
    lead-generation/ emi-calculator/ eligibility-calculator/
    about/ careers/ contact/ privacy-policy/ terms/ sitemap-page/
    sitemap.ts robots.ts        Dynamic sitemap.xml / robots.txt (DB-backed)
    api/leads/                  Public lead capture endpoint (validation + rate limiting, persists to DB)
    api/admin/login/ logout/    Admin auth endpoints
    admin/
      login/                    Admin login page (public)
      (dashboard)/              Route group: session-gated shell (sidebar/topbar) + all admin pages
  components/
    layout/                    Navbar, Footer, SiteChrome (hides marketing chrome under /admin), floating buttons
    home/                       Home page sections — receive DB data as props from page.tsx
    calculators/                Reusable EmiCalculator / EligibilityCalculator widgets
    loans/ real-estate/ tax-services/ blog/   Public feature components
    admin/                      Admin-only components: forms, status selects, delete dialogs, filter bars
    shared/                     Container, SectionHeading, LeadForm, JSON-LD helpers, Logo
    ui/                         shadcn primitives (button, card, dialog, accordion, etc.)
  lib/
    db.ts                       Prisma client singleton
    queries/                    Public-facing async data-fetch functions (Prisma → typed shapes)
    actions/                    Admin "use server" mutation functions, one file per entity
    auth/                       jwt.ts (edge-safe verify, used by proxy.ts) + session.ts (server-only cookie helpers)
    data/                       Legacy static sample data — superseded by queries/, kept as reference/fallback
    site-config.ts admin-nav.ts calculators.ts icon-map.ts
```

## SEO

- Per-page `metadata` (title, description, canonical) on every route, dynamic `generateMetadata` on all `[slug]` routes.
- JSON-LD: Organization (`FinancialService`) schema sitewide, `BreadcrumbList` and `FAQPage` schema on relevant pages (`src/components/shared/json-ld.tsx`).
- Dynamic `sitemap.xml` and the human-readable `/sitemap-page` both query Postgres directly, so newly-added content (via the admin panel) is included automatically.
- `robots.txt` (`src/app/robots.ts`), disallowing `/api/` and `/admin/`.
- Open Graph / Twitter card metadata, theme-color for light/dark.
- Admin pages (`/admin/**`) are `robots: { index: false }`.

## Notes on base-ui

This shadcn install uses [Base UI](https://base-ui.com) primitives rather than Radix for most components (`select`, `accordion`, `dialog`, `sheet`, `tooltip`, etc.). Two things worth knowing if you extend the UI kit:

- **`Button`** (`src/components/ui/button.tsx`) was patched to support the classic `asChild` (Radix Slot) pattern, so `<Button asChild><Link href="/x">Text</Link></Button>` works as expected throughout the codebase.
- **Other trigger primitives** (Dialog/Sheet/Popover/DropdownMenu/Tooltip triggers) use base-ui's native `render={<Component />}` prop instead of `asChild` — see `src/components/layout/navbar.tsx` or `src/components/admin/delete-lead-button.tsx` for examples.
- `Select`'s `onValueChange` is typed `(value: string | null) => void` — guard with `(v) => v && setState(v)`.
- `Accordion` has no `type`/`collapsible` props (base-ui default is single-open, toggle-to-close); each `AccordionItem` needs a unique `value`.

## Roadmap (not built yet)

- **Customer Portal:** end-user login/registration/OTP, loan application tracking, document upload, saved calculators, wishlist, support tickets.
- **Employee Portal:** assigned leads, call logs, commission/performance dashboards (the `EMPLOYEE` role exists in the schema/auth today but has no dedicated views beyond the shared admin sections).
- **CRM depth:** pipeline/kanban view, automated follow-up reminders, email/WhatsApp/SMS integration, audit log UI (the `AuditLog` model exists in the schema but isn't written to yet).
- **AI features:** chat assistant, document OCR/verification, WhatsApp/email automation.
- **i18n:** Telugu/Kannada language switcher.
- **PWA/offline support.**
- Real image upload/storage (S3/Cloudinary) — content forms currently take plain image URLs.
- Retire `src/lib/data/*.ts` (the original static sample data) once you're confident nothing still references it.

## Deployment

```bash
npm run build
npm run start
```

Needs a reachable Postgres (`DATABASE_URL`) and a strong `SESSION_SECRET` in the deployment environment; run `npx prisma migrate deploy` against production before first boot. Update `siteConfig.url` in `src/lib/site-config.ts` to the production domain (used for canonical URLs, sitemap, and JSON-LD).

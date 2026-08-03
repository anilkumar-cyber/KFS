"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Phone, Search, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav, secondaryNav, siteConfig, type NavGroup, type NavLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/shared/logo";

function isGroup(item: NavGroup | NavLink): item is NavGroup {
  return "columns" in item;
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-xl shadow-premium"
          : "border-b border-transparent bg-background/40 backdrop-blur-md"
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Top utility bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground/90">
        <div className="mx-auto max-w-7xl container-px flex h-9 items-center justify-between text-xs">
          <p className="text-primary-foreground/70">
            Serving Telangana &middot; Andhra Pradesh &middot; Karnataka
          </p>
          <div className="flex items-center gap-5">
            <a href={`tel:${siteConfig.phoneRaw}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="size-3.5" /> {siteConfig.phone}
            </a>
            <Link href="/careers" className="hover:text-gold transition-colors">Careers</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Get a Callback</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl container-px">
        <div className="flex h-16 lg:h-[70px] items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => {
              if (!isGroup(item)) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "px-3.5 py-2 rounded-full text-sm font-medium transition-colors hover:text-secondary hover:bg-secondary/10",
                      pathname === item.href ? "text-secondary" : "text-foreground/80"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }
              const active = openMenu === item.label;
              return (
                <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.label)}>
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-medium transition-colors hover:text-secondary hover:bg-secondary/10",
                      active ? "text-secondary bg-secondary/10" : "text-foreground/80"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("size-3.5 transition-transform", active && "rotate-180")} />
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search">
              <Search className="size-[18px]" />
            </Button>
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button asChild className="hidden lg:inline-flex rounded-full bg-accent text-white hover:bg-accent/90 shadow-premium">
              <Link href="/eligibility-calculator">
                Check Eligibility <ArrowRight className="size-4" />
              </Link>
            </Button>

            {/* Mobile menu trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}
              >
                <Menu className="size-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] sm:w-[380px] overflow-y-auto p-0">
                <SheetHeader className="border-b border-border px-5 py-4">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 p-4">
                  <Accordion className="w-full">
                    {mainNav.map((item) =>
                      isGroup(item) ? (
                        <AccordionItem key={item.label} value={item.label} className="border-border">
                          <AccordionTrigger className="text-sm font-semibold py-3 hover:no-underline">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-4 pb-2">
                              {item.columns.map((col) => (
                                <div key={col.heading}>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                                    {col.heading}
                                  </p>
                                  <div className="flex flex-col gap-0.5">
                                    {col.links.map((l) => (
                                      <Link
                                        key={l.href}
                                        href={l.href}
                                        className="rounded-lg px-2 py-1.5 text-sm text-foreground/80 hover:bg-secondary/10 hover:text-secondary"
                                      >
                                        {l.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block py-3 text-sm font-semibold border-b border-border last:border-b-0"
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </Accordion>
                  <div className="mt-3 flex flex-col gap-2">
                    {secondaryNav.map((l) => (
                      <Link key={l.href} href={l.href} className="text-sm text-muted-foreground py-1.5">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                  <Button asChild className="mt-4 rounded-full bg-accent text-white hover:bg-accent/90">
                    <Link href="/eligibility-calculator">Check Loan Eligibility</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <a href={`tel:${siteConfig.phoneRaw}`}>
                      <Phone className="size-4" /> Call {siteConfig.phone}
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mega menu panel */}
      <AnimatePresence>
        {openMenu &&
          mainNav.filter(isGroup).map(
            (item) =>
              item.label === openMenu && (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="hidden lg:block absolute left-0 right-0 border-t border-border bg-popover/98 backdrop-blur-xl shadow-premium"
                  onMouseEnter={() => setOpenMenu(item.label)}
                >
                  <div className="mx-auto max-w-7xl container-px py-8 grid grid-cols-12 gap-8">
                    <div className={cn("grid gap-8", item.columns.length === 2 ? "grid-cols-2 col-span-8" : "grid-cols-1 col-span-8")}>
                      {item.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-3">
                            {col.heading}
                          </p>
                          <ul className="flex flex-col gap-1">
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary/10 hover:text-secondary transition-colors"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {item.featured && (
                      <Link
                        href={item.featured.href}
                        className="col-span-4 group relative overflow-hidden rounded-2xl bg-hero-gradient p-6 flex flex-col justify-end min-h-[180px] shadow-premium"
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="relative text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">Featured</span>
                        <h4 className="relative text-white text-lg font-bold mb-1">{item.featured.title}</h4>
                        <p className="relative text-white/70 text-sm mb-3">{item.featured.description}</p>
                        <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5 transition-all">
                          Explore <ArrowRight className="size-4" />
                        </span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              )
          )}
      </AnimatePresence>
    </header>
  );
}

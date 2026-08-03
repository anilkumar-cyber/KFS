"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Landmark, LogOut, Menu, ExternalLink } from "lucide-react";

import { adminNav } from "@/lib/admin-nav";
import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import type { SessionPayload } from "@/lib/auth/session";

function NavLinks({ session, onNavigate }: { session: SessionPayload; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {adminNav
        .filter((item) => !item.adminOnly || session.role === "ADMIN")
        .map((item) => {
          const Icon = getIcon(item.icon);
          const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-secondary/15 text-secondary"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
    </nav>
  );
}

function SidebarContent({ session, onNavigate }: { session: SessionPayload; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-primary text-white">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent">
          <Landmark className="size-5 text-white" strokeWidth={2.25} />
        </span>
        <div className="leading-none">
          <p className="font-heading font-bold text-sm">Kavya Admin</p>
          <p className="text-[11px] text-white/50">Control Panel</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <NavLinks session={session} onNavigate={onNavigate} />
      </div>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ExternalLink className="size-4" />
          View Website
        </Link>
      </div>
    </div>
  );
}

export function AdminShell({ session, children }: { session: SessionPayload; children: React.ReactNode }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const currentLabel =
    adminNav.find((item) => (item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href)))
      ?.label ?? "Dashboard";

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-muted/40 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
        <SidebarContent session={session} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0 border-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent session={session} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur px-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
            <h1 className="font-heading font-bold text-lg truncate">{currentLabel}</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm font-semibold">{session.name}</span>
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                {session.role}
              </Badge>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout} aria-label="Log out">
              <LogOut className="size-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}

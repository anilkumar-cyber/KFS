import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-premium">
            <Landmark className="size-6 text-gold" strokeWidth={2.25} />
          </span>
          <div className="text-center">
            <h1 className="font-heading text-xl font-bold text-white">Kavya Admin</h1>
            <p className="text-sm text-white/60">Sign in to manage leads &amp; content</p>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 sm:p-8 shadow-premium">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

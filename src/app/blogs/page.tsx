import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { BlogBrowser } from "@/components/blog/blog-browser";
import { blogPosts, blogCategories } from "@/lib/data/blogs";

export const metadata: Metadata = {
  title: "Blog - Insights & Resources",
  description:
    "Practical guides on home loans, personal finance, real estate, taxation and business financing from the experts at Kavya Financial Services.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Blogs", href: "/blogs" }]} />

      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
              Insights &amp; Resources
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">
              Loan, Real Estate &amp; Tax Insights
            </h1>
            <p className="text-white/70 max-w-xl text-pretty">
              Practical guides and tips to help you make smarter financial decisions — from choosing the right
              loan to understanding GST deadlines.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <BlogBrowser posts={blogPosts} categories={blogCategories} />
        </Container>
      </section>
    </>
  );
}

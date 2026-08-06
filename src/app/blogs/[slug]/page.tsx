import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeadForm } from "@/components/shared/lead-form";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { FacebookIcon, TwitterIcon, LinkedInIcon } from "@/components/shared/social-icons";
import { getAllPosts, getBlogBySlug } from "@/lib/queries/blogs";
import { loanProducts } from "@/lib/data/loans";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedOn.toISOString(),
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

const interestOptions = loanProducts.map((l) => ({ value: l.slug, label: l.name }));

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  const pageUrl = `${siteConfig.url}/blogs/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      Icon: FacebookIcon,
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(pageUrl)}`,
      Icon: TwitterIcon,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
      Icon: LinkedInIcon,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blogs", href: "/blogs" },
          { name: post.title, href: `/blogs/${post.slug}` },
        ]}
      />

      <section className="bg-hero-gradient py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Back to Blog
            </Link>
            <Badge className="bg-accent text-white">{post.category}</Badge>
            <h1 className="font-heading text-2xl sm:text-4xl font-bold text-white text-balance">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/70">
              <span>
                By <span className="text-white font-medium">{post.author}</span>, {post.authorRole}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {post.publishedOn.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {post.readMinutes} min read
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="relative h-56 sm:h-96 rounded-2xl overflow-hidden mb-10">
              <img src={post.image} alt={post.title} className="size-full object-cover" />
            </div>

            <div className="prose-content flex flex-col gap-5 text-[1.05rem] leading-[1.85] text-foreground/90">
              {post.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  <Tag className="size-3" /> {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-border">
              <span className="text-sm font-semibold">Share this article:</span>
              {shareLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${label}`}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary hover:text-white hover:border-secondary transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {relatedPosts.length > 0 && (
        <section className="py-14 sm:py-20 bg-muted/40">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-center mb-10">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blogs/${rp.slug}`}>
                  <Card className="group h-full overflow-hidden rounded-2xl border-border/70 p-0 hover:shadow-premium transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-white">{rp.category}</Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-sm leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
                        {rp.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                        Read More <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-2xl mx-auto rounded-3xl border border-border/80 shadow-premium p-6 sm:p-8">
            <LeadForm
              interestOptions={interestOptions}
              source={`blog-${post.slug}`}
              title="Want Expert Guidance?"
              description="Get a free consultation with our team based on what you just read."
              compact
            />
          </div>
        </Container>
      </section>
    </>
  );
}

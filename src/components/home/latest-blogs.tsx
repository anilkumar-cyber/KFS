"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/data/blogs";

export function LatestBlogs() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-muted/40">
      <Container>
        <SectionHeading eyebrow="Insights" title="Latest from the Blog" description="Guides and tips on loans, real estate, taxation and personal finance." />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link href={`/blogs/${post.slug}`}>
                <Card className="group h-full overflow-hidden rounded-2xl border-border/70 p-0 hover:shadow-premium transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-white">{post.category}</Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-base leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {new Date(post.publishedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" /> {post.readMinutes} min read
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-background transition-colors"
          >
            Read All Articles <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

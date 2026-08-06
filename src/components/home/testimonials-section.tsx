"use client";

import { Star } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/lib/queries/testimonials";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-20 sm:py-28 bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Customers Say"
          description="Real stories from customers we've helped across Telangana, Andhra Pradesh & Karnataka."
        />

        <Carousel className="mt-12 w-full" opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.id} className="sm:basis-1/2 lg:basis-1/3">
                <Card className="h-full rounded-2xl border-border/70 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <img src={t.avatar} alt={t.name} className="size-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.location} &middot; {t.service}
                      </p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-center gap-3">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </Container>
    </section>
  );
}

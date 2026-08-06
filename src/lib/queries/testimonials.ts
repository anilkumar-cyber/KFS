import { prisma } from "@/lib/db";

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  service: string;
  quote: string;
  avatar: string;
};

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    location: r.location,
    rating: r.rating,
    service: r.service,
    quote: r.quote,
    avatar: r.avatar,
  }));
}

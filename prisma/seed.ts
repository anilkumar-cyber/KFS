import { PrismaClient, LeadStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

import { loanProducts } from "../src/lib/data/loans";
import { properties, auctionProperties } from "../src/lib/data/properties";
import { taxServices } from "../src/lib/data/tax-services";
import { blogPosts } from "../src/lib/data/blogs";
import { testimonials } from "../src/lib/data/testimonials";
import { generalFaqs } from "../src/lib/data/faqs";
import { partnerBanks } from "../src/lib/data/banks";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding admin/employee users...");
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "Admin@12345";
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@kavyafinancialservices.com" },
    update: {},
    create: {
      email: "admin@kavyafinancialservices.com",
      passwordHash: adminPasswordHash,
      name: "Kavya Admin",
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "employee@kavyafinancialservices.com" },
    update: {},
    create: {
      email: "employee@kavyafinancialservices.com",
      passwordHash: await bcrypt.hash("Employee@12345", 10),
      name: "Ravi Employee",
      role: "EMPLOYEE",
    },
  });

  console.log("Seeding loan products...");
  for (const loan of loanProducts) {
    await prisma.loanProduct.upsert({
      where: { slug: loan.slug },
      update: {
        name: loan.name,
        shortName: loan.shortName,
        category: loan.category.toUpperCase() as "SECURED" | "UNSECURED",
        tagline: loan.tagline,
        description: loan.description,
        icon: loan.icon,
        interestRate: loan.interestRate,
        maxAmount: loan.maxAmount,
        maxTenure: loan.maxTenure,
        processingTime: loan.processingTime,
        processingFee: loan.processingFee,
        benefits: loan.benefits,
        eligibility: loan.eligibility,
        documents: loan.documents,
        faqs: loan.faqs,
      },
      create: {
        slug: loan.slug,
        name: loan.name,
        shortName: loan.shortName,
        category: loan.category.toUpperCase() as "SECURED" | "UNSECURED",
        tagline: loan.tagline,
        description: loan.description,
        icon: loan.icon,
        interestRate: loan.interestRate,
        maxAmount: loan.maxAmount,
        maxTenure: loan.maxTenure,
        processingTime: loan.processingTime,
        processingFee: loan.processingFee,
        benefits: loan.benefits,
        eligibility: loan.eligibility,
        documents: loan.documents,
        faqs: loan.faqs,
      },
    });
  }

  console.log("Seeding properties...");
  for (const p of properties) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        type: p.type,
        typeLabel: p.typeLabel,
        price: p.price,
        priceLabel: p.priceLabel,
        location: p.location,
        city: p.city,
        state: p.state,
        areaSqft: p.areaSqft,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        bankLoanAvailable: p.bankLoanAvailable,
        featured: p.featured,
        images: p.images,
        description: p.description,
        amenities: p.amenities,
        nearbyPlaces: p.nearbyPlaces,
        lat: p.lat,
        lng: p.lng,
        reraId: p.reraId,
        postedOn: new Date(p.postedOn),
      },
    });
  }

  console.log("Seeding auction properties...");
  for (const a of auctionProperties) {
    const existing = await prisma.auctionProperty.findFirst({ where: { title: a.title } });
    if (!existing) {
      await prisma.auctionProperty.create({
        data: {
          title: a.title,
          bank: a.bank,
          location: a.location,
          city: a.city,
          state: a.state,
          reservePrice: a.reservePrice,
          reservePriceLabel: a.reservePriceLabel,
          emdAmount: a.emdAmount,
          auctionDate: new Date(a.auctionDate),
          propertyType: a.propertyType,
          areaSqft: a.areaSqft,
          image: a.image,
          description: a.description,
        },
      });
    }
  }

  console.log("Seeding tax services...");
  for (const t of taxServices) {
    await prisma.taxService.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        slug: t.slug,
        name: t.name,
        tagline: t.tagline,
        description: t.description,
        icon: t.icon,
        price: t.price,
        timeline: t.timeline,
        benefits: t.benefits,
        process: t.process,
        documents: t.documents,
        faqs: t.faqs,
      },
    });
  }

  console.log("Seeding blog posts...");
  for (const b of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        tags: b.tags,
        author: b.author,
        authorRole: b.authorRole,
        publishedOn: new Date(b.publishedOn),
        readMinutes: b.readMinutes,
        image: b.image,
      },
    });
  }

  console.log("Seeding testimonials...");
  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name, quote: t.quote } });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          name: t.name,
          location: t.location,
          rating: t.rating,
          service: t.service,
          quote: t.quote,
          avatar: t.avatar,
          status: "APPROVED",
        },
      });
    }
  }

  console.log("Seeding FAQs...");
  for (const [i, f] of generalFaqs.entries()) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.faq.create({
        data: { question: f.question, answer: f.answer, category: f.category, order: i },
      });
    }
  }

  console.log("Seeding partner banks...");
  for (const [i, b] of partnerBanks.entries()) {
    const existing = await prisma.partnerBank.findFirst({ where: { shortName: b.shortName } });
    if (!existing) {
      await prisma.partnerBank.create({
        data: { name: b.name, shortName: b.shortName, type: b.type, order: i },
      });
    }
  }

  console.log("Seeding sample leads...");
  const sampleLeads: {
    name: string;
    phone: string;
    email: string;
    city: string;
    interest: string;
    message: string;
    source: string;
    status: LeadStatus;
  }[] = [
    { name: "Anitha Reddy", phone: "9848012345", email: "anitha.reddy@example.com", city: "Hyderabad", interest: "home-loan", message: "Looking for a home loan of around 40 lakhs.", source: "home-page-hero", status: "NEW" },
    { name: "Srinivas Rao", phone: "9848012346", email: "srinivas.rao@example.com", city: "Vijayawada", interest: "business-loan", message: "Need working capital for my trading business.", source: "loan-detail-business-loan", status: "CONTACTED" },
    { name: "Priya Nair", phone: "9848012347", email: "priya.nair@example.com", city: "Bangalore", interest: "property-inquiry", message: "Interested in the villa listed in Whitefield.", source: "property-inquiry-luxury-villa-whitefield-bangalore", status: "QUALIFIED" },
    { name: "Mohammed Ali", phone: "9848012348", email: "mohammed.ali@example.com", city: "Visakhapatnam", interest: "gst-registration", message: "Need GST registration for my new firm.", source: "tax-service-gst-registration", status: "IN_PROGRESS" },
    { name: "Lakshmi Devi", phone: "9848012349", email: "lakshmi.devi@example.com", city: "Mysuru", interest: "education-loan", message: "Education loan for my daughter's masters abroad.", source: "loan-detail-education-loan", status: "CONVERTED" },
    { name: "Karthik Iyer", phone: "9848012350", email: "karthik.iyer@example.com", city: "Hyderabad", interest: "personal-loan", message: "Personal loan for medical emergency.", source: "contact-page", status: "LOST" },
  ];

  for (const lead of sampleLeads) {
    const existing = await prisma.lead.findFirst({ where: { phone: lead.phone } });
    if (!existing) {
      await prisma.lead.create({
        data: {
          ...lead,
          assignedToId: lead.status !== "NEW" ? admin.id : null,
          notes:
            lead.status !== "NEW"
              ? { create: [{ body: "Initial outreach call completed.", authorId: admin.id }] }
              : undefined,
        },
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

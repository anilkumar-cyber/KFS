import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqForm } from "@/components/admin/faq-form";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { deleteFaq } from "@/lib/actions/faqs";

export const metadata: Metadata = { title: "Edit FAQ", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) notFound();

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/faqs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to FAQs
        </Link>
        <DeleteEntityButton id={faq.id} label={faq.question} entityName="FAQ" action={deleteFaq} redirectTo="/admin/faqs" />
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">{faq.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <FaqForm faq={faq} />
        </CardContent>
      </Card>
    </div>
  );
}

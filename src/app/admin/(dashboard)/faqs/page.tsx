import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { deleteFaq } from "@/lib/actions/faqs";

export const metadata: Metadata = { title: "FAQs", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{faqs.length} FAQs</p>
        <Button asChild>
          <Link href="/admin/faqs/new">
            <Plus className="size-3.5" /> New FAQ
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Question</th>
                  <th className="text-left font-semibold px-5 py-3">Category</th>
                  <th className="text-left font-semibold px-5 py-3">Order</th>
                  <th className="text-left font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {faqs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">
                      No FAQs yet.
                    </td>
                  </tr>
                )}
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3 max-w-md">
                      <Link href={`/admin/faqs/${faq.id}`} className="font-semibold hover:text-secondary hover:underline">
                        {faq.question}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{faq.answer}</p>
                    </td>
                    <td className="px-5 py-3 text-xs">
                      <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{faq.category}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{faq.order}</td>
                    <td className="px-5 py-3">
                      <DeleteEntityButton id={faq.id} label={faq.question} entityName="FAQ" action={deleteFaq} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

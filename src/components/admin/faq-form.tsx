"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createFaq, updateFaq, type FaqInput } from "@/lib/actions/faqs";
import type { Faq } from "@prisma/client";

const faqFormSchema = z.object({
  question: z.string().trim().min(3, "Question is required"),
  answer: z.string().trim().min(3, "Answer is required"),
  category: z.string().trim().min(1, "Category is required"),
  order: z
    .string()
    .trim()
    .min(1, "Order is required")
    .refine((v) => /^\d+$/.test(v), "Order must be 0 or greater"),
});

type FaqFormValues = z.infer<typeof faqFormSchema>;

export function FaqForm({ faq }: { faq?: Faq }) {
  const router = useRouter();
  const isEdit = !!faq;

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question: faq?.question ?? "",
      answer: faq?.answer ?? "",
      category: faq?.category ?? "",
      order: faq?.order != null ? String(faq.order) : "0",
    },
  });

  async function onSubmit(values: FaqFormValues) {
    const input: FaqInput = { ...values, order: Number(values.order) };
    try {
      if (isEdit && faq) {
        await updateFaq(faq.id, input);
        toast.success("FAQ updated");
      } else {
        await createFaq(input);
        toast.success("FAQ created");
      }
      router.push("/admin/faqs");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save FAQ");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Loans" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
            {isEdit ? "Save Changes" : "Create FAQ"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { createLoanProduct, updateLoanProduct } from "@/lib/actions/loans";
import { slugify } from "@/components/admin/slugify";
import { linesToArray, arrayToLines, parsePairLines, pairsToLines } from "@/components/admin/list-text-utils";
import type { LoanProduct } from "@prisma/client";

const formSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  name: z.string().trim().min(2, "Name is required"),
  shortName: z.string().trim().min(1, "Short name is required"),
  category: z.enum(["SECURED", "UNSECURED"]),
  tagline: z.string().trim().min(1, "Tagline is required"),
  description: z.string().trim().min(1, "Description is required"),
  icon: z.string().trim().min(1, "Icon name is required"),
  interestRate: z.string().trim().min(1, "Required"),
  maxAmount: z.string().trim().min(1, "Required"),
  maxTenure: z.string().trim().min(1, "Required"),
  processingTime: z.string().trim().min(1, "Required"),
  processingFee: z.string().trim().min(1, "Required"),
  benefits: z.string(),
  eligibility: z.string(),
  documents: z.string(),
  faqs: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

type FormValues = z.infer<typeof formSchema>;

function toDefaultValues(loanProduct?: LoanProduct): FormValues {
  const faqs = Array.isArray(loanProduct?.faqs) ? (loanProduct.faqs as { question: string; answer: string }[]) : [];
  return {
    slug: loanProduct?.slug ?? "",
    name: loanProduct?.name ?? "",
    shortName: loanProduct?.shortName ?? "",
    category: loanProduct?.category ?? "SECURED",
    tagline: loanProduct?.tagline ?? "",
    description: loanProduct?.description ?? "",
    icon: loanProduct?.icon ?? "",
    interestRate: loanProduct?.interestRate ?? "",
    maxAmount: loanProduct?.maxAmount ?? "",
    maxTenure: loanProduct?.maxTenure ?? "",
    processingTime: loanProduct?.processingTime ?? "",
    processingFee: loanProduct?.processingFee ?? "",
    benefits: arrayToLines(loanProduct?.benefits),
    eligibility: arrayToLines(loanProduct?.eligibility),
    documents: arrayToLines(loanProduct?.documents),
    faqs: pairsToLines(faqs.map((f) => ({ a: f.question, b: f.answer }))),
    status: loanProduct?.status ?? "DRAFT",
  };
}

export function LoanProductForm({ loanProduct }: { loanProduct?: LoanProduct }) {
  const router = useRouter();
  const isEdit = !!loanProduct;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: toDefaultValues(loanProduct),
  });

  function handleNameChange(value: string) {
    if (!isEdit && !form.formState.dirtyFields.slug) {
      form.setValue("slug", slugify(value));
    }
  }

  async function onSubmit(values: FormValues) {
    const payload = {
      slug: values.slug,
      name: values.name,
      shortName: values.shortName,
      category: values.category,
      tagline: values.tagline,
      description: values.description,
      icon: values.icon,
      interestRate: values.interestRate,
      maxAmount: values.maxAmount,
      maxTenure: values.maxTenure,
      processingTime: values.processingTime,
      processingFee: values.processingFee,
      benefits: linesToArray(values.benefits),
      eligibility: linesToArray(values.eligibility),
      documents: linesToArray(values.documents),
      faqs: parsePairLines(values.faqs).map((p) => ({ question: p.a, answer: p.b })),
      status: values.status,
    };

    try {
      if (isEdit) {
        await updateLoanProduct(loanProduct.id, payload);
        toast.success("Loan product updated");
      } else {
        await createLoanProduct(payload);
        toast.success("Loan product created");
      }
      router.push("/admin/loans");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      if (message.toLowerCase().includes("slug")) {
        form.setError("slug", { message });
      } else {
        toast.error(message);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Home Loan"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleNameChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="home-loan" {...field} />
                  </FormControl>
                  <FormDescription>Used in the public URL. Lowercase letters, numbers, hyphens.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Home Loan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={(v) => v && field.onChange(v)} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SECURED">Secured</SelectItem>
                      <SelectItem value="UNSECURED">Unsecured</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input placeholder="Home" {...field} />
                  </FormControl>
                  <FormDescription>Must be a valid lucide-react icon name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={(v) => v && field.onChange(v)} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input placeholder="Own your dream home sooner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Loan Terms</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="8.50% p.a. onwards" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Up to ₹5 Crore" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxTenure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Tenure</FormLabel>
                  <FormControl>
                    <Input placeholder="Up to 30 years" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="processingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing Time</FormLabel>
                  <FormControl>
                    <Input placeholder="7-10 working days" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="processingFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing Fee</FormLabel>
                  <FormControl>
                    <Input placeholder="Up to 1% of loan amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Lists &amp; FAQs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormDescription>One benefit per line.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eligibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eligibility</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormDescription>One eligibility criterion per line.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documents</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormDescription>One required document per line.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faqs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FAQs</FormLabel>
                  <FormControl>
                    <Textarea rows={6} {...field} />
                  </FormControl>
                  <FormDescription>
                    One FAQ per line, formatted as <code>question :: answer</code>. Malformed lines are ignored.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/loans")}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {isEdit ? "Save Changes" : "Create Loan Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

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
import { createTaxService, updateTaxService } from "@/lib/actions/tax-services";
import { slugify } from "@/components/admin/slugify";
import { linesToArray, arrayToLines, parsePairLines, pairsToLines } from "@/components/admin/list-text-utils";
import type { TaxService } from "@prisma/client";

const formSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  name: z.string().trim().min(2, "Name is required"),
  tagline: z.string().trim().min(1, "Tagline is required"),
  description: z.string().trim().min(1, "Description is required"),
  icon: z.string().trim().min(1, "Icon name is required"),
  price: z.string().trim().min(1, "Required"),
  timeline: z.string().trim().min(1, "Required"),
  benefits: z.string(),
  process: z.string(),
  documents: z.string(),
  faqs: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

type FormValues = z.infer<typeof formSchema>;

function toDefaultValues(taxService?: TaxService): FormValues {
  const faqs = Array.isArray(taxService?.faqs) ? (taxService.faqs as { question: string; answer: string }[]) : [];
  const process = Array.isArray(taxService?.process)
    ? (taxService.process as { step: string; description: string }[])
    : [];
  return {
    slug: taxService?.slug ?? "",
    name: taxService?.name ?? "",
    tagline: taxService?.tagline ?? "",
    description: taxService?.description ?? "",
    icon: taxService?.icon ?? "",
    price: taxService?.price ?? "",
    timeline: taxService?.timeline ?? "",
    benefits: arrayToLines(taxService?.benefits),
    process: pairsToLines(process.map((p) => ({ a: p.step, b: p.description }))),
    documents: arrayToLines(taxService?.documents),
    faqs: pairsToLines(faqs.map((f) => ({ a: f.question, b: f.answer }))),
    status: taxService?.status ?? "DRAFT",
  };
}

export function TaxServiceForm({ taxService }: { taxService?: TaxService }) {
  const router = useRouter();
  const isEdit = !!taxService;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: toDefaultValues(taxService),
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
      tagline: values.tagline,
      description: values.description,
      icon: values.icon,
      price: values.price,
      timeline: values.timeline,
      benefits: linesToArray(values.benefits),
      process: parsePairLines(values.process).map((p) => ({ step: p.a, description: p.b })),
      documents: linesToArray(values.documents),
      faqs: parsePairLines(values.faqs).map((p) => ({ question: p.a, answer: p.b })),
      status: values.status,
    };

    try {
      if (isEdit) {
        await updateTaxService(taxService.id, payload);
        toast.success("Tax service updated");
      } else {
        await createTaxService(payload);
        toast.success("Tax service created");
      }
      router.push("/admin/tax-services");
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
                      placeholder="Income Tax Filing"
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
                    <Input placeholder="income-tax-filing" {...field} />
                  </FormControl>
                  <FormDescription>Used in the public URL. Lowercase letters, numbers, hyphens.</FormDescription>
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
                    <Input placeholder="FileCheck2" {...field} />
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Starting at ₹999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeline</FormLabel>
                  <FormControl>
                    <Input placeholder="2-3 working days" {...field} />
                  </FormControl>
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
                    <Input placeholder="Hassle-free tax filing" {...field} />
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
            <CardTitle className="text-base">Lists, Process &amp; FAQs</CardTitle>
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
              name="process"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Process</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormDescription>
                    One step per line, formatted as <code>step :: description</code>. Malformed lines are ignored.
                  </FormDescription>
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
          <Button type="button" variant="outline" onClick={() => router.push("/admin/tax-services")}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {isEdit ? "Save Changes" : "Create Tax Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

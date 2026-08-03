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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createAuctionProperty, updateAuctionProperty, type AuctionPropertyInput } from "@/lib/actions/auction-properties";
import type { AuctionProperty, ContentStatus } from "@prisma/client";

function toDateInputValue(date: Date | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

const auctionPropertyFormSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  bank: z.string().trim().min(1, "Bank is required"),
  location: z.string().trim().min(1, "Location is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  reservePrice: z
    .string()
    .trim()
    .min(1, "Reserve price is required")
    .refine((v) => /^\d+$/.test(v) && Number(v) > 0, "Enter a valid reserve price"),
  reservePriceLabel: z.string().trim().min(1, "Reserve price label is required"),
  emdAmount: z.string().trim().min(1, "EMD amount is required"),
  auctionDate: z.string().trim().min(1, "Auction date is required"),
  propertyType: z.string().trim().min(1, "Property type is required"),
  areaSqft: z
    .string()
    .trim()
    .min(1, "Area is required")
    .refine((v) => /^\d+$/.test(v) && Number(v) > 0, "Enter a valid area"),
  image: z.string().trim().min(1, "Image URL is required"),
  description: z.string().trim().min(1, "Description is required"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

type AuctionPropertyFormValues = z.infer<typeof auctionPropertyFormSchema>;

export function AuctionPropertyForm({ auctionProperty }: { auctionProperty?: AuctionProperty }) {
  const router = useRouter();
  const isEdit = !!auctionProperty;

  const form = useForm<AuctionPropertyFormValues>({
    resolver: zodResolver(auctionPropertyFormSchema),
    defaultValues: {
      title: auctionProperty?.title ?? "",
      bank: auctionProperty?.bank ?? "",
      location: auctionProperty?.location ?? "",
      city: auctionProperty?.city ?? "",
      state: auctionProperty?.state ?? "",
      reservePrice: auctionProperty?.reservePrice != null ? String(auctionProperty.reservePrice) : "",
      reservePriceLabel: auctionProperty?.reservePriceLabel ?? "",
      emdAmount: auctionProperty?.emdAmount ?? "",
      auctionDate: toDateInputValue(auctionProperty?.auctionDate),
      propertyType: auctionProperty?.propertyType ?? "",
      areaSqft: auctionProperty?.areaSqft != null ? String(auctionProperty.areaSqft) : "",
      image: auctionProperty?.image ?? "",
      description: auctionProperty?.description ?? "",
      status: auctionProperty?.status ?? "DRAFT",
    },
  });

  async function onSubmit(values: AuctionPropertyFormValues) {
    const input: AuctionPropertyInput = {
      title: values.title,
      bank: values.bank,
      location: values.location,
      city: values.city,
      state: values.state,
      reservePrice: Number(values.reservePrice),
      reservePriceLabel: values.reservePriceLabel,
      emdAmount: values.emdAmount,
      auctionDate: new Date(values.auctionDate),
      propertyType: values.propertyType,
      areaSqft: Number(values.areaSqft),
      image: values.image,
      description: values.description,
      status: values.status as ContentStatus,
    };

    try {
      if (isEdit && auctionProperty) {
        await updateAuctionProperty(auctionProperty.id, input);
        toast.success("Auction property updated");
      } else {
        await createAuctionProperty(input);
        toast.success("Auction property created");
      }
      router.push("/admin/auction-properties");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save auction property");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="reservePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reserve Price (INR)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reservePriceLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reserve Price Label</FormLabel>
                <FormControl>
                  <Input placeholder="₹42 Lakhs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="emdAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>EMD Amount</FormLabel>
                <FormControl>
                  <Input placeholder="₹2,00,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="auctionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auction Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <FormControl>
                  <Input placeholder="Residential Plot" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="areaSqft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area (sq ft)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
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
                <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
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
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
            {isEdit ? "Save Changes" : "Create Auction Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

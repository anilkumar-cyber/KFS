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
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { createProperty, updateProperty, type PropertyInput } from "@/lib/actions/properties";
import type { ContentStatus, Property } from "@prisma/client";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function linesToArray(value: string | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseNearbyPlaces(value: string | undefined): { name: string; distance: string }[] {
  return linesToArray(value)
    .map((line) => {
      const [name, distance] = line.split("::").map((s) => s.trim());
      if (!name || !distance) return null;
      return { name, distance };
    })
    .filter((v): v is { name: string; distance: string } => v !== null);
}

function nearbyPlacesToText(places: unknown): string {
  if (!Array.isArray(places)) return "";
  return places
    .map((p) => {
      if (p && typeof p === "object" && "name" in p && "distance" in p) {
        const entry = p as { name: unknown; distance: unknown };
        return `${entry.name} :: ${entry.distance}`;
      }
      return null;
    })
    .filter((v): v is string => v !== null)
    .join("\n");
}

const propertyFormSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  title: z.string().trim().min(2, "Title is required"),
  type: z.string().trim().min(1, "Type is required"),
  typeLabel: z.string().trim().min(1, "Type label is required"),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((v) => /^\d+$/.test(v) && Number(v) > 0, "Enter a valid price"),
  priceLabel: z.string().trim().min(1, "Price label is required"),
  location: z.string().trim().min(1, "Location is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  areaSqft: z
    .string()
    .trim()
    .min(1, "Area is required")
    .refine((v) => /^\d+$/.test(v) && Number(v) > 0, "Enter a valid area"),
  bedrooms: z.string().trim().optional(),
  bathrooms: z.string().trim().optional(),
  bankLoanAvailable: z.boolean(),
  featured: z.boolean(),
  images: z.string().optional(),
  description: z.string().trim().min(1, "Description is required"),
  amenities: z.string().optional(),
  nearbyPlaces: z.string().optional(),
  lat: z
    .string()
    .trim()
    .min(1, "Latitude is required")
    .refine((v) => !Number.isNaN(Number(v)), "Enter a valid latitude"),
  lng: z
    .string()
    .trim()
    .min(1, "Longitude is required")
    .refine((v) => !Number.isNaN(Number(v)), "Enter a valid longitude"),
  reraId: z.string().trim().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

export function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter();
  const isEdit = !!property;
  const slugEditedRef = React.useRef(isEdit);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      slug: property?.slug ?? "",
      title: property?.title ?? "",
      type: property?.type ?? "",
      typeLabel: property?.typeLabel ?? "",
      price: property?.price != null ? String(property.price) : "",
      priceLabel: property?.priceLabel ?? "",
      location: property?.location ?? "",
      city: property?.city ?? "",
      state: property?.state ?? "",
      areaSqft: property?.areaSqft != null ? String(property.areaSqft) : "",
      bedrooms: property?.bedrooms != null ? String(property.bedrooms) : "",
      bathrooms: property?.bathrooms != null ? String(property.bathrooms) : "",
      bankLoanAvailable: property?.bankLoanAvailable ?? false,
      featured: property?.featured ?? false,
      images: property?.images.join("\n") ?? "",
      description: property?.description ?? "",
      amenities: property?.amenities.join("\n") ?? "",
      nearbyPlaces: nearbyPlacesToText(property?.nearbyPlaces),
      lat: property?.lat != null ? String(property.lat) : "",
      lng: property?.lng != null ? String(property.lng) : "",
      reraId: property?.reraId ?? "",
      status: property?.status ?? "DRAFT",
    },
  });

  async function onSubmit(values: PropertyFormValues) {
    const input: PropertyInput = {
      slug: values.slug,
      title: values.title,
      type: values.type,
      typeLabel: values.typeLabel,
      price: Number(values.price),
      priceLabel: values.priceLabel,
      location: values.location,
      city: values.city,
      state: values.state,
      areaSqft: Number(values.areaSqft),
      bedrooms: values.bedrooms && values.bedrooms.trim() !== "" ? Number(values.bedrooms) : null,
      bathrooms: values.bathrooms && values.bathrooms.trim() !== "" ? Number(values.bathrooms) : null,
      bankLoanAvailable: values.bankLoanAvailable,
      featured: values.featured,
      images: linesToArray(values.images),
      description: values.description,
      amenities: linesToArray(values.amenities),
      nearbyPlaces: parseNearbyPlaces(values.nearbyPlaces),
      lat: Number(values.lat),
      lng: Number(values.lng),
      reraId: values.reraId && values.reraId.trim() !== "" ? values.reraId.trim() : null,
      status: values.status as ContentStatus,
    };

    try {
      if (isEdit && property) {
        await updateProperty(property.id, input);
        toast.success("Property updated");
        router.push("/admin/properties");
      } else {
        const created = await createProperty(input);
        toast.success("Property created");
        router.push(`/admin/properties/${created.id}`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save property");
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
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      if (!slugEditedRef.current) {
                        form.setValue("slug", slugify(e.target.value));
                      }
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
                  <Input
                    {...field}
                    onChange={(e) => {
                      slugEditedRef.current = true;
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>Used in the public listing URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="apartment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type Label</FormLabel>
                <FormControl>
                  <Input placeholder="Apartment" {...field} />
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

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (INR)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Label</FormLabel>
                <FormControl>
                  <Input placeholder="₹85 Lakhs" {...field} />
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

        <div className="grid sm:grid-cols-3 gap-4">
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
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms (optional)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms (optional)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="lat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input type="number" step="any" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lng"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input type="number" step="any" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="reraId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RERA ID (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="bankLoanAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2.5">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
                </FormControl>
                <FormLabel className="!mt-0">Bank loan available</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2.5">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
                </FormControl>
                <FormLabel className="!mt-0">Featured</FormLabel>
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="One image URL per line" {...field} />
              </FormControl>
              <FormDescription>One image URL per line.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="One amenity per line" {...field} />
              </FormControl>
              <FormDescription>One amenity per line.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nearbyPlaces"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nearby Places</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Airport :: 8 km" {...field} />
              </FormControl>
              <FormDescription>One place per line, formatted as &quot;Name :: Distance&quot;.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
            {isEdit ? "Save Changes" : "Create Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { leadFormSchema, type LeadFormValues } from "@/lib/validation/lead";
import { cn } from "@/lib/utils";

export function LeadForm({
  interestOptions,
  defaultInterest,
  source,
  title = "Get a Free Consultation",
  description = "Share your details and our team will get back to you within 24 hours.",
  compact = false,
  className,
}: {
  interestOptions: { value: string; label: string }[];
  defaultInterest?: string;
  source: string;
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
}) {
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      interest: defaultInterest ?? interestOptions[0]?.value ?? "",
      message: "",
      source,
      company: "",
    },
  });

  async function onSubmit(values: LeadFormValues) {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }
      setSubmitted(true);
      toast.success("Thank you! Our team will contact you shortly.");
      form.reset({ ...form.getValues(), name: "", phone: "", email: "", city: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className={cn("flex flex-col items-center justify-center text-center gap-2 rounded-2xl bg-accent/10 p-8", className)}>
        <div className="flex size-12 items-center justify-center rounded-full bg-accent text-white">
          <Send className="size-5" />
        </div>
        <h3 className="text-lg font-bold">Request Received!</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Thank you for reaching out. A Kavya Financial Services expert will call you within 24 hours.
        </p>
        <Button variant="link" onClick={() => setSubmitted(false)} className="text-secondary">
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {(title || description) && !compact && (
        <div className="mb-5">
          {title && <h3 className="text-xl font-bold font-heading">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...form.register("company")} />

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="98765 43210" inputMode="numeric" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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
                  <FormLabel>City (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Hyderabad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I'm interested in</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {interestOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {!compact && (
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a bit more about your requirement..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold"
          >
            {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            Submit Request
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            By submitting, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-secondary">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="underline hover:text-secondary">
              Terms
            </a>
            .
          </p>
        </form>
      </Form>
    </div>
  );
}

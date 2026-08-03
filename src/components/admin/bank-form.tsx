"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createBank, updateBank, type BankInput } from "@/lib/actions/banks";
import type { PartnerBank } from "@prisma/client";

const bankFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  shortName: z.string().trim().min(1, "Short name is required"),
  type: z.string().trim().min(1, "Type is required"),
  order: z
    .string()
    .trim()
    .min(1, "Order is required")
    .refine((v) => /^\d+$/.test(v), "Order must be 0 or greater"),
});

type BankFormValues = z.infer<typeof bankFormSchema>;

export function BankForm({ bank }: { bank?: PartnerBank }) {
  const router = useRouter();
  const isEdit = !!bank;

  const form = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      name: bank?.name ?? "",
      shortName: bank?.shortName ?? "",
      type: bank?.type ?? "",
      order: bank?.order != null ? String(bank.order) : "0",
    },
  });

  async function onSubmit(values: BankFormValues) {
    const input: BankInput = { ...values, order: Number(values.order) };
    try {
      if (isEdit && bank) {
        await updateBank(bank.id, input);
        toast.success("Partner bank updated");
      } else {
        await createBank(input);
        toast.success("Partner bank created");
      }
      router.push("/admin/banks");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save partner bank");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="State Bank of India" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="shortName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Name</FormLabel>
                <FormControl>
                  <Input placeholder="SBI" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Public Sector Bank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
            {isEdit ? "Save Changes" : "Create Bank"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

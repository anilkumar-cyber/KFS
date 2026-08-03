import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email address").optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  interest: z.string().trim().min(1, "Please select an option"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  company: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

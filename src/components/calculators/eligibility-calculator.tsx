"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PartyPopper, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { calculateEligibility, formatINRFull, type EligibilityInput } from "@/lib/calculators";
import { cn } from "@/lib/utils";

const schema = z.object({
  monthlyIncome: z.number().min(5000, "Enter a valid monthly income"),
  occupation: z.enum(["salaried", "self-employed", "professional", "business-owner"]),
  age: z.number().min(21, "Minimum age is 21").max(65, "Maximum age is 65"),
  currentEmi: z.number().min(0),
  creditScore: z.number().min(300).max(900),
  loanType: z.enum(["home", "personal", "business", "car", "education", "loan-against-property"]),
});

type FormValues = z.infer<typeof schema>;

const loanTypeLabels: Record<EligibilityInput["loanType"], string> = {
  home: "Home Loan",
  "loan-against-property": "Loan Against Property",
  personal: "Personal Loan",
  business: "Business Loan",
  car: "Car Loan",
  education: "Education Loan",
};

export function EligibilityCalculator({ defaultLoanType = "home" as EligibilityInput["loanType"], className }: { defaultLoanType?: EligibilityInput["loanType"]; className?: string }) {
  const [result, setResult] = React.useState<ReturnType<typeof calculateEligibility> | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      monthlyIncome: 60000,
      occupation: "salaried",
      age: 30,
      currentEmi: 0,
      creditScore: 750,
      loanType: defaultLoanType,
    },
  });

  function onSubmit(values: FormValues) {
    setResult(calculateEligibility(values));
  }

  return (
    <Card className={cn("border-border/80 shadow-premium rounded-3xl overflow-hidden", className)}>
      <CardContent className="p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="loanType"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Loan Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(loanTypeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="60000"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="business-owner">Business Owner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="30"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentEmi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Monthly EMI (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="creditScore"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Credit Score (CIBIL)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="750"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="sm:col-span-2 rounded-full bg-accent hover:bg-accent/90 text-white font-semibold">
              <Sparkles className="size-4" /> Check My Eligibility
            </Button>
          </form>
        </Form>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 rounded-2xl bg-hero-gradient p-6 text-white text-center"
          >
            <PartyPopper className="mx-auto size-7 text-gold mb-2" />
            <p className="text-sm text-white/70 mb-1">You are likely eligible for a loan up to</p>
            <p className="text-3xl sm:text-4xl font-bold font-heading text-gradient-gold">
              {formatINRFull(result.eligibleAmount)}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-left">
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-xs text-white/60">Max EMI Capacity</p>
                <p className="text-sm font-semibold">{formatINRFull(result.maxEmiCapacity)}/mo</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-xs text-white/60">Suggested Tenure</p>
                <p className="text-sm font-semibold">{result.maxTenureYears} Years</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/50">
              *Indicative estimate. Final eligibility depends on lender assessment & document verification.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

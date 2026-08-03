"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { EmiCalculator } from "@/components/calculators/emi-calculator";
import { EligibilityCalculator } from "@/components/calculators/eligibility-calculator";
import { Button } from "@/components/ui/button";

export function CalculatorsSection() {
  return (
    <section className="py-20 sm:py-28 bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="Smart Tools"
          title="Plan Your Finances in Seconds"
          description="Use our free calculators to estimate your EMI or check your loan eligibility before you apply."
        />

        <div className="mt-10 max-w-4xl mx-auto">
          <Tabs defaultValue="emi">
            <TabsList className="mx-auto mb-6 rounded-full bg-background p-1 h-auto">
              <TabsTrigger value="emi" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                EMI Calculator
              </TabsTrigger>
              <TabsTrigger value="eligibility" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Eligibility Checker
              </TabsTrigger>
            </TabsList>
            <TabsContent value="emi">
              <EmiCalculator />
              <div className="mt-4 text-center">
                <Button asChild variant="link" className="text-secondary">
                  <Link href="/emi-calculator">
                    Open full EMI calculator <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="eligibility">
              <EligibilityCalculator />
              <div className="mt-4 text-center">
                <Button asChild variant="link" className="text-secondary">
                  <Link href="/eligibility-calculator">
                    Open full eligibility checker <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </section>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RTooltip } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { calculateEmi, formatINRFull, formatINR } from "@/lib/calculators";
import { cn } from "@/lib/utils";

const COLORS = ["var(--color-navy)", "var(--color-gold)"];

export function EmiCalculator({
  defaultPrincipal = 3000000,
  defaultRate = 8.35,
  defaultTenure = 20,
  minPrincipal = 100000,
  maxPrincipal = 20000000,
  compact = false,
  className,
}: {
  defaultPrincipal?: number;
  defaultRate?: number;
  defaultTenure?: number;
  minPrincipal?: number;
  maxPrincipal?: number;
  compact?: boolean;
  className?: string;
}) {
  const [principal, setPrincipal] = React.useState(defaultPrincipal);
  const [rate, setRate] = React.useState(defaultRate);
  const [tenure, setTenure] = React.useState(defaultTenure);
  const [showSchedule, setShowSchedule] = React.useState(false);

  const result = React.useMemo(() => calculateEmi(principal, rate, tenure), [principal, rate, tenure]);

  const pieData = [
    { name: "Principal", value: principal },
    { name: "Interest", value: result.totalInterest },
  ];

  const yearlySchedule = React.useMemo(() => {
    const rows: { year: number; principal: number; interest: number; balance: number }[] = [];
    result.schedule.forEach((m, idx) => {
      const yearIdx = Math.floor(idx / 12);
      if (!rows[yearIdx]) rows[yearIdx] = { year: yearIdx + 1, principal: 0, interest: 0, balance: m.balance };
      rows[yearIdx].principal += m.principal;
      rows[yearIdx].interest += m.interest;
      rows[yearIdx].balance = m.balance;
    });
    return rows;
  }, [result.schedule]);

  return (
    <Card className={cn("border-border/80 shadow-premium rounded-3xl overflow-hidden", className)}>
      <CardContent className={cn("grid gap-8 lg:grid-cols-2", compact ? "p-5 sm:p-6" : "p-6 sm:p-8")}>
        <div className="flex flex-col gap-7">
          <SliderField
            label="Loan Amount"
            value={principal}
            display={formatINR(principal)}
            onChange={setPrincipal}
            min={minPrincipal}
            max={maxPrincipal}
            step={10000}
          />
          <SliderField
            label="Interest Rate (p.a.)"
            value={rate}
            display={`${rate.toFixed(2)}%`}
            onChange={setRate}
            min={5}
            max={20}
            step={0.05}
          />
          <SliderField
            label="Loan Tenure"
            value={tenure}
            display={`${tenure} Yrs`}
            onChange={setTenure}
            min={1}
            max={30}
            step={1}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="relative flex items-center justify-center">
            <div className="h-[190px] w-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={62}
                    outerRadius={90}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <RTooltip formatter={(v) => formatINRFull(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-xs text-muted-foreground font-medium">Monthly EMI</span>
              <motion.span
                key={result.emi}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl font-bold text-primary dark:text-white font-heading"
              >
                {formatINRFull(result.emi)}
              </motion.span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatBox label="Principal Amount" value={formatINRFull(principal)} dot="bg-navy" />
            <StatBox label="Total Interest" value={formatINRFull(result.totalInterest)} dot="bg-gold" />
            <StatBox label="Total Payment" value={formatINRFull(result.totalAmount)} className="col-span-2" />
          </div>

          <button
            onClick={() => setShowSchedule((s) => !s)}
            className="text-sm font-semibold text-secondary hover:underline text-left"
          >
            {showSchedule ? "Hide" : "View"} yearly payment schedule
          </button>
        </div>

        {showSchedule && (
          <div className="lg:col-span-2 -mx-1 overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Principal Paid</TableHead>
                  <TableHead>Interest Paid</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearlySchedule.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell className="font-medium">{row.year}</TableCell>
                    <TableCell>{formatINRFull(row.principal)}</TableCell>
                    <TableCell>{formatINRFull(row.interest)}</TableCell>
                    <TableCell className="text-right">{formatINRFull(row.balance)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SliderField({
  label,
  value,
  display,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  display: string;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-muted-foreground font-medium">{label}</Label>
        <Input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-28 h-8 text-right text-sm font-semibold"
        />
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
      />
      <span className="text-xs text-muted-foreground">{display}</span>
    </div>
  );
}

function StatBox({ label, value, dot, className }: { label: string; value: string; dot?: string; className?: string }) {
  return (
    <div className={cn("rounded-xl bg-muted/60 p-3.5", className)}>
      <div className="flex items-center gap-1.5 mb-1">
        {dot && <span className={cn("size-2 rounded-full", dot)} />}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-sm sm:text-base font-bold text-foreground">{value}</p>
    </div>
  );
}

// Shared helpers for the "one item per line" Textarea convention used across
// the admin content forms (Loan Products, Tax Services, Blog Posts, Testimonials).

/** Split a Textarea's raw text into a trimmed, non-empty string array — one entry per line. */
export function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/** Join a string array back into the Textarea's "one item per line" representation. */
export function arrayToLines(items: string[] | null | undefined): string {
  return (items ?? []).join("\n");
}

/**
 * Parse "left :: right" pair lines (used for FAQs `question :: answer` and
 * TaxService process `step :: description`). Malformed or empty lines are skipped
 * rather than throwing, per the pragmatic-form-handling approach for this project.
 */
export function parsePairLines(text: string): { a: string; b: string }[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const idx = line.indexOf(" :: ");
      if (idx === -1) return null;
      const a = line.slice(0, idx).trim();
      const b = line.slice(idx + 4).trim();
      if (!a || !b) return null;
      return { a, b };
    })
    .filter((pair): pair is { a: string; b: string } => pair !== null);
}

/** Serialize an array of {a,b} pairs back into "a :: b" lines. */
export function pairsToLines(pairs: { a: string; b: string }[]): string {
  return pairs.map((p) => `${p.a} :: ${p.b}`).join("\n");
}

/**
 * Cross-feature global types. Feature-specific types live in
 * features/<feature>/types.ts instead — only put something here if it's
 * genuinely shared across more than one feature (e.g. a Money value object).
 */

export interface Money {
  amount: number;
  currency: "BDT" | "USD";
}

export type Locale = "en" | "bn";

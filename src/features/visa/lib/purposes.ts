import type { VisaPurpose } from "@/features/visa/types";

export const VISA_PURPOSES: { value: VisaPurpose; label: string }[] = [
  { value: "tourist", label: "Tourist Visa" },
  { value: "business", label: "Business Visa" },
  { value: "student", label: "Student Visa" },
  { value: "work", label: "Work Visa" },
  { value: "transit", label: "Transit Visa" },
  { value: "medical", label: "Medical Visa" },
  { value: "family", label: "Family Visit Visa" },
];

export function isVisaPurpose(value: string | null | undefined): value is VisaPurpose {
  return VISA_PURPOSES.some((p) => p.value === value);
}

export function getPurposeLabel(value: VisaPurpose): string {
  return VISA_PURPOSES.find((p) => p.value === value)?.label ?? value;
}
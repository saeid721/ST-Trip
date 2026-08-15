"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/Button";

type IdentityType = "passport" | "nid";
type PassportType = "mrp" | "e-passport";

const identityOptions: { value: IdentityType; label: string }[] = [
  { value: "passport", label: "Passport" },
  { value: "nid", label: "NID" },
];

const passportOptions: { value: PassportType; label: string }[] = [
  { value: "mrp", label: "MRP" },
  { value: "e-passport", label: "E-Passport" },
];

export function HajjSearchTab() {
  const router = useRouter();
  const [identityType, setIdentityType] = useState<IdentityType>("passport");
  const [passportType, setPassportType] = useState<PassportType>("mrp");
  const [passportNo, setPassportNo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ identityType, passportType, passportNo });
    router.push(`/hajj/pre-registration?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-[1.3fr_1.3fr_1.6fr_auto] md:items-end">
      <fieldset>
        <legend className="mb-1.5 text-xs font-medium text-neutral-500">Identity Type</legend>
        <div className="flex flex-wrap gap-4">
          {identityOptions.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-700"
            >
              <input
                type="radio"
                name="identityType"
                value={option.value}
                checked={identityType === option.value}
                onChange={() => setIdentityType(option.value)}
                className="h-4 w-4 accent-primary-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1.5 text-xs font-medium text-neutral-500">Passport Type</legend>
        <div className="flex flex-wrap gap-4">
          {passportOptions.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-700"
            >
              <input
                type="radio"
                name="passportType"
                value={option.value}
                checked={passportType === option.value}
                onChange={() => setPassportType(option.value)}
                className="h-4 w-4 accent-primary-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="passportNo" className="mb-1 block text-xs font-medium text-neutral-500">
          Passport No.
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
          <IdCard className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
          <input
            id="passportNo"
            type="text"
            value={passportNo}
            onChange={(e) => setPassportNo(e.target.value)}
            placeholder="Enter passport number"
            className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" className="gap-2">
        Pre-register Now!
      </Button>
    </form>
  );
}
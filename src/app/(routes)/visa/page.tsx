import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa",
};

export default function VisaPage() {
  return (
    <div className="container-app py-24 pt-[calc(var(--header-height)+3rem)] text-center">
      <h1 className="font-heading text-3xl font-bold text-neutral-900">
        Visa — coming soon
      </h1>
      <p className="mt-3 text-neutral-500">
        This page will host visa requirement lookup and application assistance.
      </p>
    </div>
  );
}

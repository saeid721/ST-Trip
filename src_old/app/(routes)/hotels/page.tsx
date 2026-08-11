import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotels",
};

export default function HotelsPage() {
  return (
    <div className="container-app py-24 pt-[calc(var(--header-height)+3rem)] text-center">
      <h1 className="font-heading text-3xl font-bold text-neutral-900">
        Hotels — coming soon
      </h1>
      <p className="mt-3 text-neutral-500">
        This page will host the hotel search results experience.
      </p>
    </div>
  );
}

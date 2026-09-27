import Link from "next/link";
import { ArrowRight, Headset, LockKeyhole, MapPinned, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items = [
  {
    icon: MapPinned,
    title: "Everything in one place",
    description: "Search flights, hotels, tours, visa assistance, Umrah, Hajj and eSIM from one travel platform.",
  },
  {
    icon: Sparkles,
    title: "Clear choices, less friction",
    description: "Focused search flows, useful filters and simple booking steps keep the journey easy to understand.",
  },
  {
    icon: LockKeyhole,
    title: "Secure booking experience",
    description: "Designed around secure payments, clear booking details and practical support throughout your trip.",
  },
  {
    icon: Headset,
    title: "Human support when needed",
    description: `Need help? Contact the ST Trip team at ${siteConfig.contact.supportPhoneDisplay}.`,
  },
];

export function WhyStTripSection() {
  return (
    <section aria-labelledby="why-sttrip-heading" className="home-section home-section-muted py-16 sm:py-20 lg:py-24">
      <div className="container-app">
        <SectionHeading
          id="why-sttrip-heading"
          eyebrow="Travel with confidence"
          title="A simpler way to plan your journey"
          description="ST Trip brings the essentials of modern travel booking into one focused experience."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, description }) => (
            <article key={title} className="premium-feature-card group">
              <span className="premium-feature-icon">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-heading text-base font-semibold text-neutral-950 sm:text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:justify-start">
          <Link href="/about" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-900 transition hover:border-primary-300 hover:text-primary-700">
            Learn more about ST Trip
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

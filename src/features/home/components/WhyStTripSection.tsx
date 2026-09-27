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
    <section
      aria-labelledby="why-sttrip-heading"
      className="home-section home-section-muted relative overflow-hidden py-10 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent-100/50 blur-3xl"
      />
      <div className="container-app relative">
        <SectionHeading
          id="why-sttrip-heading"
          eyebrow="Travel with confidence"
          title="A simpler way to plan your journey"
          description="ST Trip brings the essentials of modern travel booking into one focused experience."
        />

        <div className="mt-5 grid grid-cols-1 gap-3 md:mt-0 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5">
          {items.map(({ icon: Icon, title, description }, i) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-primary-300 hover:shadow-[0_20px_36px_-14px_rgba(37,99,235,0.22)] md:p-6"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-3 font-heading text-6xl font-black text-neutral-50 transition-colors duration-300 group-hover:text-primary-50"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative flex items-center gap-3 md:block">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 text-white shadow-md shadow-primary-600/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 md:h-12 md:w-12">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
                </span>
                <h3 className="font-heading text-sm font-semibold text-neutral-950 md:mt-5 md:text-base lg:text-lg">
                  {title}
                </h3>
              </div>
              <p className="relative mt-2 text-xs leading-5 text-neutral-600 md:text-sm md:leading-6">{description}</p>

              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full"
              />
            </article>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <Link href="/about" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-900 transition hover:border-primary-300 hover:text-primary-700">
            Learn more about ST Trip
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

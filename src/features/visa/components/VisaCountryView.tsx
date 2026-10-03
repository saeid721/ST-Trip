import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { VisaFlag } from "@/features/visa/components/VisaFlag";
import {
  VisaApplyCta,
  VisaDocuments,
  VisaExtraSections,
  VisaFees,
  VisaProcess,
  VisaPurposeNotice,
  VisaSectionNav,
} from "@/features/visa/components/VisaCountryDetails";
import {
  CATEGORY_SUMMARY,
  GENERIC_PROCESS_STEPS,
  POPULAR_SLUGS,
  VISA_CATEGORY_LABELS,
  getDestinationDocs,
  getRelatedDestinations,
} from "@/features/visa/data/visa-destinations";
import { visaPhoneHref, visaWhatsAppHref } from "@/features/visa/lib/links";
import { getPurposeLabel } from "@/features/visa/lib/purposes";
import type { VisaDestination, VisaGuide } from "@/features/visa/types";

const SCROLL_OFFSET = "scroll-mt-[calc(var(--header-height-mobile)+4.5rem)]";

export function VisaCountryView({ destination }: { destination: VisaDestination }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Visa", item: `${siteConfig.url}/visa` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${destination.name} visa`,
        item: `${siteConfig.url}/visa/${destination.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {destination.guide ? (
        <GuideLayout destination={destination} guide={destination.guide} />
      ) : (
        <SummaryLayout destination={destination} />
      )}
    </>
  );
}

/* ========================================================================== */
/* Full guide layout                                                          */
/* ========================================================================== */

function GuideLayout({ destination, guide }: { destination: VisaDestination; guide: VisaGuide }) {
  const purposeLabel = getPurposeLabel(guide.purposes[0] ?? "tourist");
  const isPopular = POPULAR_SLUGS.includes(destination.slug);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "documents", label: "Documents" },
    { id: "fees", label: "Fees" },
    { id: "process", label: "Process" },
    ...(guide.samples.length > 0 ? [{ id: "samples", label: "Samples" }] : []),
    { id: "about", label: `About ${destination.name}` },
    { id: "travel-rules", label: "Travel rules" },
    ...(guide.embassies.length > 0 ? [{ id: "embassy", label: "Embassy" }] : []),
  ];

  return (
    <>
      <VisaSectionNav sections={sections} />

      <main className="container-app py-8 sm:py-12">
        <div className="empty:hidden">
          <Suspense fallback={null}>
            <VisaPurposeNotice destination={destination} supported={guide.purposes} />
          </Suspense>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.8fr)] lg:gap-8">
          <div className="min-w-0 space-y-5 sm:space-y-7">
            <section
              id="overview"
              className={`${SCROLL_OFFSET} overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm`}
            >
              <div className="border-b border-neutral-200 bg-primary-50 px-4 py-4 sm:px-7">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-700">Visa guide</p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="flex items-center gap-2.5 font-heading text-xl font-bold text-neutral-900 sm:text-2xl">
                    <VisaFlag code={destination.code} name={destination.name} className="h-6 w-9" />
                    {destination.name} {purposeLabel.toLowerCase()}
                  </h2>
                  {isPopular && (
                    <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
                      Popular choice
                    </span>
                  )}
                </div>
              </div>
              <div className="px-4 py-5 sm:px-7 sm:py-6">
                <p className="max-w-3xl text-sm leading-6 text-neutral-600">{guide.overview.intro}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {guide.facts.map((fact) => (
                    <Fact key={fact.label} label={fact.label} value={fact.value} />
                  ))}
                </div>
                <VisaApplyCta destination={destination} guide={guide} />
              </div>
            </section>

            <GuideSection title="Eligibility to apply" eyebrow="Before you begin">
              <ul className="grid gap-3 sm:grid-cols-2">
                {guide.eligibility.map((item) => (
                  <ChecklistItem key={item}>{item}</ChecklistItem>
                ))}
              </ul>
            </GuideSection>

            <VisaDocuments destination={destination} professions={guide.professions} />
            <VisaFees fees={guide.fees} />
            <VisaProcess processing={guide.processing} />
            <VisaExtraSections guide={guide} countryName={destination.name} />
          </div>

          <aside className="space-y-6">
            <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
              <div className="bg-primary-700 px-5 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Country information</p>
                <h2 className="mt-1 font-heading text-xl font-semibold">{destination.name}</h2>
              </div>
              <div className="divide-y divide-neutral-200">
                {guide.countryInfo.map((row) => (
                  <InfoRow key={row.label} label={row.label} value={row.value} />
                ))}
              </div>
              <div className="border-t border-neutral-200 px-5 py-5">
                <h3 className="font-semibold text-neutral-900">Need help with your case?</h3>
                <p className="mt-1 text-sm leading-5 text-neutral-500">
                  Talk to a visa specialist about your documents and travel plan.
                </p>
                <ContactActions message={`Hello ${siteConfig.name}, I need help with my ${destination.name} visa documents.`} />
              </div>
            </section>

            <section className="rounded-md border border-accent-200 bg-accent-50 p-5 lg:sticky lg:top-[calc(var(--header-height-mobile)+4.5rem)]">
              <h2 className="font-heading text-lg font-semibold text-neutral-900">Ready to apply?</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Send us your travel dates and we will guide you to the right visa option.
              </p>
              <a
                href={visaWhatsAppHref(`Hello ${siteConfig.name}, I want to start a ${destination.name} visa enquiry. My travel dates: `)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-accent-300 bg-white text-sm font-semibold text-accent-700 transition hover:border-accent-500 hover:text-accent-800"
              >
                Start an enquiry <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}

/* ========================================================================== */
/* Summary layout (destinations without a full guide yet)                     */
/* ========================================================================== */

function SummaryLayout({ destination }: { destination: VisaDestination }) {
  const docs = getDestinationDocs(destination);
  const related = getRelatedDestinations(destination.slug);
  const categoryLabel = VISA_CATEGORY_LABELS[destination.category];
  const message = `Hello ${siteConfig.name}, I need ${destination.name} visa requirements and application support.`;

  return (
    <main className="container-app py-8 sm:py-12">
      <div className="empty:hidden">
        <Suspense fallback={null}>
          <VisaPurposeNotice destination={destination} supported={["tourist"]} />
        </Suspense>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.8fr)] lg:gap-8">
        <div className="min-w-0 space-y-5 sm:space-y-7">
          <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 bg-primary-50 px-4 py-4 sm:px-7">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-700">Visa for Bangladeshi passport holders</p>
              <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2.5 font-heading text-xl font-bold text-neutral-900 sm:text-2xl">
                  <VisaFlag code={destination.code} name={destination.name} className="h-6 w-9" />
                  {destination.name} visa
                </h2>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">{categoryLabel}</span>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-7 sm:py-6">
              <p className="max-w-3xl text-sm leading-6 text-neutral-600">{CATEGORY_SUMMARY[destination.category]}</p>
            </div>
          </section>

          <GuideSection title="Basic requirements" eyebrow="Prepare your documents">
            <ul className="grid gap-3 sm:grid-cols-2">
              {docs.map((doc) => (
                <ChecklistItem key={doc}>{doc}</ChecklistItem>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-neutral-500">
              The exact checklist depends on your profession and travel purpose. Our team confirms it before you apply.
            </p>
          </GuideSection>

          <GuideSection title="How it works" eyebrow="Simple process">
            <ol className="space-y-3">
              {GENERIC_PROCESS_STEPS.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-700 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-[13px] leading-6 text-neutral-700 sm:text-sm">{step}</p>
                </li>
              ))}
            </ol>
          </GuideSection>

          {related.length > 0 && (
            <GuideSection title={`More ${categoryLabel} destinations`} eyebrow="Keep exploring">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/visa/${item.slug}`}
                    className="group flex flex-col rounded-md border border-neutral-200 bg-neutral-50/50 p-3.5 transition hover:-translate-y-0.5 hover:border-primary-300 hover:bg-white hover:shadow-md"
                  >
                    <VisaFlag code={item.code} name={item.name} className="h-5 w-8" />
                    <span className="mt-2 text-sm font-bold leading-snug text-neutral-900">{item.name}</span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold text-primary-700">
                      View <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </GuideSection>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-[calc(var(--header-height-mobile)+1.5rem)] lg:self-start">
          <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-neutral-900">Apply with ST Trip</h2>
            <p className="mt-1 text-sm leading-5 text-neutral-500">
              Get the exact checklist, fees and processing time for {destination.name} from our visa specialists.
            </p>
            <ContactActions message={message} />
          </section>
        </aside>
      </div>
    </main>
  );
}

/* ========================================================================== */
/* Small shared pieces                                                        */
/* ========================================================================== */

function ContactActions({ message }: { message: string }) {
  return (
    <div className="mt-4 grid gap-2">
      <a
        href={visaWhatsAppHref(message)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-600 text-sm font-semibold text-white transition hover:bg-primary-700"
      >
        <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
      </a>
      <a
        href={visaPhoneHref}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 transition hover:border-primary-300 hover:text-primary-700"
      >
        <Phone className="h-4 w-4" aria-hidden /> Call {siteConfig.contact.supportPhone}
      </a>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-neutral-50 p-3">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-neutral-800">{value}</p>
    </div>
  );
}

function GuideSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary-600 sm:text-xs">{eyebrow}</p>
      <h2 className="mt-1 font-heading text-lg font-semibold text-neutral-900 sm:text-xl">{title}</h2>
      <div className="mt-4 sm:mt-5">{children}</div>
    </section>
  );
}

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-sm leading-6 text-neutral-600">
      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent-500" aria-hidden />
      {children}
    </li>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(92px,0.8fr)_1.2fr] gap-3 px-5 py-3 text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium text-neutral-800">{value}</span>
    </div>
  );
}
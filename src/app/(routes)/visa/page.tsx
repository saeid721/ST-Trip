import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Info,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TravelSearchHero } from "@/features/home/components/TravelSearchHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Visa requirements & application support",
};

export default function VisaPage() {
  return (
    <div className="bg-neutral-50">
      <TravelSearchHero
        eyebrow="Visa assistance, made simple"
        title="Travel farther with the right visa guidance."
        description="Check entry requirements, understand your documents, and get application support from a team that knows the journey."
      />

      <section className="border-b border-neutral-200 bg-white">
        <div className="container-app grid gap-5 py-6 sm:grid-cols-3 sm:py-8">
          <TrustItem icon={<Clock3 />} title="Clear timelines" text="Know what to prepare and when." />
          <TrustItem icon={<ShieldCheck />} title="Verified guidance" text="Practical help for every step." />
          <TrustItem icon={<Sparkles />} title="Personal support" text="Real people, quick answers." />
        </div>
      </section>

      <main className="container-app py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.8fr)]">
          <div className="space-y-7">
            <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
              <div className="border-b border-neutral-200 bg-primary-50 px-5 py-4 sm:px-7">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-700">Featured destination</p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-heading text-2xl font-bold text-neutral-900">Australia tourist visa</h2>
                  <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">Popular choice</span>
                </div>
              </div>
              <div className="px-5 py-6 sm:px-7">
                <p className="max-w-3xl text-sm leading-6 text-neutral-600">
                  Planning a holiday, family visit, or a short stay in Australia? Here is a practical overview of the visitor visa route, required documents, and the information you should have ready before applying.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <Fact label="Visa category" value="Tourist / Visitor" />
                  <Fact label="Typical validity" value="Up to 12 months" />
                  <Fact label="Processing time" value="4 to 10 working days" />
                </div>
              </div>
            </section>

            <GuideSection title="Eligibility to apply" eyebrow="Before you begin">
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  "You must meet the visitor visa requirements for your purpose of travel.",
                  "Your passport should remain valid for the intended period of stay.",
                  "You should be able to show sufficient funds for your trip.",
                  "You must satisfy health and character requirements where applicable.",
                ].map((item) => <ChecklistItem key={item}>{item}</ChecklistItem>)}
              </ul>
            </GuideSection>

            <GuideSection title="Documents requirements" eyebrow="Prepare with confidence">
              <div className="divide-y divide-neutral-200 overflow-hidden rounded-md border border-neutral-200">
                {[
                  ["01", "Passport and identity documents", "Clear colour scans of your current passport and recent photographs."],
                  ["02", "Financial documents", "Bank statements, salary information, or sponsorship evidence."],
                  ["03", "Travel and accommodation plan", "Flight itinerary, hotel booking, and a short purpose-of-visit note."],
                  ["04", "Supporting documents", "Employment letter, invitation letter, or proof of relationship when relevant."],
                ].map(([number, title, text]) => (
                  <details key={number} className="group bg-white p-4 open:bg-primary-50/40 sm:p-5">
                    <summary className="flex cursor-pointer list-none items-center gap-3 font-semibold text-neutral-800 marker:hidden">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">{number}</span>
                      <span className="flex-1">{title}</span>
                      <ArrowRight className="h-4 w-4 rotate-90 text-neutral-400 transition-transform group-open:-rotate-90" aria-hidden />
                    </summary>
                    <p className="ml-10 mt-3 max-w-2xl text-sm leading-6 text-neutral-600">{text}</p>
                  </details>
                ))}
              </div>
            </GuideSection>

            <div className="grid gap-7 sm:grid-cols-2">
              <GuideSection title="Visa fees" eyebrow="Plan your budget">
                <p className="text-sm leading-6 text-neutral-600">Government fees vary by destination, visa stream, and applicant profile. Our team confirms the current charge before submission.</p>
                <div className="mt-4 flex items-start gap-2 text-sm font-semibold text-primary-700"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />Service charges are shared upfront.</div>
              </GuideSection>
              <GuideSection title="Processing time" eyebrow="Stay informed">
                <p className="text-sm leading-6 text-neutral-600">Most standard applications take around 4 to 10 working days after a complete submission. Complex cases can take longer.</p>
                <div className="mt-4 flex items-start gap-2 text-sm font-semibold text-accent-700"><Clock3 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />We keep you updated throughout.</div>
              </GuideSection>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
              <div className="bg-primary-700 px-5 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Country information</p>
                <h2 className="mt-1 font-heading text-xl font-semibold">Australia</h2>
              </div>
              <div className="divide-y divide-neutral-200">
                <InfoRow label="Capital" value="Canberra" />
                <InfoRow label="Currency" value="Australian dollar (AUD)" />
                <InfoRow label="Language" value="English" />
                <InfoRow label="Time zone" value="UTC+8 to UTC+11" />
                <InfoRow label="Best time to visit" value="September to November" />
              </div>
              <div className="border-t border-neutral-200 px-5 py-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden />
                  <div><h3 className="font-semibold text-neutral-900">Need help with your case?</h3><p className="mt-1 text-sm leading-5 text-neutral-500">Talk to a visa specialist about your documents and travel plan.</p></div>
                </div>
                <Button className="mt-5 w-full gap-2" size="md">Speak to a specialist <ArrowRight className="h-4 w-4" aria-hidden /></Button>
              </div>
            </section>

            <section className="rounded-md border border-accent-200 bg-accent-50 p-5">
              <h2 className="font-heading text-lg font-semibold text-neutral-900">Ready to apply?</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Send us your destination and travel dates. We will guide you to the right visa option.</p>
              <Button variant="outline" className="mt-4 w-full gap-2 border-accent-300 text-accent-700 hover:border-accent-500 hover:text-accent-800">Start an enquiry <ArrowRight className="h-4 w-4" aria-hidden /></Button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 [&>svg]:h-5 [&>svg]:w-5">{icon}</span><div><h3 className="text-sm font-semibold text-neutral-900">{title}</h3><p className="text-xs text-neutral-500">{text}</p></div></div>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-neutral-50 p-3"><p className="text-xs text-neutral-500">{label}</p><p className="mt-1 text-sm font-semibold text-neutral-800">{value}</p></div>;
}

function GuideSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-600">{eyebrow}</p><h2 className="mt-1 font-heading text-xl font-semibold text-neutral-900">{title}</h2><div className="mt-5">{children}</div></section>;
}

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return <li className="flex gap-2 text-sm leading-6 text-neutral-600"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent-500" aria-hidden />{children}</li>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-[minmax(92px,0.8fr)_1.2fr] gap-3 px-5 py-3 text-sm"><span className="text-neutral-500">{label}</span><span className="font-medium text-neutral-800">{value}</span></div>;
}

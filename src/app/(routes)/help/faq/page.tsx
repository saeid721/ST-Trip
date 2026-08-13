import type { Metadata } from "next";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { FaqSection } from "@/features/content/components/FaqSection";
import { faqCategories, faqs } from "@/features/content/data/faqs";

export const metadata: Metadata = buildMetadata({
  title: "FAQ & Support",
  description: "Answers to common questions about booking, payment, refunds and visas.",
});

export default function FaqSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="We're Here to Help"
        title="FAQ & Support"
        description="Quick answers to the questions we hear most — or reach our team directly."
      />

      <section className="py-12 sm:py-16">
        <div className="container-app grid gap-10 lg:grid-cols-[1fr_300px]">
          <FaqSection categories={faqCategories} faqs={faqs} />

          <aside className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:h-fit">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-base font-semibold text-neutral-900">
                Still need help?
              </h3>
              <p className="mt-1.5 text-sm text-neutral-500">
                Our support team is available 24/7 by phone, WhatsApp or email.
              </p>

              <a
                href={`tel:${siteConfig.contact.supportPhone}`}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-600 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call Support
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary-300 hover:text-primary-700"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp Us
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary-300 hover:text-primary-700"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email Us
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
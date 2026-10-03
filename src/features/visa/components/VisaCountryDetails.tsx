"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  CloudSun,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  PlaneLanding,
  PlaneTakeoff,
  RotateCcw,
  X,
  ZoomIn,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, formatCurrency } from "@/lib/utils";
import { visaPhoneHref, visaWhatsAppHref } from "@/features/visa/lib/links";
import { getPurposeLabel, isVisaPurpose } from "@/features/visa/lib/purposes";
import type {
  VisaDestination,
  VisaDoc,
  VisaEmbassy,
  VisaGuide,
  VisaProfession,
  VisaPurpose,
  VisaSample,
} from "@/features/visa/types";

/* ========================================================================== */
/* Shared                                                                     */
/* ========================================================================== */

const SCROLL_OFFSET = "scroll-mt-[calc(var(--header-height-mobile)+4.5rem)]";

function Card({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("rounded-md border border-neutral-200 bg-white p-4 shadow-sm sm:p-6", SCROLL_OFFSET)}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary-600 sm:text-xs">{eyebrow}</p>
      <h2 className="mt-1 font-heading text-lg font-semibold text-neutral-900 sm:text-xl">{title}</h2>
      <div className="mt-4 sm:mt-5">{children}</div>
    </section>
  );
}

/* ========================================================================== */
/* Sticky section navigation                                                  */
/* ========================================================================== */

export function VisaSectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [stuck, setStuck] = useState(false);
  const [shift, setShift] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const nav = navRef.current;
    const btn = nav?.querySelector<HTMLElement>('[data-active="true"]');
    if (!nav || !btn) return;
    nav.scrollTo({
      left: btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  // Keep the placeholder height equal to the bar height (no layout jump when it becomes fixed).
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => setBarHeight(bar.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  // Pin the bar right under the fixed site header while the page scrolls.
  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const raw = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height-mobile"),
      );
      const headerHeight = Number.isFinite(raw) ? raw : 64;
      const barH = barRef.current?.offsetHeight ?? 0;
      const parentBottom = anchor.parentElement?.getBoundingClientRect().bottom ?? Number.POSITIVE_INFINITY;

      setStuck(anchor.getBoundingClientRect().top <= headerHeight);
      // When the page content ends, slide the bar up under the header instead of covering the footer.
      setShift(Math.min(0, parentBottom - headerHeight - barH));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const go = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={anchorRef}
      aria-label="Visa guide sections"
      style={barHeight ? { height: barHeight } : undefined}
    >
      <div
        ref={barRef}
        style={stuck && shift < 0 ? { transform: `translateY(${shift}px)` } : undefined}
        className={cn(
          "z-40 border-b border-neutral-200 bg-white/95 backdrop-blur",
          stuck ? "fixed inset-x-0 top-[var(--header-height-mobile)] shadow-sm" : "relative",
        )}
      >
        <div
          ref={navRef}
          className="container-app relative flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              data-active={active === item.id}
              aria-current={active === item.id ? "true" : undefined}
              onClick={() => go(item.id)}
              className={cn(
                "min-h-9 shrink-0 rounded-full px-3.5 text-xs font-semibold transition-colors sm:px-4",
                active === item.id
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ========================================================================== */
/* Purpose notice (?purpose=business etc. from the header search)             */
/* ========================================================================== */

export function VisaPurposeNotice({
  destination,
  supported,
}: {
  destination: VisaDestination;
  supported: VisaPurpose[];
}) {
  const raw = useSearchParams().get("purpose");
  if (!isVisaPurpose(raw) || supported.includes(raw)) return null;

  const message = `Hello ${siteConfig.name}, I need a ${getPurposeLabel(raw)} for ${destination.name}. Please share the requirements.`;

  return (
    <div role="status" className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-900">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div className="text-xs leading-5 sm:text-sm">
        <p>
          The details below cover <strong>{supported.map(getPurposeLabel).join(", ")}</strong>. A{" "}
          <strong>{getPurposeLabel(raw)}</strong> for {destination.name} needs different documents.
        </p>
        <a
          href={visaWhatsAppHref(message)}
          target="_blank"
          rel="noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 font-semibold text-amber-900 underline underline-offset-2"
        >
          Ask our visa team <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Overview CTA                                                               */
/* ========================================================================== */

export function VisaApplyCta({ destination, guide }: { destination: VisaDestination; guide: VisaGuide }) {
  const message = `Hello ${siteConfig.name}, I would like to apply for a ${destination.name} visa. Please guide me with the documents and fees.`;

  return (
    <div className="mt-5 rounded-md border border-primary-100 bg-primary-50/50 p-4 sm:p-5">
      <p className="text-sm leading-6 text-neutral-700">{guide.overview.highlight}</p>
      <p className="mt-2 text-xs leading-5 text-neutral-500 sm:text-[13px]">{guide.overview.restrictions}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href={visaWhatsAppHref(message)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-700 px-5 text-sm font-semibold text-white transition hover:bg-primary-800"
        >
          Apply with our team <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
        <a
          href={visaPhoneHref}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-700 transition hover:border-primary-300 hover:text-primary-700"
        >
          <Phone className="h-4 w-4" aria-hidden /> {siteConfig.contact.supportPhone}
        </a>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Required documents (profession tabs + interactive checklist)               */
/* ========================================================================== */

export function VisaDocuments({
  destination,
  professions,
}: {
  destination: VisaDestination;
  professions: VisaProfession[];
}) {
  const [active, setActive] = useState(professions[0]?.id ?? "");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const storageKey = `visa-checklist:${destination.slug}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* storage unavailable or corrupted: start with an empty checklist */
    }
  }, [storageKey]);

  const current = professions.find((p) => p.id === active) ?? professions[0];
  if (!current) return null;

  const idOf = (doc: VisaDoc) => `${current.id}:${doc.title}`;
  const total = current.docs.length;
  const done = current.docs.filter((doc) => checked[idOf(doc)]).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const pending = current.docs.filter((doc) => !checked[idOf(doc)]).map((doc) => doc.title);

  const save = (next: Record<string, boolean>) => {
    setChecked(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* ignore storage errors */
    }
  };
  const toggle = (id: string) => save({ ...checked, [id]: !checked[id] });
  const reset = () =>
    save(Object.fromEntries(Object.entries(checked).filter(([key]) => !key.startsWith(`${current.id}:`))));

  const message =
    `Hello ${siteConfig.name}, I am applying for a ${destination.name} visa (${current.label}). ` +
    `Documents ready: ${done}/${total}. ` +
    (pending.length > 0 ? `Still pending: ${pending.join(", ")}.` : "All documents are ready.");

  return (
    <Card id="documents" eyebrow="Prepare with confidence" title="Required documents">
      <p className="text-xs leading-5 text-neutral-500 sm:text-sm">
        Choose the applicant&apos;s profession and tick each document as you get it ready. Your progress is saved on
        this device.
      </p>

      <div
        role="tablist"
        aria-label="Applicant profession"
        className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {professions.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={current.id === p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              "min-h-10 shrink-0 rounded-full px-4 text-xs font-semibold transition-colors sm:text-[13px]",
              current.id === p.id
                ? "bg-primary-700 text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs font-medium text-neutral-500">{current.hint}</p>

      <div className="mt-2 rounded-md border border-neutral-200 bg-neutral-50/60 p-3.5">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-neutral-800">
            {done} of {total} documents ready
          </span>
          <span className="font-bold text-primary-700">{pct}%</span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200"
          role="progressbar"
          aria-label="Document checklist progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div className="h-full rounded-full bg-primary-600 transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
        {done === total && total > 0 && (
          <p className="mt-2 text-xs font-semibold text-success">All set. You are ready to apply.</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={visaWhatsAppHref(message)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary-700 px-3 text-xs font-semibold text-white transition hover:bg-primary-800"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Send checklist on WhatsApp
          </a>
          <button
            type="button"
            onClick={reset}
            disabled={done === 0}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-600 transition hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-40"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset
          </button>
        </div>
      </div>

      <ol className="mt-3 divide-y divide-neutral-200 overflow-hidden rounded-md border border-neutral-200">
        {current.docs.map((doc, i) => {
          const id = idOf(doc);
          const isDone = Boolean(checked[id]);
          return (
            <li
              key={id}
              className={cn(
                "flex gap-3 p-4 transition-colors sm:gap-4 sm:p-5",
                isDone ? "bg-success/5" : "bg-white even:bg-neutral-50/60",
              )}
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={isDone}
                aria-label={`Mark ${doc.title} as ready`}
                onClick={() => toggle(id)}
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition",
                  isDone
                    ? "border-success bg-success text-white"
                    : "border-neutral-300 bg-white text-transparent hover:border-primary-400",
                )}
              >
                <Check className="h-4 w-4" aria-hidden />
              </button>
              <div className="min-w-0">
                <h3
                  className={cn(
                    "text-sm font-semibold",
                    isDone ? "text-neutral-500 line-through decoration-neutral-300" : "text-neutral-900",
                  )}
                >
                  <span className="mr-1.5 text-neutral-400">{i + 1}.</span>
                  {doc.title}
                </h3>
                {doc.text && <p className="mt-1 text-[13px] leading-6 text-neutral-600">{doc.text}</p>}
                {doc.points && (
                  <ul className="mt-1 space-y-1">
                    {doc.points.map((point, j) => (
                      <li key={point} className="flex gap-2 text-[13px] leading-6 text-neutral-600">
                        <span className="font-semibold text-neutral-400">{String.fromCharCode(97 + j)}.</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

/* ========================================================================== */
/* Fees                                                                       */
/* ========================================================================== */

export function VisaFees({ fees }: { fees: VisaGuide["fees"] }) {
  return (
    <Card id="fees" eyebrow="Plan your budget" title="Fees & charges">
      <p className="text-xs leading-5 text-neutral-500 sm:text-sm">Visa fee & processing fee</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {fees.groups.map((group) => (
          <div key={group.title} className="rounded-md border border-neutral-200 bg-neutral-50/60 p-4">
            <h3 className="text-sm font-semibold text-neutral-900">{group.title}</h3>
            <dl className="mt-3 space-y-2.5">
              {group.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3 border-b border-dashed border-neutral-200 pb-2.5 last:border-0 last:pb-0"
                >
                  <dt className="text-xs text-neutral-600 sm:text-[13px]">{row.label}</dt>
                  <dd className="font-heading text-sm font-bold text-primary-700">{formatCurrency(row.amount)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-md bg-amber-50 p-3 text-xs font-semibold leading-5 text-amber-800">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        {fees.note}
      </div>
    </Card>
  );
}

/* ========================================================================== */
/* Processing time & steps                                                    */
/* ========================================================================== */

export function VisaProcess({ processing }: { processing: VisaGuide["processing"] }) {
  return (
    <Card id="process" eyebrow="Stay informed" title="Processing time & steps">
      <div className="flex items-start gap-3 rounded-md border border-primary-100 bg-primary-50/60 p-4">
        <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden />
        <p className="text-sm font-semibold leading-6 text-neutral-900">{processing.summary}</p>
      </div>
      <ol className="mt-5 space-y-0">
        {processing.steps.map((step, i) => (
          <li key={step} className="relative flex gap-3 pb-5 last:pb-0">
            {i < processing.steps.length - 1 && (
              <span className="absolute left-[13px] top-8 h-[calc(100%-20px)] w-px bg-primary-100" aria-hidden />
            )}
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-700 text-xs font-bold text-white">
              {i + 1}
            </span>
            <p className="pt-0.5 text-[13px] leading-6 text-neutral-700 sm:text-sm">{step}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}

/* ========================================================================== */
/* Samples                                                                    */
/* ========================================================================== */

function SamplesSection({ samples }: { samples: VisaSample[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const selected = open !== null ? samples[open] : undefined;

  return (
    <Card id="samples" eyebrow="What to expect" title="Sample documents & photos">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
        {samples.map((item, i) => (
          <figure key={item.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-100"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(min-width:1024px) 20vw, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white">
                <ZoomIn className="h-3.5 w-3.5" aria-hidden />
              </span>
            </button>
            <figcaption className="mt-1.5 text-[11px] leading-4 text-neutral-500 sm:text-xs">{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label={selected.caption}
          onClick={() => setOpen(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <p className="text-sm text-white/80">{selected.caption}</p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="rounded-full p-2 text-white/80 hover:bg-white/10"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="relative m-3 flex-1 sm:m-8">
            <Image src={selected.src} alt={selected.caption} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </Card>
  );
}

/* ========================================================================== */
/* About, Travel rules, Embassy, Notes                                        */
/* ========================================================================== */

function AboutSection({ about, countryName }: { about: VisaGuide["about"]; countryName: string }) {
  const { map } = about;
  return (
    <Card id="about" eyebrow="Know before you go" title={`About ${countryName}`}>
      <div className="overflow-hidden rounded-md border border-neutral-200">
        <iframe
          title={`${countryName} map`}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${map.bbox}&layer=mapnik&marker=${map.lat},${map.lng}`}
          loading="lazy"
          className="h-52 w-full border-0 sm:h-72"
        />
      </div>
      <p className="mt-4 text-sm leading-6 text-neutral-600">{about.description}</p>

      {about.cities.length > 0 && (
        <>
          <h3 className="mt-5 flex items-center gap-2 text-sm font-bold text-neutral-900">
            <Building2 className="h-4 w-4 text-primary-600" aria-hidden /> Major cities
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {about.cities.map((city) => (
              <span key={city} className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs text-neutral-700">
                {city}
              </span>
            ))}
          </div>
        </>
      )}

      <h3 className="mt-5 flex items-center gap-2 text-sm font-bold text-neutral-900">
        <CloudSun className="h-4 w-4 text-primary-600" aria-hidden /> Weather
      </h3>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{about.weather}</p>
    </Card>
  );
}

function RuleList({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return (
    <div className="rounded-md border border-neutral-200 bg-neutral-50/60 p-4">
      <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900">
        <span className="text-primary-600 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-[13px] leading-6 text-neutral-600">
            <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TravelRulesSection({ rules }: { rules: VisaGuide["travelRules"] }) {
  return (
    <Card id="travel-rules" eyebrow="Stay prepared" title="Travel rules">
      <div className="grid gap-3 md:grid-cols-2">
        <RuleList title="Before departure" icon={<PlaneTakeoff />} items={rules.beforeDeparture} />
        <RuleList title="After arrival" icon={<PlaneLanding />} items={rules.afterArrival} />
      </div>
    </Card>
  );
}

function EmbassySection({ embassies }: { embassies: VisaEmbassy[] }) {
  return (
    <Card id="embassy" eyebrow="Official contacts" title="Embassy & contacts">
      <div className="grid gap-3 md:grid-cols-2">
        {embassies.map((e) => (
          <div key={e.name} className="flex flex-col rounded-md border border-neutral-200 p-4">
            <h3 className="text-sm font-bold leading-5 text-neutral-900">{e.name}</h3>
            <ul className="mt-3 flex-1 space-y-2.5 text-[13px] leading-5 text-neutral-600">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                {e.address}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                <a href={`tel:${e.phone.replace(/[^\d+]/g, "")}`} className="font-medium text-primary-700 hover:underline">
                  {e.phone}
                </a>
              </li>
              {e.email && (
                <li className="flex gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                  <a href={`mailto:${e.email}`} className="break-all font-medium text-primary-700 hover:underline">
                    {e.email}
                  </a>
                </li>
              )}
              {e.hours && (
                <li className="flex gap-2">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                  {e.hours}
                </li>
              )}
            </ul>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.address)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-10 w-fit items-center gap-2 rounded-md bg-primary-50 px-4 text-xs font-semibold text-primary-700 transition hover:bg-primary-100"
            >
              <Navigation className="h-3.5 w-3.5" aria-hidden /> Directions
            </a>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ImportantNotes({ disclaimer }: { disclaimer: string }) {
  return (
    <section className="rounded-md border border-accent-200 bg-accent-50 p-4 sm:p-6">
      <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-neutral-900">
        <AlertCircle className="h-5 w-5 text-accent-700" aria-hidden /> Important notes
      </h2>
      <p className="mt-2 text-sm leading-6 text-neutral-700">{disclaimer}</p>
    </section>
  );
}

export function VisaExtraSections({ guide, countryName }: { guide: VisaGuide; countryName: string }) {
  return (
    <>
      {guide.samples.length > 0 && <SamplesSection samples={guide.samples} />}
      <AboutSection about={guide.about} countryName={countryName} />
      <TravelRulesSection rules={guide.travelRules} />
      {guide.embassies.length > 0 && <EmbassySection embassies={guide.embassies} />}
      <ImportantNotes disclaimer={guide.disclaimer} />
    </>
  );
}
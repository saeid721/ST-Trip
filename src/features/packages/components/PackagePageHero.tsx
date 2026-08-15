interface PackagePageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PackagePageHero({ eyebrow, title, description }: PackagePageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 pt-[calc(var(--header-height)+1.5rem)] pb-8 text-center sm:pt-[calc(var(--header-height)+2.5rem)] sm:pb-14 md:pt-[calc(var(--header-height)+3.5rem)] md:pb-20">
      {/* Decorative glow orbs — adds depth without competing with the text */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-14 -top-14 h-36 w-36 rounded-full bg-accent-400/20 blur-3xl sm:-left-20 sm:-top-20 sm:h-56 sm:w-56 md:h-96 md:w-96"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 top-1/3 h-32 w-32 rounded-full bg-primary-400/25 blur-3xl sm:-right-16 sm:h-48 sm:w-48 md:h-80 md:w-80"
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container-app relative px-4">
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-50 backdrop-blur-sm sm:px-3 sm:text-[11px] sm:tracking-[0.2em] md:text-xs md:tracking-[0.25em]">
          {eyebrow}
        </span>
        <h1 className="mt-3 font-heading text-xl font-bold leading-tight text-white sm:mt-4 sm:text-[26px] md:mt-5 md:text-4xl lg:text-[42px]">
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-primary-50/90 sm:mt-3 sm:text-[13px] md:mt-4 md:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
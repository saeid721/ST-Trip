interface PackagePageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PackagePageHero({ eyebrow, title, description }: PackagePageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 pt-[calc(var(--header-height)+3.5rem)] pb-16 text-center sm:pb-20">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-app relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-100">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-50/90 sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
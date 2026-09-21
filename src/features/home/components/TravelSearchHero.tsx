import Image from "next/image";
import { SearchWidget } from "@/features/home/components/SearchWidget/SearchWidget";

interface TravelSearchHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function TravelSearchHero({
  eyebrow,
  title,
  description,
  imageSrc = "/images/hero-banner.jpg",
  imageAlt = "Travel destinations available on ST Trip",
}: TravelSearchHeroProps) {
  return (
    <section className="relative" aria-labelledby="travel-search-heading">
      <div className="relative h-[320px] w-full overflow-hidden md:h-[390px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/45 to-neutral-900/80" />

        <div className="container-app relative flex h-full flex-col items-center justify-center px-4 text-center">
          {eyebrow ? (
            <p className="font-heading text-sm font-medium text-white md:text-xl">{eyebrow}</p>
          ) : null}
          <h1
            id="travel-search-heading"
            className="mt-2 max-w-3xl font-heading text-2xl font-bold leading-tight text-white md:text-5xl"
          >
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-xs text-white/85 md:mt-4 md:text-base">{description}</p>
        </div>
      </div>

      <div className="container-app container-search relative z-30 -mt-16 md:-mt-24">
        <SearchWidget />
      </div>
    </section>
  );
}

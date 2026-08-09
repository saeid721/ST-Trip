import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Build page-level metadata while inheriting sane site-wide defaults. */
export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title ?? siteConfig.name;
  const description = overrides.description ?? siteConfig.description;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    icons: {
      icon: "/icons/favicon.png",
      shortcut: "/icons/favicon.png",
      apple: "/icons/favicon.png",
    },
    keywords: [
      "flight booking Bangladesh",
      "cheap air tickets Dhaka",
      "hotel booking Bangladesh",
      "tour packages Bangladesh",
      "visa assistance Bangladesh",
      "Cox's Bazar hotels",
      siteConfig.name,
    ],
    alternates: { canonical: siteConfig.url },
    openGraph: {
      title: typeof title === "string" ? title : siteConfig.name,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: typeof title === "string" ? title : siteConfig.name,
      description,
      images: [siteConfig.ogImage],
    },
    ...overrides,
  };
}

/** Organization + WebSite (SearchAction) + TravelAgency JSON-LD for the homepage. */
export function buildHomeJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    sameAs: Object.values(siteConfig.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.supportPhone,
        contactType: "customer support",
        areaServed: "BD",
        availableLanguage: ["en", "bn"],
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const travelAgency = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    address: siteConfig.offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressCountry: "BD",
    })),
    telephone: siteConfig.contact.supportPhone,
  };

  return [organization, website, travelAgency];
}

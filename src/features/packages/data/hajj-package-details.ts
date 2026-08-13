import type { PackageDetail } from "@/features/packages/types";

// Keyed by slug — the last path segment of each package's `href` in
// hajj-packages.ts. Add more entries here as you flesh out each package;
// generateStaticParams() in the [slug] route reads these keys automatically.
export const hajjPackageDetails: Record<string, PackageDetail> = {
  "pre-registration": {
    slug: "pre-registration",
    category: "pre-registration",
    title: "Hajj Pre-Registration 2027-2028 from Bangladesh",
    subtitle: "Secure your Hajj quota early with government-guided registration",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    ],
    durationDays: 0,
    priceFrom: 30000,
    priceNote: "Reservation fee",
    badge: "Reserve Now",
    overview:
      "Begin your Hajj journey ahead of time. Reserve your spot and secure your quota with an initial payment before dates are finalized, so you are not left out when the government-managed Hajj quota fills up. Our team handles the full pre-registration process with the relevant authorities on your behalf.",
    highlights: [
      "Government-recognized Hajj pre-registration",
      "Priority quota allocation once dates open",
      "Dedicated case officer for your file",
      "Full refund policy if quota is not confirmed",
    ],
    inclusions: [
      "Pre-registration processing fee",
      "Document verification & submission",
      "SMS/email updates on quota status",
      "One-on-one consultation session",
    ],
    exclusions: [
      "Final Hajj package cost (paid separately)",
      "Passport & visa fees",
      "Medical & vaccination costs",
    ],
    faqs: [
      {
        question: "When do I need to pay the remaining package cost?",
        answer:
          "Once your quota is confirmed by the Hajj authority and travel dates are announced, we will contact you to complete payment and select your preferred package tier.",
      },
      {
        question: "Is the registration fee refundable?",
        answer:
          "Yes. If your quota is not confirmed for the upcoming season, the reservation fee is fully refundable as per our refund policy.",
      },
    ],
  },

  "40-days-non-shifting": {
    slug: "40-days-non-shifting",
    category: "non-shifting",
    title: "40 Days Non-Shifting Hajj Package",
    subtitle: "Fixed accommodation in Makkah and Madinah for the full journey",
    heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    ],
    durationDays: 40,
    nightsLabel: "Fixed hotel — Makkah & Madinah",
    priceFrom: 700000,
    overview:
      "Our most popular Hajj package, designed for pilgrims who prefer the comfort and predictability of staying in the same hotel throughout their time in Makkah and Madinah. Enjoy ample time for worship, ziyarah and rest across the full 40-day duration, with all logistics handled by our experienced team.",
    highlights: [
      "Same hotel in Makkah and Madinah — no mid-trip relocation",
      "Group guidance from experienced Hajj murshid",
      "Comfortable AC transport between holy sites",
      "Daily halal meals included",
    ],
    inclusions: [
      "Return air ticket (Dhaka – Jeddah/Madinah – Dhaka)",
      "Hotel accommodation in Makkah & Madinah",
      "Ziyarah/sightseeing in Madinah",
      "Visa processing & health insurance",
      "Return transportation to/from airport",
      "Dedicated Bengali-speaking guide throughout",
    ],
    exclusions: [
      "Qurbani/Udhiya cost (approx. BDT 700-900 per person)",
      "Personal expenses and shopping",
      "Any medical treatment cost not covered by insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Departure from Dhaka",
        description:
          "Assemble at Hazrat Shahjalal International Airport for the group flight to Jeddah or Madinah, based on your package tier.",
      },
      {
        day: 2,
        title: "Arrival & Check-in",
        description:
          "Arrive, complete immigration formalities, and transfer to your fixed hotel. Orientation session with your group guide.",
      },
      {
        day: 5,
        title: "Ziyarah in Madinah",
        description:
          "Guided visits to Masjid Quba, Jabal Uhud, and other historic sites, alongside daily prayers at Masjid an-Nabawi.",
      },
      {
        day: 15,
        title: "Transfer to Makkah",
        description:
          "Transportation to Makkah and check-in ahead of the Hajj rites, with time to perform Umrah and rest.",
      },
      {
        day: 20,
        title: "Days of Hajj (Mina, Arafat, Muzdalifah)",
        description:
          "Group-guided movement through the core rites of Hajj across Mina, Arafat and Muzdalifah, with full logistical support.",
      },
      {
        day: 40,
        title: "Return to Dhaka",
        description: "Final check-out, airport transfer, and return flight to Dhaka.",
      },
    ],
  },
};
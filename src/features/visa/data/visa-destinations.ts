import { slugify } from "@/lib/utils";
import type {
  VisaCategory,
  VisaDestination,
  VisaDoc,
  VisaGuide,
} from "@/features/visa/types";

/* ========================================================================== */
/* Labels & shared copy                                                       */
/* ========================================================================== */

export const VISA_CATEGORY_LABELS: Record<VisaCategory, string> = {
  evisa: "e-Visa",
  sticker: "Sticker visa",
  arrival: "Visa on arrival",
};

export const CATEGORY_SUMMARY: Record<VisaCategory, string> = {
  evisa:
    "This destination issues an electronic visa. Our team submits your application online and you receive the e-Visa by email.",
  sticker:
    "This destination issues a sticker visa. Your passport and original documents are submitted to the embassy or visa centre for stamping.",
  arrival:
    "This destination issues a visa on arrival. Prepare your documents before travel and present them at the airport immigration desk.",
};

export const GENERIC_PROCESS_STEPS = [
  "Share your destination, travel dates and profession with our visa team.",
  "We confirm the exact document checklist and the current fee.",
  "Our team reviews your documents and submits the application.",
  "We deliver your visa, or collect your passport and return it to you.",
];

const DEFAULT_DOCS: Record<VisaCategory, string[]> = {
  evisa: ["Passport", "All documents required as per checklist (soft copy only)."],
  sticker: ["Passport", "All the sticker visa required documents hard copy."],
  arrival: ["Passport", "Round air tickets", "Proof of accommodation."],
};

const DIPLOMATIC = "No visa required for Diplomatic and Official Passport holders.";

/* ========================================================================== */
/* Malaysia full guide                                                        */
/* ========================================================================== */

const PASSPORT: VisaDoc = {
  title: "Passport",
  text: "Machine scanned copy of original passport with validity of minimum six months after the intended date of departure and minimum two blank pages for visa stamp.",
};
const PHOTO: VisaDoc = {
  title: "Photo",
  text: "Soft copy of recent passport size photo (35mm x 50mm) with white background. Photo must be a lab copy (raw file). Please DO NOT use scanned photographs.",
};
const COVERING: VisaDoc = {
  title: "Covering Letter",
  text: "Covering letter from the applicant with name, designation and passport number, outlining who will be responsible for the full costs of the trip (travel, accommodation, expenses etc.). Addressed to The Visa Officer, Embassy of Malaysia.",
};
const TICKET: VisaDoc = {
  title: "Ticket Itinerary & Hotel Reservation",
  text: "A copy of the round air ticket and hotel booking is needed.",
};
const OTHERS: VisaDoc = {
  title: "Others",
  text: "Marriage certificate, birth certificate of children, death certificate of spouse, if applicable.",
};
const PREVIOUS: VisaDoc = {
  title: "Previous Visa Copy",
  text: "Scanned PDF of previous visa copies of different countries.",
};

// NOTE: "Service holder" comes from the reference page. The other profession
// tabs are standard examples, verify them with your visa team before publishing.
const MALAYSIA_GUIDE: VisaGuide = {
  purposes: ["tourist"],
  overview: {
    intro:
      "Planning a holiday, family visit, or a short stay in Malaysia? Here is a practical overview of the tourist visa route, required documents, and the information you should have ready before applying.",
    highlight:
      "The standard eVisa for Tourist is valid for 180 days from the issue date for a single journey (tour / holiday / vacation). Stay is limited to 30 consecutive days.",
    restrictions:
      "Tourist visa holders may not take unauthorised employment, attend school, or represent foreign media during their stay. Once the Embassy of Malaysia approves, a soft copy of the visa is sent to the applicant.",
  },
  facts: [
    { label: "Visa category", value: "Tourist eVisa" },
    { label: "eVisa validity", value: "180 days" },
    { label: "Max stay", value: "30 consecutive days" },
    { label: "Processing time", value: "8 to 10 working days" },
  ],
  eligibility: [
    "Any Bangladeshi national can apply, subject to providing the required documents.",
    "You must be a genuine visitor travelling for tour, holiday or vacation.",
    "You need a valid MRP / e-Passport with at least 6 months validity.",
    "You must have enough funds to support your stay and leave.",
    "You must satisfy health and character requirements where applicable.",
  ],
  professions: [
    {
      id: "service",
      label: "Service holder",
      hint: "Salaried employees",
      docs: [
        PASSPORT,
        PHOTO,
        {
          title: "Sponsor's Financial Documents",
          text: "Machine scanned copy of:",
          points: [
            "Original personal bank solvency and statement for the last six months, with bank name and telephone number clearly shown (minimum balance BDT 100,000 for single and BDT 150,000 with family).",
            "Pay slip of the last six months (if any).",
          ],
        },
        {
          title: "Proof of Occupation",
          points: [
            "Visa request letter from the applicant.",
            "No Objection Certificate (NOC) from employer.",
            "Office ID card / visiting card.",
          ],
        },
        COVERING,
        TICKET,
        OTHERS,
        PREVIOUS,
      ],
    },
    {
      id: "business",
      label: "Business person",
      hint: "Business owners",
      docs: [
        PASSPORT,
        PHOTO,
        {
          title: "Financial Documents",
          text: "Machine scanned copy of:",
          points: [
            "Original personal and company bank solvency and statement for the last six months.",
            "Income tax return / TIN certificate.",
          ],
        },
        {
          title: "Proof of Business",
          points: ["Valid trade licence.", "Company TIN / VAT certificate.", "Visiting card / company letterhead."],
        },
        COVERING,
        TICKET,
        OTHERS,
        PREVIOUS,
      ],
    },
    {
      id: "professional",
      label: "Professional",
      hint: "Doctors, engineers, lawyers, etc.",
      docs: [
        PASSPORT,
        PHOTO,
        {
          title: "Financial Documents",
          text: "Machine scanned copy of:",
          points: [
            "Original personal bank solvency and statement for the last six months.",
            "Income tax return / TIN certificate.",
          ],
        },
        {
          title: "Proof of Profession",
          points: [
            "Professional registration / membership certificate.",
            "Chamber or practice ID / visiting card.",
            "Visa request letter from the applicant.",
          ],
        },
        COVERING,
        TICKET,
        OTHERS,
        PREVIOUS,
      ],
    },
    {
      id: "others",
      label: "Others",
      hint: "Students, homemakers, retired",
      docs: [
        PASSPORT,
        PHOTO,
        {
          title: "Sponsor's Documents",
          text: "Machine scanned copy of:",
          points: [
            "Sponsor's bank solvency and statement for the last six months.",
            "Proof of relationship with the sponsor.",
            "Sponsor's NID / passport copy.",
          ],
        },
        {
          title: "Proof of Status",
          points: [
            "Student: institution ID and NOC / enrolment letter.",
            "Retired: retirement or pension certificate.",
          ],
        },
        COVERING,
        TICKET,
        OTHERS,
        PREVIOUS,
      ],
    },
  ],
  fees: {
    groups: [
      {
        title: "Agent / Corporate",
        rows: [
          { label: "Apply online", amount: 5000 },
          { label: "Submitted by our office", amount: 5500 },
        ],
      },
      {
        title: "Individual applicant",
        rows: [
          { label: "Apply online", amount: 5200 },
          { label: "Submitted by our office", amount: 5500 },
        ],
      },
    ],
    note: "Visa fee & service charges are NON-REFUNDABLE.",
  },
  processing: {
    summary:
      "Total approximate processing time is 8 to 10 working days (time may vary depending on the applicant's profile and the embassy's actual processing time).",
    steps: [
      "Online application through our team (Application > Documents > Payment > Completion).",
      "Information and supporting documents are reviewed by our visa team.",
      "Visa application (with supporting documents) is submitted online by our visa team.",
      "The applicant receives the eVisa by email or can download it from their account.",
    ],
  },
  // Add your own images to /public/images/visa/malaysia/ then list them here.
  // The "Samples" section and its nav tab appear automatically when this has items.
  // Example: { src: "/images/visa/malaysia/evisa-sample.jpg", caption: "Malaysia eVisa (Tourist) sample" }
  samples: [],
  about: {
    description:
      "Malaysia is a Southeast Asian country made up of part of the Malay Peninsula and the northern part of Borneo. It is known for beaches, rainforests and a blend of Malay, Chinese, Indian and European culture. The capital, Kuala Lumpur, combines colonial buildings and busy shopping districts such as Bukit Bintang with landmarks like the 451 m Petronas Twin Towers.",
    cities: [
      "Kuala Lumpur",
      "George Town of Penang",
      "Ipoh",
      "Johor Bahru",
      "Malacca City",
      "Kota Kinabalu",
      "Kuantan",
      "Alor Setar",
      "Tawau",
      "Sandakan",
    ],
    weather:
      "Malaysia has a tropical climate all year and is often humid. Temperatures usually range from 20°C to 30°C, with cooler weather in the highlands.",
    map: { bbox: "98.5,0.5,104.5,6.5", lat: 3.139, lng: 101.6869 },
  },
  travelRules: {
    beforeDeparture: [
      "Original passport including visa.",
      "Round air ticket printed copy (for tourist visa).",
      "eVisa printed copy (if there is an eVisa).",
      "Proof of accommodation.",
    ],
    afterArrival: [
      "Valid passport / travel document.",
      "Valid eVisa printout (eVisa note).",
      "Boarding pass / ticket / arrival pass if applicable.",
      "Confirmed return ticket if applicable.",
      "Proof of paid accommodation.",
      "Other supporting documents such as bank statement, current residing country pass / visa, and long-term pass.",
    ],
  },
  // Verify these contacts before publishing.
  embassies: [
    {
      name: "High Commission of Malaysia – Dhaka Office",
      address: "House No. 19, Road No. 6, Baridhara Diplomatic Enclave, Dhaka",
      phone: "+88 018 4708 2528",
      hours: "8:30 am – 4:30 pm",
    },
    {
      name: "Bangladesh High Commission – Kuala Lumpur Office",
      address: "No. 5B & 5C (Lot No. 9 & 10), Jalan Sultan Yahya Petra, 54100 Kuala Lumpur, Malaysia",
      phone: "+60326040949",
      email: "mission.kualalumpur@mofa.gov.bd",
    },
  ],
  countryInfo: [
    { label: "Capital", value: "Kuala Lumpur" },
    { label: "Currency", value: "Ringgit (RM) (MYR)" },
    { label: "Language", value: "Malay" },
    {
      label: "Religion",
      value:
        "61.3% Islam (official), 19.8% Buddhism, 9.2% Christianity, 6.3% Hinduism, 3.4% Chinese folk, 0.7% Unknown, 0.5% Others",
    },
    { label: "Population", value: "32,776,194" },
    { label: "Calling code", value: "+60" },
    { label: "Time zone", value: "UTC+8 (MST)" },
    { label: "Region", value: "Asia" },
    { label: "Best time to visit", value: "September to November" },
  ],
  disclaimer:
    "We are not liable for any delay in visa processing or for the approval or denial of any visa application, as this depends entirely on the Embassy. The Embassy reserves the right to ask for more evidence and to contact the applicant for an interview if required. Requirements are set by the embassy and can change without notice. Our team confirms the current checklist when you apply. Always verify before travel.",
};

/* ========================================================================== */
/* Catalogue                                                                  */
/* ========================================================================== */

type DestinationExtra = Partial<Pick<VisaDestination, "aliases" | "docs" | "guide">>;

function d(name: string, code: string, category: VisaCategory, extra: DestinationExtra = {}): VisaDestination {
  return { slug: slugify(name), name, code, category, ...extra };
}

// NOTE: categories for destinations that were not on the reference page
// (Thailand, Vietnam, India, Saudi Arabia, Indonesia, Japan, UK, US, Schengen,
// South Korea, Qatar) are best-effort. Verify them with your visa team.
export const visaDestinations: VisaDestination[] = [
  // ---- e-Visa -------------------------------------------------------------
  d("Australia", "au", "evisa"),
  d("Cambodia", "kh", "evisa"),
  d("Ethiopia", "et", "evisa", {
    docs: [
      "Passport copy",
      "Round air tickets",
      "Proof of accommodation (soft copy only)",
      "e-Visa holders must arrive via Addis Ababa Bole International Airport.",
      DIPLOMATIC,
    ],
  }),
  d("Kenya", "ke", "evisa", {
    docs: [
      "Passport copy",
      "Passport size photo",
      "Visa application form",
      "Accommodation proof",
      "Round air tickets (soft copy only)",
    ],
  }),
  d("Malaysia", "my", "evisa", {
    aliases: ["Kuala Lumpur"],
    docs: [
      "Passport",
      "All documents required as per checklist (soft copy only).",
      "No visa required for Diplomatic and Official Passport holders up to 30 days.",
    ],
    guide: MALAYSIA_GUIDE,
  }),
  d("Singapore", "sg", "evisa", {
    docs: ["Passport", "All documents required as per checklist (soft copy and hard copy both required)."],
  }),
  d("Turkey", "tr", "evisa", { aliases: ["Türkiye", "Istanbul"] }),
  d("United Arab Emirates", "ae", "evisa", { aliases: ["UAE", "Dubai", "Abu Dhabi"] }),
  d("Uzbekistan", "uz", "evisa"),
  d("Thailand", "th", "evisa", { aliases: ["Bangkok", "Phuket", "Pattaya"] }),
  d("Vietnam", "vn", "evisa", { aliases: ["Hanoi", "Ho Chi Minh"] }),
  d("Albania", "al", "evisa", {
    docs: [
      "Passport",
      "Round air tickets",
      "Proof of accommodation (soft copy only)",
      "Must have a valid Schengen visa/residence permit or a visa of OECD country/residence permit.",
    ],
  }),
  d("Angola", "ao", "evisa", {
    docs: ["Passport", "Round air tickets", "Proof of accommodation.", "Visa on arrival for the USA visa holders."],
  }),
  d("Antigua And Barbuda", "ag", "evisa", {
    docs: [
      "Passport",
      "Round air tickets",
      "Accommodation bookings (soft copy only)",
      "Visa on arrival for the Canada, UK, Schengen visa holders.",
    ],
  }),

  // ---- Sticker visa ---------------------------------------------------------
  d("Austria", "at", "sticker"),
  d("Belgium", "be", "sticker", { docs: [...DEFAULT_DOCS.sticker, DIPLOMATIC] }),
  d("Brazil", "br", "sticker", { docs: [...DEFAULT_DOCS.sticker, DIPLOMATIC] }),
  d("Canada", "ca", "sticker"),
  d("China", "cn", "sticker", { aliases: ["Beijing", "Shanghai", "Guangzhou"] }),
  d("Czech Republic", "cz", "sticker", { aliases: ["Czechia", "Prague"] }),
  d("Denmark", "dk", "sticker"),
  d("Egypt", "eg", "sticker", {
    docs: [
      ...DEFAULT_DOCS.sticker,
      "Visa on arrival for Japan, Canada, Australia, New Zealand, the United States, the United Kingdom and Schengen visa or residence permit holders.",
    ],
  }),
  d("Estonia", "ee", "sticker"),
  d("Finland", "fi", "sticker"),
  d("France", "fr", "sticker", { aliases: ["Paris"] }),
  d("Germany", "de", "sticker", { aliases: ["Berlin"] }),
  d("India", "in", "sticker", { aliases: ["Delhi", "Kolkata", "Mumbai"] }),
  d("Saudi Arabia", "sa", "sticker", { aliases: ["KSA", "Riyadh", "Jeddah"] }),
  d("Indonesia", "id", "sticker", { aliases: ["Bali", "Jakarta"] }),
  d("Japan", "jp", "sticker", { aliases: ["Tokyo", "Osaka"] }),
  d("United Kingdom", "gb", "sticker", { aliases: ["UK", "Britain", "England", "London"] }),
  d("United States", "us", "sticker", { aliases: ["USA", "US", "America"] }),
  d("Schengen", "eu", "sticker", { aliases: ["Europe", "Schengen area"] }),
  d("South Korea", "kr", "sticker", { aliases: ["Korea", "Seoul"] }),
  d("Qatar", "qa", "sticker", { aliases: ["Doha"] }),

  // ---- Visa on arrival ------------------------------------------------------
  d("Bhutan", "bt", "arrival", { docs: ["Passport", "Travel itinerary", "Proof of accommodation"] }),
  d("Maldives", "mv", "arrival", { docs: ["Passport", "Travel itinerary", "Proof of accommodation."] }),
  d("Nepal", "np", "arrival", { aliases: ["Kathmandu"], docs: ["Passport", "Travel itinerary", "Proof of accommodation."] }),
  d("Sri Lanka", "lk", "arrival", {
    aliases: ["Srilanka", "Colombo"],
    docs: ["Passport", "Confirmed hotel booking", "Confirmed return ticket", "50 USD payment at airport"],
  }),
  d("Bahamas", "bs", "arrival", {
    docs: [
      "Passport",
      "Round air tickets",
      "Proof of accommodation",
      "A completed Bahamas Immigration Disembarkation/Embarkation Card",
    ],
  }),
  d("Barbados", "bb", "arrival", {
    docs: ["Passport", "Round air tickets", "Proof of accommodation.", "Requires USA visa"],
  }),
  d("British Virgin Islands", "vg", "arrival", {
    docs: ["Passport", "Round air tickets", "Proof of accommodation.", "Visa on arrival for the USA and UK visa holders."],
  }),
  d("Burundi", "bi", "arrival", {
    docs: [
      "Passport",
      "Round air tickets",
      "Proof of accommodation.",
      "From December 2021, passengers of all countries that required a visa can obtain visa on arrival at Bujumbura International Airport and all land borders.",
    ],
  }),
  d("Cape Verde", "cv", "arrival"),
  d("Comoros", "km", "arrival"),
  d("Cook Islands", "ck", "arrival"),
  d("Djibouti", "dj", "arrival", {
    docs: [
      "Passport",
      "Passport size photo",
      "Visa application form",
      "Proof of accommodation (soft copy only)",
      "Round air tickets",
      "Invitation letter (if any)",
    ],
  }),
];

export const POPULAR_SLUGS: string[] = [
  "malaysia",
  "thailand",
  "singapore",
  "united-arab-emirates",
  "india",
  "saudi-arabia",
  "turkey",
  "vietnam",
  "indonesia",
  "china",
  "japan",
  "united-kingdom",
];

/* ========================================================================== */
/* Helpers                                                                    */
/* ========================================================================== */

const bySlug = new Map(visaDestinations.map((item) => [item.slug, item]));

export function getVisaDestination(slug: string): VisaDestination | undefined {
  return bySlug.get(slug.toLowerCase());
}

export function getDestinationDocs(destination: VisaDestination): string[] {
  return destination.docs ?? DEFAULT_DOCS[destination.category];
}

export function getPopularDestinations(): VisaDestination[] {
  return POPULAR_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (item): item is VisaDestination => item !== undefined,
  );
}

export function getRelatedDestinations(slug: string, limit = 4): VisaDestination[] {
  const base = bySlug.get(slug);
  if (!base) return [];
  return visaDestinations.filter((item) => item.slug !== slug && item.category === base.category).slice(0, limit);
}

/** Lowercase, strip accents/punctuation, collapse whitespace. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Ranked search over name + aliases. Empty query returns the full list. */
export function searchVisaDestinations(query: string, list: VisaDestination[] = visaDestinations): VisaDestination[] {
  const q = normalize(query);
  if (!q) return list;

  const scored: { item: VisaDestination; score: number }[] = [];
  for (const item of list) {
    const name = normalize(item.name);
    const aliases = (item.aliases ?? []).map(normalize);
    let score = 0;
    if (name === q || aliases.includes(q)) score = 100;
    else if (name.startsWith(q)) score = 80;
    else if (aliases.some((a) => a.startsWith(q))) score = 70;
    else if (name.split(" ").some((word) => word.startsWith(q))) score = 60;
    else if (name.includes(q) || aliases.some((a) => a.includes(q))) score = 40;
    if (score > 0) scored.push({ item, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
    .map((entry) => entry.item);
}

/** Exact match on name or alias (used when the user typed a full name). */
export function findExactDestination(query: string): VisaDestination | undefined {
  const q = normalize(query);
  if (!q) return undefined;
  return visaDestinations.find(
    (item) => normalize(item.name) === q || (item.aliases ?? []).some((a) => normalize(a) === q),
  );
}
import type {
  PromoBanner,
  HotDeal,
  HotelListing,
  Destination,
  TrendingDestination,
  HolidayPackage,
  Airline,
  Route,
  StatItem,
  BlogPost,
  HelpTile,
  TrustBadgeItem,
} from "@/features/home/types";

/**
 * Static mock data, typed as future API responses (see types.ts).
 * Swap each export for a `fetch()`/server action once real endpoints exist —
 * section components already accept this shape as props.
 */

export const trustBadges: TrustBadgeItem[] = [
  { id: "support", label: "24/7 Support", description: "Real humans, day or night" },
  { id: "secure", label: "Secure Payment", description: "PCI-DSS compliant checkout" },
  { id: "price", label: "Best Price Guarantee", description: "We match a lower fare" },
  { id: "award", label: "Award-Winning", description: "Recognized travel platform" },
];

export const promoBanners: PromoBanner[] = [
  {
    id: "promo-1",
    title: "Up to 18% off international flights",
    subtitle: "City Bank American Express cards · Till 31 Dec",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    href: "/offers/amex-international",
  },
  {
    id: "promo-2",
    title: "BDT 4,000 off with Eastern Bank",
    subtitle: "Min. purchase BDT 40,000 · Till 19 Aug",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80",
    href: "/offers/ebl-discount",
  },
  {
    id: "promo-3",
    title: "Sylhet getaway fares from BDT 2,499",
    subtitle: "Limited seats, book before month end",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80",
    href: "/offers/sylhet-fares",
  },
  {
    id: "promo-4",
    title: "Free consultation for study-abroad visas",
    subtitle: "Talk to a visa specialist today",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    href: "/offers/study-visa",
  },
];

export const helpTiles: HelpTile[] = [
  {
    id: "help-flight",
    title: "How to book a flight",
    thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    href: "/help/how-to-book-flight",
  },
  {
    id: "help-hotel",
    title: "How to book a hotel",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    href: "/help/how-to-book-hotel",
  },
  {
    id: "help-discount",
    title: "How to get the best discounts",
    thumbnail: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80",
    href: "/help/how-to-get-discounts",
  },
];

export const hotDeals: HotDeal[] = [
  {
    id: "deal-1",
    bankLogo: "City Bank",
    bankName: "City Bank Amex",
    discountLabel: "Up to 18%",
    title: "Up to 18% Discount on Int'l Flight Bookings",
    description: "On base fare, for City Bank American Express Platinum & Gold cards.",
    promoCode: "AMEX0126",
    expiresAt: "2026-12-31",
    href: "/offers/amex0126",
  },
  {
    id: "deal-2",
    bankLogo: "Eastern Bank",
    bankName: "Eastern Bank PLC",
    discountLabel: "BDT 4,000",
    title: "Up to BDT 4,000 Discount on Int'l Flight Bookings",
    description: "On total fare, for EBL Visa credit cards. Min purchase BDT 40,000.",
    promoCode: "EINT0726",
    expiresAt: "2026-08-19",
    href: "/offers/eint0726",
  },
  {
    id: "deal-3",
    bankLogo: "Dhaka Bank",
    bankName: "Dhaka Bank PLC",
    discountLabel: "12%",
    title: "12% Discount on Domestic & Int'l Bookings",
    description: "For all Dhaka Bank Visa and Mastercard holders.",
    promoCode: "DINT0726",
    expiresAt: "2026-09-30",
    href: "/offers/dint0726",
  },
  {
    id: "deal-4",
    bankLogo: "bKash",
    bankName: "bKash Wallet",
    discountLabel: "BDT 500 Cashback",
    title: "Cashback on Hotel Bookings via bKash",
    description: "Pay with bKash and get instant cashback on any hotel booking.",
    promoCode: "BKASH500",
    expiresAt: "2026-10-15",
    href: "/offers/bkash500",
  },
];

export const popularHotels: HotelListing[] = [
  {
    id: "hotel-1",
    name: "Seagull Hotel",
    location: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    rating: 4.4,
    reviewCount: 612,
    priceFrom: 4500,
    href: "/hotels/seagull-hotel",
  },
  {
    id: "hotel-2",
    name: "Ramada by Wyndham",
    location: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    rating: 4.6,
    reviewCount: 845,
    priceFrom: 7200,
    href: "/hotels/ramada-wyndham-coxs-bazar",
  },
  {
    id: "hotel-3",
    name: "Neeshorgo Hotel Resort",
    location: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    rating: 4.2,
    reviewCount: 301,
    priceFrom: 3800,
    href: "/hotels/neeshorgo-hotel-resort",
  },
  {
    id: "hotel-4",
    name: "Windy Terrace Hotel",
    location: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    rating: 4.7,
    reviewCount: 428,
    priceFrom: 9100,
    href: "/hotels/windy-terrace-hotel",
  },
];

export const trendingDestinations: TrendingDestination[] = [
  {
    id: "trend-kl",
    city: "Kuala Lumpur",
    countryFlag: "🇲🇾",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80",
    href: "/destinations/kuala-lumpur",
    featured: true,
  },
  {
    id: "trend-dhaka",
    city: "Dubai",
    countryFlag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    href: "/destinations/dubai",
    featured: true,
  },
  {
    id: "trend-bangkok",
    city: "Bangkok",
    countryFlag: "🇹🇭",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    href: "/destinations/bangkok",
  },
  {
    id: "trend-coxsbazar",
    city: "Male",
    countryFlag: "🇲🇻",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    href: "/destinations/male",
  },
  {
    id: "trend-kathmandu",
    city: "Kathmandu",
    countryFlag: "🇳🇵",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    href: "/destinations/kathmandu",
  },
];

export const holidayPackages: HolidayPackage[] = [
  {
    id: "package-male",
    city: "Male",
    priceFrom: 13500,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    href: "/tours/male",
  },
  {
    id: "package-kl",
    city: "Kuala Lumpur",
    priceFrom: 11999,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    href: "/tours/kuala-lumpur",
  },
  {
    id: "package-bangkok",
    city: "Bangkok",
    priceFrom: 9000,
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    href: "/tours/bangkok",
  },
  {
    id: "package-singapore",
    city: "Singapore",
    priceFrom: 19000,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    href: "/tours/singapore",
  },
  {
    id: "package-phuket",
    city: "Phuket",
    priceFrom: 15200,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    href: "/tours/phuket",
  },
  {
    id: "package-dubai",
    city: "Dubai",
    priceFrom: 24500,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    href: "/tours/dubai",
  },
];

export const topDestinations: Destination[] = [
  {
    id: "dest-dhaka",
    city: "Dhaka",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1000&q=80",
    hotelsAvailable: 85,
    href: "/destinations/dhaka",
  },
  {
    id: "dest-sreemangal",
    city: "Sreemangal",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&q=80",
    hotelsAvailable: 6,
    href: "/destinations/sreemangal",
  },
  {
    id: "dest-gazipur",
    city: "Gazipur",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1000&q=80",
    hotelsAvailable: 12,
    href: "/destinations/gazipur",
  },
  {
    id: "dest-coxsbazar",
    city: "Cox's Bazar",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1000&q=80",
    hotelsAvailable: 97,
    href: "/destinations/coxs-bazar",
  },
  {
    id: "dest-sylhet",
    city: "Sylhet",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?w=1000&q=80",
    hotelsAvailable: 44,
    href: "/destinations/sylhet",
  },
  {
    id: "dest-bandarban",
    city: "Bandarban",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1000&q=80",
    hotelsAvailable: 18,
    href: "/destinations/bandarban",
  },
];

export const topAirlines: Airline[] = [
  { id: "biman", name: "Biman Bangladesh Airlines", logo: "Biman", href: "/flights?airline=biman" },
  { id: "usbangla", name: "US-Bangla Airlines", logo: "US-Bangla", href: "/flights?airline=usbangla" },
  { id: "novoair", name: "NOVOAIR", logo: "NOVOAIR", href: "/flights?airline=novoair" },
  { id: "airastra", name: "Air Astra", logo: "Air Astra", href: "/flights?airline=airastra" },
  { id: "emirates", name: "Emirates", logo: "Emirates", href: "/flights?airline=emirates" },
  { id: "qatar", name: "Qatar Airways", logo: "Qatar Airways", href: "/flights?airline=qatar" },
  { id: "singapore", name: "Singapore Airlines", logo: "Singapore Airlines", href: "/flights?airline=singapore" },
  { id: "malaysia", name: "Malaysia Airlines", logo: "Malaysia Airlines", href: "/flights?airline=malaysia" },
  { id: "airindia", name: "Air India", logo: "Air India", href: "/flights?airline=airindia" },
  { id: "turkish", name: "Turkish Airlines", logo: "Turkish Airlines", href: "/flights?airline=turkish" },
];

export const popularRoutes: Route[] = [
  { id: "r1", originCity: "Dhaka", originCode: "DAC", destinationCity: "Cox's Bazar", destinationCode: "CXB", type: "domestic", href: "/flights?from=DAC&to=CXB" },
  { id: "r2", originCity: "Dhaka", originCode: "DAC", destinationCity: "Sylhet", destinationCode: "ZYL", type: "domestic", href: "/flights?from=DAC&to=ZYL" },
  { id: "r3", originCity: "Dhaka", originCode: "DAC", destinationCity: "Jashore", destinationCode: "JSR", type: "domestic", href: "/flights?from=DAC&to=JSR" },
  { id: "r4", originCity: "Dhaka", originCode: "DAC", destinationCity: "Barisal", destinationCode: "BZL", type: "domestic", href: "/flights?from=DAC&to=BZL" },
  { id: "r5", originCity: "Dhaka", originCode: "DAC", destinationCity: "Saidpur", destinationCode: "SPD", type: "domestic", href: "/flights?from=DAC&to=SPD" },
  { id: "r6", originCity: "Dhaka", originCode: "DAC", destinationCity: "Chattogram", destinationCode: "CGP", type: "domestic", href: "/flights?from=DAC&to=CGP" },
  { id: "r7", originCity: "Dhaka", originCode: "DAC", destinationCity: "Dubai", destinationCode: "DXB", type: "international", href: "/flights?from=DAC&to=DXB" },
  { id: "r8", originCity: "Dhaka", originCode: "DAC", destinationCity: "Singapore", destinationCode: "SIN", type: "international", href: "/flights?from=DAC&to=SIN" },
  { id: "r9", originCity: "Dhaka", originCode: "DAC", destinationCity: "Kuala Lumpur", destinationCode: "KUL", type: "international", href: "/flights?from=DAC&to=KUL" },
  { id: "r10", originCity: "Dhaka", originCode: "DAC", destinationCity: "Bangkok", destinationCode: "BKK", type: "international", href: "/flights?from=DAC&to=BKK" },
  { id: "r11", originCity: "Dhaka", originCode: "DAC", destinationCity: "Doha", destinationCode: "DOH", type: "international", href: "/flights?from=DAC&to=DOH" },
  { id: "r12", originCity: "Dhaka", originCode: "DAC", destinationCity: "London", destinationCode: "LHR", type: "international", href: "/flights?from=DAC&to=LHR" },
];

export const stats: StatItem[] = [
  { id: "years", label: "Years of Excellence", value: 10, suffix: "+" },
  { id: "clients", label: "Happy Clients", value: 742930, suffix: "+" },
  { id: "travellers", label: "Happy Travellers", value: 3380000, suffix: "+" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "A First-Timer's Guide to Cox's Bazar",
    excerpt: "Everything to know before visiting the world's longest natural sea beach.",
    coverImage: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
    author: "Nusrat Jahan",
    publishedAt: "2026-08-01",
    href: "/blog/coxs-bazar-first-timer-guide",
  },
  {
    id: "blog-2",
    title: "5 Visa-Free Destinations for Bangladeshi Passport Holders",
    excerpt: "Plan your next trip without the visa hassle.",
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    author: "Tanvir Ahmed",
    publishedAt: "2026-07-22",
    href: "/blog/visa-free-destinations-bd",
  },
  {
    id: "blog-3",
    title: "How to Change Your Flight Booking Without Extra Fees",
    excerpt: "A step-by-step guide to rebooking smartly.",
    coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    author: "Zakar Hossan",
    publishedAt: "2026-07-15",
    href: "/blog/change-flight-without-fees",
  },
  {
    id: "blog-4",
    title: "Sylhet in Monsoon: Tea Gardens & Waterfalls Worth the Trip",
    excerpt: "Why the rainy season is the best time to visit Sylhet.",
    coverImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
    author: "Nusrat Jahan",
    publishedAt: "2026-07-07",
    href: "/blog/sylhet-monsoon-guide",
  },
];

export const partnerLogos: string[] = [
  "Biman Bangladesh",
  "US-Bangla",
  "NOVOAIR",
  "Emirates",
  "Qatar Airways",
  "Singapore Airlines",
  "Turkish Airlines",
  "Air India",
  "Malaysia Airlines",
  "Saudia",
];
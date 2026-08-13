import type { PackageCategory, PackageItem } from "@/features/packages/types";

export const hajjCategories: PackageCategory[] = [
  { value: "all", label: "All Packages" },
  { value: "pre-registration", label: "Pre-Registration" },
  { value: "non-shifting", label: "Non-Shifting" },
  { value: "shifting", label: "Shifting" },
  { value: "vip", label: "VIP / Premium" },
];

// NOTE: images reuse existing placeholder photo IDs from features/home/data —
// swap for real Hajj/Umrah photography before launch.
export const hajjPackages: PackageItem[] = [
  {
    id: "hajj-preregistration",
    category: "pre-registration",
    title: "Hajj Pre-Registration 2027-2028",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    durationDays: 0,
    priceFrom: 30000,
    href: "/hajj-packages/pre-registration",
    badge: "Reserve Now",
  },
  {
    id: "hajj-non-shifting-40",
    category: "non-shifting",
    title: "40 Days Non-Shifting Hajj Package",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    durationDays: 40,
    priceFrom: 700000,
    href: "/hajj-packages/40-days-non-shifting",
    nightsLabel: "Makkah + Madinah, fixed hotel",
  },
  {
    id: "hajj-shifting-40",
    category: "shifting",
    title: "40 Days Exclusive Shifting Hajj Package",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    durationDays: 40,
    priceFrom: 635000,
    href: "/hajj-packages/40-days-shifting",
    nightsLabel: "20N Makkah + 7N Madinah + 8N Ziyarah",
  },
  {
    id: "hajj-non-shifting-10",
    category: "non-shifting",
    title: "10 Days Non-Shifting Hajj Package",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    durationDays: 10,
    priceFrom: 580000,
    href: "/hajj-packages/10-days-non-shifting",
  },
  {
    id: "hajj-vip-14",
    category: "vip",
    title: "14 Days VIP Hajj Package",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    durationDays: 14,
    priceFrom: 950000,
    href: "/hajj-packages/14-days-vip",
    badge: "Premium",
  },
  {
    id: "hajj-economy-28",
    category: "non-shifting",
    title: "28 Days Economy Hajj Package",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
    durationDays: 28,
    priceFrom: 700000,
    href: "/hajj-packages/28-days-economy",
  },
];
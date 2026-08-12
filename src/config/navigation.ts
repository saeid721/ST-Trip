export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Umrah Packages", href: "/umrah-packages" },
  { label: "Hajj Packages", href: "/hajj-packages" },
  { label: "Tour Packages", href: "/tour-packages" },
  {
    label: "Others",
    href: "/others",
    children: [
      { label: "About", href: "/about" },
      { label: "Promotions", href: "/promotions" },
      { label: "Why STTrip?", href: "/why-sttrip" },
      { label: "Travel Guide", href: "/travel-guide" },
      { label: "Blog", href: "/blog" },
      { label: "News", href: "/news" },
      { label: "FAQ & Support", href: "/help/faq" },
      { label: "Business Class", href: "/business-class" },
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Our Offices", href: "/offices" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Flights", href: "/flights" },
      { label: "Hotels", href: "/hotels" },
      { label: "Tour Packages", href: "/tours" },
      { label: "Visa Assistance", href: "/visa" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "How to Book", href: "/help/how-to-book" },
      { label: "Payment Options", href: "/help/payment" },
      { label: "Refund Policy", href: "/help/refund-policy" },
      { label: "FAQs", href: "/help/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Refund Policy", href: "/legal/refunds" },
    ],
  },
];

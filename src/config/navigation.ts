export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Tours", href: "/tour" },
  { label: "Visa", href: "/visa" },
  { label: "Umrah", href: "/umrah" },
  { label: "Hajj", href: "/hajj" },
  { label: "eSIM", href: "/esim" },
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
      // { label: "Business Class", href: "/business-class" },
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
      { label: "Hotels", href: "/hotels" },
      { label: "Tour Packages", href: "/tours" },
      { label: "Visa Assistance", href: "/visa" },
      { label: "Umrah Packages", href: "/umrah" },
      { label: "Hajj Packages", href: "/hajj" },
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

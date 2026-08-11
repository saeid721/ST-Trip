export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Flights", href: "/flights" },
  { label: "Hotels", href: "/hotels" },
  { label: "Tours", href: "/tours" },
  { label: "Visa", href: "/visa" },
  { label: "Offers", href: "/offers" },
  { label: "Blog", href: "/blog" },
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

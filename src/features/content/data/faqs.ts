import type { FaqCategory, FaqEntry } from "@/features/content/types";

export const faqCategories: FaqCategory[] = [
  { value: "all", label: "All" },
  { value: "booking", label: "Booking" },
  { value: "payment", label: "Payment" },
  { value: "refund", label: "Refunds & Changes" },
  { value: "visa", label: "Visa" },
];

export const faqs: FaqEntry[] = [
  {
    category: "booking",
    question: "How do I book a flight or hotel on ST Trip?",
    answer:
      "Use the search widget on our homepage to select flights, hotels, tours, or visa services, choose your dates and travellers, then follow the checkout steps. You'll receive a confirmation by email and SMS immediately after payment.",
  },
  {
    category: "booking",
    question: "Can I book for someone else?",
    answer:
      "Yes. During checkout, simply enter the traveller's details instead of your own. Your contact information is used for booking confirmations and support only.",
  },
  {
    category: "payment",
    question: "What payment methods are accepted?",
    answer:
      "We accept Visa, Mastercard, American Express, bKash, Nagad, Rocket, and direct bank transfer from major Bangladeshi banks including BRAC Bank, City Bank and Dhaka Bank.",
  },
  {
    category: "payment",
    question: "Is it safe to pay online through ST Trip?",
    answer:
      "Yes. All payments are processed through a PCI-DSS compliant, SSLCommerz-secured checkout. We never store your full card details on our servers.",
  },
  {
    category: "refund",
    question: "Can I change or cancel my booking?",
    answer:
      "Most bookings can be changed or cancelled, subject to the airline's or hotel's fare rules. Log in to 'My Trips' or contact support, and we'll walk you through any applicable fees before you confirm.",
  },
  {
    category: "refund",
    question: "How long do refunds take to process?",
    answer:
      "Refunds are typically processed within 7-15 business days after approval, depending on your bank or mobile wallet provider's processing time.",
  },
  {
    category: "visa",
    question: "Does ST Trip help with visa applications?",
    answer:
      "Yes, our visa specialists assist with documentation, appointment scheduling, and application submission for a range of destinations, including Umrah and study-abroad visas.",
  },
  {
    category: "visa",
    question: "How early should I apply for a visa before travelling?",
    answer:
      "We recommend starting the process at least 4-6 weeks before your travel date, though timelines vary by country. Our team will confirm the exact requirement for your destination.",
  },
];
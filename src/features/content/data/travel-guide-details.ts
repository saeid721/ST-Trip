import type { TravelGuideDetail } from "@/features/content/types";

// Keyed by slug — matches the last path segment of each guide's `href`
// in travel-guides.ts. Add more entries here as you write up the rest;
// generateStaticParams() in the [slug] route reads these keys automatically.
export const travelGuideDetails: Record<string, TravelGuideDetail> = {
  "coxs-bazar": {
    slug: "coxs-bazar",
    title: "The Complete Cox's Bazar Travel Guide",
    subtitle: "Everything to know before visiting the world's longest natural sea beach",
    heroImage: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    ],
    region: "Bangladesh",
    readTime: "8 min read",
    author: "Nusrat Jahan",
    publishedAt: "2026-08-01",
    bestTimeToVisit: "November – March",
    intro:
      "Stretching over 120 kilometres along the Bay of Bengal, Cox's Bazar is Bangladesh's most-visited coastal destination — and for good reason. Whether you're after a relaxed beach holiday, fresh seafood, or a base to explore nearby hill tracts, here's everything you need to plan a smooth trip.",
    sections: [
      {
        heading: "Getting There",
        content:
          "Cox's Bazar has its own airport with daily direct flights from Dhaka (roughly 50 minutes) operated by Biman Bangladesh Airlines, US-Bangla, and NOVOAIR. If you prefer overland travel, comfortable AC coaches run overnight from Dhaka's Saidabad terminal, taking around 9-10 hours. Booking flights during winter (peak season) at least 2-3 weeks ahead is strongly recommended.",
      },
      {
        heading: "Where to Stay",
        content:
          "Accommodation ranges from budget guesthouses near Laboni Beach to resort-style hotels along Marine Drive with private beach access. For first-time visitors, staying near Sugandha or Laboni Point puts you within walking distance of restaurants and the main beach promenade. If you want quiet and scenery, hotels further along Marine Drive toward Himchari offer better views with a short rickshaw ride into town.",
      },
      {
        heading: "What to Do",
        content:
          "Beyond relaxing on the beach, don't miss Himchari National Park for waterfalls and hilltop views, Inani Beach for calmer water and fewer crowds, and a day trip to Saint Martin's Island (weather permitting, typically November–March). Sunset at Laboni Point and fresh grilled seafood at the beachside stalls are essentials.",
      },
      {
        heading: "Food to Try",
        content:
          "Cox's Bazar is known for its seafood — try grilled fish, crab curry, and dried fish (shutki) prepared in the local style. Beachside stalls near Sugandha Point offer fresh catches grilled to order; agree on the price before ordering.",
      },
    ],
    tips: [
      "Book hotels early for winter weekends (Nov–Feb) — rooms sell out fast",
      "Carry cash; card acceptance is limited outside major hotels",
      "Avoid swimming during monsoon season (Jun–Sep) due to strong currents",
      "Negotiate rickshaw and beach-chair prices before use",
    ],
    faqs: [
      {
        question: "How many days should I spend in Cox's Bazar?",
        answer:
          "3-4 days is ideal — enough time to relax on the beach, visit Himchari, and fit in a day trip to Inani Beach or Saint Martin's Island if the season allows.",
      },
      {
        question: "Is Cox's Bazar suitable for families with young children?",
        answer:
          "Yes. Many hotels offer family rooms and the main beach areas near Laboni and Sugandha Point are well-patrolled with lifeguard presence during peak season.",
      },
    ],
  },

  malaysia: {
    slug: "malaysia",
    title: "First-Time Visitor's Guide to Malaysia",
    subtitle: "Visa requirements, currency tips, and a 5-day Kuala Lumpur & Penang itinerary",
    heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
    ],
    region: "Southeast Asia",
    readTime: "10 min read",
    author: "Tanvir Ahmed",
    publishedAt: "2026-07-10",
    bestTimeToVisit: "December – February",
    intro:
      "Malaysia is one of the most accessible and rewarding first international trips for Bangladeshi travellers — direct flights, a straightforward e-visa process, and a mix of city skylines, rainforest, and island beaches all within a few hours of each other.",
    sections: [
      {
        heading: "Visa & Entry Requirements",
        content:
          "Bangladeshi passport holders need an e-Visa for Malaysia, processed online in 3-5 business days. You'll need a valid passport with 6+ months validity, a passport-sized photo, and proof of onward travel. Our visa desk can handle the full application on your behalf.",
      },
      {
        heading: "Currency & Costs",
        content:
          "The Malaysian Ringgit (MYR) is the local currency. ATMs are widely available in Kuala Lumpur and Penang, and most hotels, malls and restaurants accept cards. A comfortable daily budget for food and local transport runs around MYR 150-250 per person.",
      },
      {
        heading: "5-Day Itinerary",
        content:
          "Days 1-3: Kuala Lumpur — Petronas Towers, Batu Caves, Bukit Bintang shopping, and a night food tour in Jalan Alor. Days 4-5: Penang — George Town's UNESCO street art and heritage architecture, followed by hawker-stall hopping for some of Southeast Asia's best street food.",
      },
      {
        heading: "Getting Around",
        content:
          "Kuala Lumpur's LRT and MRT systems are clean, affordable, and cover most tourist areas. For Penang, Grab (ride-hailing) is the easiest way to get around George Town and the island's beaches.",
      },
    ],
    tips: [
      "Apply for your e-Visa at least a week before departure",
      "Download the Grab app before you land — it's the easiest way to get around",
      "Friday afternoons see many shops close briefly for prayer — plan accordingly",
      "Try the KL–Penang route by domestic flight (45 min) rather than road for a short trip",
    ],
    faqs: [
      {
        question: "Do I need a separate visa to visit both Kuala Lumpur and Penang?",
        answer:
          "No — Malaysia's e-Visa covers the entire country, so you can travel freely between Kuala Lumpur, Penang, and other states on a single visa.",
      },
      {
        question: "Is Malaysia budget-friendly for a first international trip?",
        answer:
          "Yes, particularly compared to many other international destinations. Hawker food, public transport, and mid-range hotels keep daily costs manageable.",
      },
    ],
  },
};
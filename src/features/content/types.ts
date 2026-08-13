export interface ValueItem {
  id: string;
  icon: "shield" | "heart" | "compass" | "sparkles";
  title: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface ReasonItem {
  id: string;
  icon: "price" | "support" | "secure" | "expert" | "network" | "speed";
  title: string;
  description: string;
}

export interface TravelGuideItem {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  region: string;
  readTime: string;
  href: string;
}

export interface GuideSection {
  heading: string;
  content: string;
}

export interface TravelGuideDetail {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  gallery?: string[];
  region: string;
  readTime: string;
  author: string;
  publishedAt: string;
  bestTimeToVisit?: string;
  intro: string;
  sections: GuideSection[];
  tips: string[];
  faqs?: { question: string; answer: string }[];
}

export interface BlogCategory {
  value: string;
  label: string;
}

export interface BlogPostItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  href: string;
}

export interface NewsItem {
  id: string;
  tag: string;
  title: string;
  summary: string;
  coverImage: string;
  publishedAt: string;
  href: string;
}

export interface FaqCategory {
  value: string;
  label: string;
}

export interface FaqEntry {
  category: string;
  question: string;
  answer: string;
}
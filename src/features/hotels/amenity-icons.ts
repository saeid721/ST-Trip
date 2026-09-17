import type { LucideIcon } from "lucide-react";
import {
  Anchor, Bath, Beer, Coffee, DoorClosed, Dumbbell, Landmark, Lock,
  MapPin, PlaneTakeoff, Phone, Refrigerator, Shirt, Snowflake, Sofa,
  Sparkles, ShieldCheck, Thermometer, Tv, Waves, Wifi, Wind, Check,
} from "lucide-react";

const AMENITY_ICON_RULES: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["wifi"], icon: Wifi },
  { keywords: ["a/c", "ac", "air condition"], icon: Snowflake },
  { keywords: ["breakfast", "tea", "coffee"], icon: Coffee },
  { keywords: ["pool"], icon: Waves },
  { keywords: ["gym", "fitness"], icon: Dumbbell },
  { keywords: ["lobby", "sofa"], icon: Sofa },
  { keywords: ["security"], icon: ShieldCheck },
  { keywords: ["airport"], icon: PlaneTakeoff },
  { keywords: ["city center"], icon: Landmark },
  { keywords: ["beach"], icon: Anchor },
  { keywords: ["bar"], icon: Beer },
  { keywords: ["tv"], icon: Tv },
  { keywords: ["fridge", "mini bar"], icon: Refrigerator },
  { keywords: ["almira"], icon: DoorClosed },
  { keywords: ["toilet"], icon: Bath },
  { keywords: ["hot water"], icon: Thermometer },
  { keywords: ["water"], icon: Bath },
  { keywords: ["phone"], icon: Phone },
  { keywords: ["mirror", "housekeeping"], icon: Sparkles },
  { keywords: ["hair dryer"], icon: Wind },
  { keywords: ["safe box"], icon: Lock },
  { keywords: ["iron"], icon: Shirt },
  { keywords: ["car rental", "car"], icon: MapPin },
  { keywords: ["hot tub"], icon: Bath },
  { keywords: ["laundry"], icon: Shirt },
];

export function getAmenityIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();
  const rule = AMENITY_ICON_RULES.find((entry) => entry.keywords.some((k) => normalized.includes(k)));
  return rule?.icon ?? Check;
}
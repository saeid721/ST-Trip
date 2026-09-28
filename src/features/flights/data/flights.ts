export interface FlightSegment {
  from: string;
  fromCity?: string;
  fromAirport?: string;
  to: string;
  toCity?: string;
  toAirport?: string;
  departTime: string;
  departDate: string;
  arriveTime: string;
  arriveDate: string;
  durationLabel: string;
  flightNo: string;
  aircraft?: string;
  seats?: number;
  layoverAfter?: string;
}

export interface FlightOffer {
  id: string;
  airlineId: string;
  airline: string;
  airlineCode: string;
  flightNo: string;
  departTime: string;
  departDate: string;
  arriveTime: string;
  arriveDate: string;
  from: string;
  to: string;
  durationMin: number;
  stops: number;
  layoverAt?: string;
  layoverLabel?: string;
  price: number;
  baggageKg: number;
  refundable: boolean;
  seats: number;
  segments: FlightSegment[];
}

/* ------------------------------------------------------------------ */
/* Reference data                                                      */
/* ------------------------------------------------------------------ */

export const airports: Record<string, { city: string; name: string }> = {
  DAC: { city: "Dhaka", name: "Hazrat Shahjalal International Airport" },
  CXB: { city: "Cox's Bazar", name: "Cox's Bazar Airport" },
  ZYL: { city: "Sylhet", name: "Osmani International Airport" },
  JSR: { city: "Jashore", name: "Jashore Airport" },
  BZL: { city: "Barisal", name: "Barisal Airport" },
  SPD: { city: "Saidpur", name: "Saidpur Airport" },
  CGP: { city: "Chattogram", name: "Shah Amanat International Airport" },
  DXB: { city: "Dubai", name: "Dubai International Airport" },
  SIN: { city: "Singapore", name: "Changi Airport" },
  KUL: { city: "Kuala Lumpur", name: "Kuala Lumpur International Airport" },
  BKK: { city: "Bangkok", name: "Suvarnabhumi Airport" },
  DOH: { city: "Doha", name: "Hamad International Airport" },
  LHR: { city: "London", name: "Heathrow Airport" },
  MED: { city: "Medina", name: "Prince Mohammad bin Abdulaziz Airport" },
  CCU: { city: "Kolkata", name: "Netaji Subhas Chandra Bose International Airport" },
  DEL: { city: "Delhi", name: "Indira Gandhi International Airport" },
  HYD: { city: "Hyderabad", name: "Rajiv Gandhi International Airport" },
  BOM: { city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International Airport" },
  AUH: { city: "Abu Dhabi", name: "Zayed International Airport" },
  SHJ: { city: "Sharjah", name: "Sharjah International Airport" },
  BAH: { city: "Bahrain", name: "Bahrain International Airport" },
  KWI: { city: "Kuwait City", name: "Kuwait International Airport" },
  JED: { city: "Jeddah", name: "King Abdulaziz International Airport" },
  IST: { city: "Istanbul", name: "Istanbul Airport" },
  CMB: { city: "Colombo", name: "Bandaranaike International Airport" },
};

const ap = (code: string) => airports[code] ?? { city: code, name: code };

// Standard UTC offsets in minutes (London BST handled in tz()).
const TZ: Record<string, number> = {
  DAC: 360, CXB: 360, ZYL: 360, JSR: 360, BZL: 360, SPD: 360, CGP: 360,
  DXB: 240, AUH: 240, SHJ: 240, DOH: 180, BAH: 180, KWI: 180, JED: 180, MED: 180, IST: 180,
  CCU: 330, DEL: 330, HYD: 330, BOM: 330, CMB: 330,
  SIN: 480, KUL: 480, BKK: 420, LHR: 0,
};
const tz = (code: string, date: string) =>
  code === "LHR" ? (date >= "2026-10-25" && date < "2027-03-28" ? 0 : 60) : (TZ[code] ?? 0);

interface AirlineInfo {
  name: string;
  code: string;
  logo: string;
  bag: number[];
  jets: string[];
  dom?: string[];
  refund: number;
  fare: number;
}

const AIRLINES: Record<string, AirlineInfo> = {
  bg: { name: "Biman Bangladesh Airlines", code: "BG", logo: "/images/airlines/biman.png", bag: [30, 35], jets: ["Boeing 787-8", "Boeing 777-300ER", "Boeing 737-800"], dom: ["Boeing 737-800", "Dash 8-400"], refund: 0.85, fare: 0.98 },
  usbangla: { name: "US-Bangla Airlines", code: "BS", logo: "/images/airlines/us-bangla.png", bag: [20, 30], jets: ["Boeing 737-800"], dom: ["ATR 72-600", "Dash 8-400", "Boeing 737-800"], refund: 0.7, fare: 1.0 },
  novoair: { name: "NOVOAIR", code: "VQ", logo: "/images/airlines/novoair.png", bag: [20], jets: ["ATR 72-500"], dom: ["ATR 72-500", "ATR 72-600"], refund: 0.6, fare: 0.95 },
  emirates: { name: "Emirates", code: "EK", logo: "/images/airlines/emirates.png", bag: [30, 35], jets: ["Boeing 777-300ER", "Airbus A380-800"], refund: 0.9, fare: 1.18 },
  qatar: { name: "Qatar Airways", code: "QR", logo: "/images/airlines/qatar.png", bag: [25, 30], jets: ["Airbus A350-900", "Boeing 787-8", "Airbus A320-200"], refund: 0.85, fare: 1.12 },
  singapore: { name: "Singapore Airlines", code: "SQ", logo: "/images/airlines/singapore.png", bag: [30], jets: ["Airbus A350-900", "Boeing 787-10", "Airbus A330-300"], refund: 0.9, fare: 1.2 },
  malaysia: { name: "Malaysia Airlines", code: "MH", logo: "/images/airlines/malaysia.png", bag: [25, 30], jets: ["Airbus A330-300", "Boeing 737-800"], refund: 0.8, fare: 1.0 },
  turkish: { name: "Turkish Airlines", code: "TK", logo: "/images/airlines/turkish.png", bag: [30], jets: ["Airbus A321neo", "Airbus A330-300", "Boeing 787-9"], refund: 0.85, fare: 1.05 },
  airarabia: { name: "Air Arabia", code: "G9", logo: "/images/airlines/air-arabia.png", bag: [20, 30], jets: ["Airbus A320-200"], refund: 0.4, fare: 0.82 },
  airasia: { name: "AirAsia", code: "AK", logo: "/images/airlines/airasia.png", bag: [20, 30], jets: ["Airbus A320-200", "Airbus A330-300"], refund: 0.3, fare: 0.78 },
  etihad: { name: "Etihad Airways", code: "EY", logo: "/images/airlines/etihad.png", bag: [30, 35], jets: ["Boeing 787-9", "Airbus A320-200"], refund: 0.9, fare: 1.1 },
  flydubai: { name: "Flydubai", code: "FZ", logo: "/images/airlines/flydubai.png", bag: [20, 30], jets: ["Boeing 737 MAX 8", "Boeing 737-800"], refund: 0.5, fare: 0.9 },
  gulf: { name: "Gulf Air", code: "GF", logo: "/images/airlines/gulf.png", bag: [30], jets: ["Airbus A320-200", "Boeing 787-9"], refund: 0.85, fare: 0.98 },
  indigo: { name: "IndiGo", code: "6E", logo: "/images/airlines/indigo.png", bag: [20, 30], jets: ["Airbus A320neo", "Airbus A321neo"], refund: 0.25, fare: 0.85 },
  kuwait: { name: "Kuwait Airways", code: "KU", logo: "/images/airlines/kuwait.png", bag: [30], jets: ["Airbus A320neo", "Boeing 777-300ER"], refund: 0.8, fare: 0.98 },
  saudia: { name: "Saudia", code: "SV", logo: "/images/airlines/saudi.png", bag: [30, 35], jets: ["Airbus A330-300", "Boeing 777-300ER"], refund: 0.85, fare: 1.0 },
  srilankan: { name: "SriLankan Airlines", code: "UL", logo: "/images/airlines/srilankan.png", bag: [25, 30], jets: ["Airbus A330-300", "Airbus A320-200"], refund: 0.75, fare: 0.92 },
  thai: { name: "Thai Airways", code: "TG", logo: "/images/airlines/thai.png", bag: [30], jets: ["Airbus A350-900", "Boeing 787-8", "Airbus A320-200"], refund: 0.85, fare: 1.03 },
};

export const airlineLogos: Record<string, string> = Object.fromEntries(
  Object.values(AIRLINES).map((a) => [a.name, a.logo]),
);

/* ------------------------------------------------------------------ */
/* Routes: carrier = [airlineId, optional connecting hubs]             */
/* ------------------------------------------------------------------ */

type Carrier = [string, string[]?];
interface RouteDef {
  from: string;
  to: string;
  directMin: number;
  baseFare: number;
  carriers: Carrier[];
}

const DOM: Carrier[] = [["bg"], ["usbangla"], ["novoair"]];

const ROUTES: RouteDef[] = [
  { from: "DAC", to: "CXB", directMin: 60, baseFare: 6200, carriers: DOM },
  { from: "DAC", to: "ZYL", directMin: 50, baseFare: 5600, carriers: DOM },
  { from: "DAC", to: "JSR", directMin: 50, baseFare: 5300, carriers: DOM },
  { from: "DAC", to: "BZL", directMin: 45, baseFare: 4900, carriers: DOM },
  { from: "DAC", to: "SPD", directMin: 65, baseFare: 6000, carriers: DOM },
  { from: "DAC", to: "CGP", directMin: 55, baseFare: 5400, carriers: DOM },
  { from: "DAC", to: "DXB", directMin: 355, baseFare: 34000, carriers: [["emirates"], ["bg"], ["flydubai"], ["qatar", ["DOH"]], ["etihad", ["AUH"]], ["airarabia", ["SHJ"]], ["gulf", ["BAH"]], ["indigo", ["CCU", "DEL"]], ["kuwait", ["KWI"]], ["srilankan", ["CMB"]]] },
  { from: "DAC", to: "SIN", directMin: 250, baseFare: 30000, carriers: [["singapore"], ["bg"], ["malaysia", ["KUL"]], ["thai", ["BKK"]], ["indigo", ["CCU"]], ["srilankan", ["CMB"]], ["airasia", ["KUL"]]] },
  { from: "DAC", to: "KUL", directMin: 240, baseFare: 22000, carriers: [["malaysia"], ["airasia"], ["bg"], ["thai", ["BKK"]], ["indigo", ["CCU"]], ["srilankan", ["CMB"]], ["singapore", ["SIN"]]] },
  { from: "DAC", to: "BKK", directMin: 170, baseFare: 20000, carriers: [["thai"], ["bg"], ["indigo", ["CCU"]], ["airasia", ["KUL"]], ["malaysia", ["KUL"]], ["singapore", ["SIN"]], ["srilankan", ["CMB"]]] },
  { from: "DAC", to: "DOH", directMin: 330, baseFare: 33000, carriers: [["qatar"], ["emirates", ["DXB"]], ["flydubai", ["DXB"]], ["gulf", ["BAH"]], ["etihad", ["AUH"]], ["kuwait", ["KWI"]], ["indigo", ["DEL"]], ["airarabia", ["SHJ"]]] },
  { from: "DAC", to: "LHR", directMin: 600, baseFare: 90000, carriers: [["bg"], ["qatar", ["DOH"]], ["emirates", ["DXB"]], ["etihad", ["AUH"]], ["turkish", ["IST"]], ["gulf", ["BAH"]], ["kuwait", ["KWI"]], ["saudia", ["JED"]], ["srilankan", ["CMB"]], ["malaysia", ["KUL"]], ["thai", ["BKK"]]] },
  { from: "DAC", to: "MED", directMin: 400, baseFare: 48000, carriers: [["saudia"], ["bg"], ["indigo", ["HYD", "BOM", "DEL"]], ["qatar", ["DOH"]], ["emirates", ["DXB"]], ["flydubai", ["DXB"]], ["turkish", ["IST"]], ["airarabia", ["SHJ"]], ["etihad", ["AUH"]], ["gulf", ["BAH"]], ["kuwait", ["KWI"]]] },
];

export const getRoute = (from: string, to: string) => ROUTES.find((r) => r.from === from && r.to === to);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (n: number) => String(n).padStart(2, "0");
const hhmm = (ms: number) => `${pad(new Date(ms).getUTCHours())}:${pad(new Date(ms).getUTCMinutes())}`;
const dmy = (ms: number) => {
  const d = new Date(ms);
  return `${pad(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
const durLabel = (m: number) => `${Math.floor(m / 60)}hr ${pad(m % 60)}min`;

export const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

export const dateChip = (iso: string) => {
  const d = new Date(`${iso}T00:00:00Z`);
  return { day: DAYS[d.getUTCDay()], label: `${pad(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]}` };
};

// Deterministic PRNG so the same search always returns the same results.
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BD = new Set(["DAC", "CXB", "ZYL", "JSR", "BZL", "SPD", "CGP"]);

/* ------------------------------------------------------------------ */
/* Offer generator (replace with a real API call later)                */
/* ------------------------------------------------------------------ */

export function getFlightOffers(from: string, to: string, date: string): FlightOffer[] {
  const route = getRoute(from, to);
  if (!route) return [];

  const domestic = BD.has(from) && BD.has(to);
  const dayR = rng(`${from}${to}${date}`);
  const dow = new Date(`${date}T00:00:00Z`).getUTCDay();
  const dayFactor = (0.92 + dayR() * 0.2) * (dow === 5 || dow === 6 ? 1.06 : 1);
  const wall = (utc: number, code: string) => utc + tz(code, date) * 60000;
  const offers: FlightOffer[] = [];

  for (const [airlineId, hubs] of route.carriers) {
    const a = AIRLINES[airlineId];
    if (!a) continue;
    const r = rng(`${from}${to}${date}${airlineId}`);
    const count = domestic ? 2 + Math.floor(r() * 3) : 1 + Math.floor(r() * 2);

    for (let i = 0; i < count; i++) {
      const hour = domestic ? 6 + Math.floor(r() * 15) : Math.floor(r() * 24);
      const minute = Math.floor(r() * 12) * 5;
      const hub = hubs ? hubs[Math.floor(r() * hubs.length)] : undefined;
      const legs: { from: string; to: string; min: number }[] = hub
        ? [
            { from, to: hub, min: Math.round((route.directMin * (0.38 + r() * 0.12)) / 5) * 5 },
            { from: hub, to, min: Math.round((route.directMin * (0.62 + r() * 0.13)) / 5) * 5 },
          ]
        : [{ from, to, min: route.directMin }];
      const layover = hub ? 90 + Math.floor(r() * 66) * 5 : 0;

      const firstDep = Date.parse(`${date}T00:00:00Z`) + (hour * 60 + minute) * 60000 - tz(from, date) * 60000;
      let cursor = firstDep;
      const segments: FlightSegment[] = legs.map((leg, idx) => {
        const dep = cursor;
        const arr = dep + leg.min * 60000;
        const gap = idx < legs.length - 1 ? layover : 0;
        const pool = domestic && a.dom ? a.dom : a.jets;
        cursor = arr + gap * 60000;
        return {
          from: leg.from,
          fromCity: ap(leg.from).city,
          fromAirport: ap(leg.from).name,
          to: leg.to,
          toCity: ap(leg.to).city,
          toAirport: ap(leg.to).name,
          departTime: hhmm(wall(dep, leg.from)),
          departDate: dmy(wall(dep, leg.from)),
          arriveTime: hhmm(wall(arr, leg.to)),
          arriveDate: dmy(wall(arr, leg.to)),
          durationLabel: durLabel(leg.min),
          flightNo: `${a.code} ${100 + Math.floor(r() * 900)}`,
          aircraft: pool[Math.floor(r() * pool.length)],
          seats: 1 + Math.floor(r() * 9),
          layoverAfter: gap ? `${durLabel(gap)} Layover Transit at ${leg.to}` : undefined,
        };
      });

      const first = segments[0]!;
      const last = segments[segments.length - 1]!;
      const timeFactor = hour >= 22 || hour < 5 ? 0.94 : hour >= 17 && hour < 21 ? 1.05 : 1;
      const price = Math.round(route.baseFare * a.fare * (hub ? 0.9 : 1) * dayFactor * timeFactor * (0.92 + r() * 0.26));

      offers.push({
        id: `${from}-${to}-${date}-${airlineId}-${i}`,
        airlineId,
        airline: a.name,
        airlineCode: a.code,
        flightNo: first.flightNo,
        departTime: first.departTime,
        departDate: first.departDate,
        arriveTime: last.arriveTime,
        arriveDate: last.arriveDate,
        from,
        to,
        durationMin: Math.round((cursor - firstDep) / 60000),
        stops: legs.length - 1,
        layoverAt: hub,
        layoverLabel: hub ? `${Math.floor(layover / 60)}h ${pad(layover % 60)}m` : undefined,
        price,
        baggageKg: domestic ? 20 : (a.bag[Math.floor(r() * a.bag.length)] ?? 20),
        refundable: r() < a.refund,
        seats: Math.min(...segments.map((s) => s.seats ?? 9)),
        segments,
      });
    }
  }
  return offers;
}
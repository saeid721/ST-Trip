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
  segments?: FlightSegment[];
}

export const flightDates = [
  { id: "2026-09-29", day: "Tue", label: "29 Sep", price: 52400 },
  { id: "2026-09-30", day: "Wed", label: "30 Sep", price: 49800 },
  { id: "2026-10-01", day: "Thu", label: "01 Oct", price: 47193 },
  { id: "2026-10-02", day: "Fri", label: "02 Oct", price: 50250 },
  { id: "2026-10-03", day: "Sat", label: "03 Oct", price: 55100 },
  { id: "2026-10-04", day: "Sun", label: "04 Oct", price: 53900 },
];

export const flightOffers: FlightOffer[] = [
  { id: "f1", airline: "IndiGo", airlineCode: "6E", flightNo: "6E 1118", departTime: "13:05", departDate: "01 Oct 2026", arriveTime: "20:50", arriveDate: "01 Oct 2026", from: "DAC", to: "MED", durationMin: 645, stops: 1, layoverAt: "HYD", layoverLabel: "2h 30m", price: 47193, baggageKg: 30, refundable: false, seats: 2,
    segments: [
      { from: "DAC", fromCity: "Dhaka", fromAirport: "Dhaka Shahjalal International Airport", to: "HYD", toCity: "Hyderabad", toAirport: "Hyderabad Rajiv Gandhi International Airport", departTime: "13:05", departDate: "01 Oct 2026", arriveTime: "15:10", arriveDate: "01 Oct 2026", durationLabel: "2hr 35min", flightNo: "6E-1118", aircraft: "Airbus A321", seats: 2, layoverAfter: "2hr 30min Layover Transit at HYD" },
      { from: "HYD", fromCity: "Hyderabad", fromAirport: "Hyderabad Rajiv Gandhi International Airport", to: "MED", toCity: "Medina", toAirport: "Medina Prince Mohammad bin Abdulaziz Airport", departTime: "17:40", departDate: "01 Oct 2026", arriveTime: "20:50", arriveDate: "01 Oct 2026", durationLabel: "5hr 40min", flightNo: "6E-57", aircraft: "Airbus A320", seats: 2 },
    ] },
  { id: "f2", airline: "IndiGo", airlineCode: "6E", flightNo: "6E 1116", departTime: "15:55", departDate: "01 Oct 2026", arriveTime: "01:15", arriveDate: "02 Oct 2026", from: "DAC", to: "MED", durationMin: 740, stops: 1, layoverAt: "BOM", layoverLabel: "3h 55m", price: 57520, baggageKg: 30, refundable: false, seats: 3,
    segments: [
      { from: "DAC", fromCity: "Dhaka", fromAirport: "Dhaka Shahjalal International Airport", to: "HYD", toCity: "Hyderabad", toAirport: "Hyderabad Rajiv Gandhi International Airport", departTime: "13:05", departDate: "01 Oct 2026", arriveTime: "15:10", arriveDate: "01 Oct 2026", durationLabel: "2hr 35min", flightNo: "6E-1118", aircraft: "Airbus A321", seats: 2, layoverAfter: "2hr 30min Layover Transit at HYD" },
      { from: "HYD", fromCity: "Hyderabad", fromAirport: "Hyderabad Rajiv Gandhi International Airport", to: "MED", toCity: "Medina", toAirport: "Medina Prince Mohammad bin Abdulaziz Airport", departTime: "17:40", departDate: "01 Oct 2026", arriveTime: "20:50", arriveDate: "01 Oct 2026", durationLabel: "5hr 40min", flightNo: "6E-57", aircraft: "Airbus A320", seats: 2 },
    ] },
  { id: "f3", airline: "Qatar Airways", airlineCode: "QR", flightNo: "QR 643", departTime: "19:05", departDate: "01 Oct 2026", arriveTime: "03:15", arriveDate: "02 Oct 2026", from: "DAC", to: "MED", durationMin: 670, stops: 1, layoverAt: "DOH", layoverLabel: "3h 05m", price: 61056, baggageKg: 25, refundable: true, seats: 1,
    segments: [
      { from: "DAC", fromCity: "Dhaka", fromAirport: "Dhaka Shahjalal International Airport", to: "HYD", toCity: "Hyderabad", toAirport: "Hyderabad Rajiv Gandhi International Airport", departTime: "13:05", departDate: "01 Oct 2026", arriveTime: "15:10", arriveDate: "01 Oct 2026", durationLabel: "2hr 35min", flightNo: "6E-1118", aircraft: "Airbus A321", seats: 2, layoverAfter: "2hr 30min Layover Transit at HYD" },
      { from: "HYD", fromCity: "Hyderabad", fromAirport: "Hyderabad Rajiv Gandhi International Airport", to: "MED", toCity: "Medina", toAirport: "Medina Prince Mohammad bin Abdulaziz Airport", departTime: "17:40", departDate: "01 Oct 2026", arriveTime: "20:50", arriveDate: "01 Oct 2026", durationLabel: "5hr 40min", flightNo: "6E-57", aircraft: "Airbus A320", seats: 2 },
    ] },
  { id: "f4", airline: "Qatar Airways", airlineCode: "QR", flightNo: "QR 641", departTime: "11:10", departDate: "01 Oct 2026", arriveTime: "09:55", arriveDate: "02 Oct 2026", from: "DAC", to: "MED", durationMin: 1545, stops: 1, layoverAt: "DOH", layoverLabel: "17h 40m", price: 61378, baggageKg: 25, refundable: true, seats: 9,
    segments: [
      { from: "DAC", fromCity: "Dhaka", fromAirport: "Dhaka Shahjalal International Airport", to: "HYD", toCity: "Hyderabad", toAirport: "Hyderabad Rajiv Gandhi International Airport", departTime: "13:05", departDate: "01 Oct 2026", arriveTime: "15:10", arriveDate: "01 Oct 2026", durationLabel: "2hr 35min", flightNo: "6E-1118", aircraft: "Airbus A321", seats: 2, layoverAfter: "2hr 30min Layover Transit at HYD" },
      { from: "HYD", fromCity: "Hyderabad", fromAirport: "Hyderabad Rajiv Gandhi International Airport", to: "MED", toCity: "Medina", toAirport: "Medina Prince Mohammad bin Abdulaziz Airport", departTime: "17:40", departDate: "01 Oct 2026", arriveTime: "20:50", arriveDate: "01 Oct 2026", durationLabel: "5hr 40min", flightNo: "6E-57", aircraft: "Airbus A320", seats: 2 },
    ] },
  { id: "f5", airline: "Emirates", airlineCode: "EK", flightNo: "EK 585", departTime: "03:00", departDate: "01 Oct 2026", arriveTime: "12:40", arriveDate: "01 Oct 2026", from: "DAC", to: "MED", durationMin: 520, stops: 1, layoverAt: "DXB", layoverLabel: "1h 50m", price: 69930, baggageKg: 30, refundable: true, seats: 5,
    segments: [
      { from: "DAC", fromCity: "Dhaka", fromAirport: "Dhaka Shahjalal International Airport", to: "HYD", toCity: "Hyderabad", toAirport: "Hyderabad Rajiv Gandhi International Airport", departTime: "13:05", departDate: "01 Oct 2026", arriveTime: "15:10", arriveDate: "01 Oct 2026", durationLabel: "2hr 35min", flightNo: "6E-1118", aircraft: "Airbus A321", seats: 2, layoverAfter: "2hr 30min Layover Transit at HYD" },
      { from: "HYD", fromCity: "Hyderabad", fromAirport: "Hyderabad Rajiv Gandhi International Airport", to: "MED", toCity: "Medina", toAirport: "Medina Prince Mohammad bin Abdulaziz Airport", departTime: "17:40", departDate: "01 Oct 2026", arriveTime: "20:50", arriveDate: "01 Oct 2026", durationLabel: "5hr 40min", flightNo: "6E-57", aircraft: "Airbus A320", seats: 2 },
    ] },
  { id: "f6", airline: "Saudia", airlineCode: "SV", flightNo: "SV 805", departTime: "00:45", departDate: "01 Oct 2026", arriveTime: "05:30", arriveDate: "01 Oct 2026", from: "DAC", to: "MED", durationMin: 405, stops: 0, price: 73963, baggageKg: 35, refundable: true, seats: 4,
    segments: [
      { from: "DAC", fromCity: "Dhaka", fromAirport: "Dhaka Shahjalal International Airport", to: "HYD", toCity: "Hyderabad", toAirport: "Hyderabad Rajiv Gandhi International Airport", departTime: "13:05", departDate: "01 Oct 2026", arriveTime: "15:10", arriveDate: "01 Oct 2026", durationLabel: "2hr 35min", flightNo: "6E-1118", aircraft: "Airbus A321", seats: 2, layoverAfter: "2hr 30min Layover Transit at HYD" },
      { from: "HYD", fromCity: "Hyderabad", fromAirport: "Hyderabad Rajiv Gandhi International Airport", to: "MED", toCity: "Medina", toAirport: "Medina Prince Mohammad bin Abdulaziz Airport", departTime: "17:40", departDate: "01 Oct 2026", arriveTime: "20:50", arriveDate: "01 Oct 2026", durationLabel: "5hr 40min", flightNo: "6E-57", aircraft: "Airbus A320", seats: 2 },
    ] },
];
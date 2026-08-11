import { z } from "zod";

export const flightSearchSchema = z
  .object({
    tripType: z.enum(["one-way", "round-trip", "multi-city"]),
    origin: z.string().min(3, "Choose a departure city"),
    destination: z.string().min(3, "Choose a destination city"),
    departureDate: z.string().min(1, "Choose a departure date"),
    returnDate: z.string().optional(),
    travelers: z.object({
      adults: z.number().min(1).max(9),
      children: z.number().min(0).max(8),
      infants: z.number().min(0).max(4),
    }),
    cabinClass: z.enum(["economy", "premium-economy", "business", "first"]),
  })
  .refine((data) => data.origin !== data.destination, {
    message: "Origin and destination cannot be the same",
    path: ["destination"],
  })
  .refine(
    (data) => data.tripType !== "round-trip" || Boolean(data.returnDate),
    { message: "Choose a return date", path: ["returnDate"] },
  );

export type FlightSearchInput = z.infer<typeof flightSearchSchema>;

export const hotelSearchSchema = z.object({
  destination: z.string().min(2, "Choose a destination"),
  checkIn: z.string().min(1, "Choose a check-in date"),
  checkOut: z.string().min(1, "Choose a check-out date"),
  rooms: z.number().min(1).max(8),
  guests: z.number().min(1).max(16),
});

export type HotelSearchInput = z.infer<typeof hotelSearchSchema>;

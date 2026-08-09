"use client";

import { useState, useCallback } from "react";
import type { FlightSearchValues, TripType } from "@/features/search/types";
import { flightSearchSchema } from "@/features/search/validators/flightSearch";
import { trackEvent } from "@/lib/analytics";

const today = new Date().toISOString().slice(0, 10);

const initialValues: FlightSearchValues = {
  tripType: "one-way",
  origin: "DAC",
  destination: "CXB",
  departureDate: today,
  returnDate: undefined,
  travelers: { adults: 1, children: 0, infants: 0 },
  cabinClass: "economy",
};

/**
 * Shared flight-search form state — used by the homepage widget today and
 * reusable on the future /flights results page without duplicating logic.
 */
export function useSearchForm() {
  const [values, setValues] = useState<FlightSearchValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const setTripType = useCallback((tripType: TripType) => {
    setValues((prev) => ({ ...prev, tripType }));
  }, []);

  const swapOriginDestination = useCallback(() => {
    setValues((prev) => ({ ...prev, origin: prev.destination, destination: prev.origin }));
  }, []);

  const updateField = useCallback(<K extends keyof FlightSearchValues>(
    key: K,
    value: FlightSearchValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const submit = useCallback(
    (onValid: (values: FlightSearchValues) => void) => {
      const result = flightSearchSchema.safeParse(values);
      if (!result.success) {
        const fieldErrors: Partial<Record<string, string>> = {};
        for (const issue of result.error.issues) {
          fieldErrors[String(issue.path[0])] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }
      setErrors({});
      trackEvent("flight_search_submitted", {
        tripType: values.tripType,
        origin: values.origin,
        destination: values.destination,
      });
      onValid(result.data);
    },
    [values],
  );

  return { values, errors, setTripType, swapOriginDestination, updateField, submit };
}

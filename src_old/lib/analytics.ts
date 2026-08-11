/**
 * Analytics stub. Swap the console.log for real GA4 (gtag) / Meta Pixel
 * (fbq) calls when those are wired up — every call site in the app already
 * routes through this function, so no component changes will be needed.
 */
type TrackEventPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, payload: TrackEventPayload = {}) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[analytics] ${eventName}`, payload);
  }

  // Example future wiring:
  // window.gtag?.("event", eventName, payload);
  // window.fbq?.("trackCustom", eventName, payload);
}

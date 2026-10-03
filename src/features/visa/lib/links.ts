import { siteConfig } from "@/config/site";

/** `tel:` href without spaces / dashes. */
export const visaPhoneHref = `tel:${siteConfig.contact.supportPhone.replace(/[^\d+]/g, "")}`;

/** WhatsApp deep link with a pre-filled message. */
export function visaWhatsAppHref(message: string): string {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";

const socialIcons = [
  { href: siteConfig.social.facebook, icon: Facebook, label: "Facebook" },
  { href: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
  { href: siteConfig.social.twitter, icon: Twitter, label: "Twitter" },
  { href: siteConfig.social.youtube, icon: Youtube, label: "YouTube" },
  { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
];

const paymentMethods = [
  "Visa",
  "Mastercard",
  "Amex",
  "bKash",
  "Nagad",
  "Rocket",
  "Upay",
];

export function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <span className="font-heading text-2xl font-bold text-white">{siteConfig.name}</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-200">
            {siteConfig.description}
          </p>
          <div className="mt-5 flex gap-3">
            {socialIcons.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-500"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="font-heading text-sm font-semibold text-white">{group.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="font-heading text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-200">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <a href={`tel:${siteConfig.contact.supportPhone}`} className="hover:text-white">
                {siteConfig.contact.supportPhoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.offices.map((office) => (
            <div key={office.name}>
              <h4 className="text-sm font-semibold text-white">{office.name}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-primary-300">{office.address}</p>
              <p className="mt-1 text-xs text-primary-300">{office.phone}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-primary-300">
            © 2016–{new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
            {paymentMethods.map((method) => (
              <li
                key={method}
                className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-primary-100"
              >
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
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
  { name: "Visa", icon: "/icons/visa.png" },
  { name: "Mastercard", icon: "/icons/mastercard.png" },
  { name: "American Express", icon: "/icons/american-express.png" },
  { name: "bKash", icon: "/icons/bkash.png" },
  { name: "Nagad", icon: "/icons/nogod.png" },
  { name: "Rocket", icon: "/icons/rocket.png" },
  { name: "DBBL", icon: "/icons/dbbl.png" },
  { name: "SSLCommerz", icon: "/icons/sslcommerz.png" },
  { name: "BRAC Bank", icon: "/icons/brac-bank.png" },
  { name: "City Bank", icon: "/icons/citybank.png" },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" aria-label={`${siteConfig.name} home`}>
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={200}
              height={60}
              className="h-14 w-auto object-contain brightness-110 drop-shadow-sm"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-300">
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
                    className="text-sm text-neutral-300 transition-colors hover:text-white"
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
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-300">
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
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">{office.address}</p>
              <p className="mt-1 text-xs text-neutral-400">{office.phone}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-neutral-400">
            © 2016–{new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
            {paymentMethods.map((method) => (
              <li
                key={method.name}
                className="flex h-6 items-center justify-center rounded-md bg-white px-1 py-1 shadow-sm"
                title={method.name}
              >
                <Image
                  src={method.icon}
                  alt={method.name}
                  width={48}
                  height={28}
                  className="h-5 w-auto max-w-[36px] object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

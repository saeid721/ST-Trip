import Image from 'next/image';

// ২০টি এয়ারলাইনের লোগোর তালিকা
const AIRLINE_PARTNERS = [
  { name: 'Emirates', logo: '/images/airlines/emirates.png' },
  { name: 'Qatar Airways', logo: '/images/airlines/qatar.png' },
  { name: 'Biman Bangladesh', logo: '/images/airlines/biman.png' },
  { name: 'US-Bangla Airlines', logo: '/images/airlines/us-bangla.png' },
  { name: 'Air Arabia', logo: '/images/airlines/air-arabia.png' },
  { name: 'Singapore Airlines', logo: '/images/airlines/singapore.png' },
  { name: 'Turkish Airlines', logo: '/images/airlines/turkish.png' },
  { name: 'Etihad Airways', logo: '/images/airlines/etihad.png' },
  { name: 'Flydubai', logo: '/images/airlines/flydubai.png' },
  { name: 'Jazeera Airways', logo: '/images/airlines/jazeera.png' },
  { name: 'Saudi Arabian Airlines', logo: '/images/airlines/saudi.png' },
  { name: 'Gulf Air', logo: '/images/airlines/gulf.png' },
  { name: 'Malaysia Airlines', logo: '/images/airlines/malaysia.png' },
  { name: 'AirAsia', logo: '/images/airlines/airasia.png' },
  { name: 'Thai Airways', logo: '/images/airlines/thai.png' },
  { name: 'IndiGo', logo: '/images/airlines/indigo.png' },
  { name: 'Cathay Pacific', logo: '/images/airlines/cathay.png' },
  { name: 'Kuwait Airways', logo: '/images/airlines/kuwait.png' },
  { name: 'SriLankan Airlines', logo: '/images/airlines/srilankan.png' },
  { name: 'NOVOAIR', logo: '/images/airlines/novoair.png' },
];

export default function PartnersMarquee() {
  const marqueeItems = [...AIRLINE_PARTNERS, ...AIRLINE_PARTNERS];

  return (
    <section className="w-full bg-slate-50 py-8 border-y border-slate-200 overflow-hidden">
      <div className="container-app mb-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Top Airline Partners
        </p>
      </div>

      {/* Marquee Wrapper with Edge Fades */}
      <div className="relative w-full overflow-hidden flex [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex min-w-full shrink-0 gap-8 py-4 animate-marquee items-center justify-around hover:[animation-play-state:paused]">
          {marqueeItems.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex items-center justify-center h-16 w-36 px-4 bg-white rounded-md shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:scale-105 group shrink-0"
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={100}
                height={40}
                className="max-h-10 max-w-[100px] object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
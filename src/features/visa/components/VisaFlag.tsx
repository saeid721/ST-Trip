import { cn } from "@/lib/utils";

export function VisaFlag({ code, name, className }: { code: string; name: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      alt={`${name} flag`}
      width={40}
      height={28}
      loading="lazy"
      className={cn("h-5 w-7 shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08)]", className)}
    />
  );
}
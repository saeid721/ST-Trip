"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCodeButton({ code, disabled = false }: { code: string; disabled?: boolean }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard blocked: ignore */
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            disabled={disabled}
            aria-label={`Copy promo code ${code}`}
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-dashed border-primary-300 bg-primary-50 px-3 font-mono text-xs font-semibold text-primary-700 transition-colors hover:bg-primary-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-400"
        >
            {code}
            {copied ? (
                <Check className="h-4 w-4 text-accent-600" aria-hidden />
            ) : (
                <Copy className="h-4 w-4" aria-hidden />
            )}
        </button>
    );
}
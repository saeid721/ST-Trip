"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

/**
 * Fixed bottom-right support bubble, inspired by Amy's chat launcher.
 * Isolated client island — does not affect server-rendered LCP content.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Support chat"
            className="mb-4 w-[320px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between bg-primary-700 px-4 py-3.5 text-white">
              <p className="font-heading text-sm font-semibold">{siteConfig.name} Support</p>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-white/10"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="space-y-3 p-4 text-sm text-neutral-600">
              <p>
                Hi! 👋 We&apos;re online 24/7. Ask us about flights, hotels, tours or visas.
              </p>
            </div>
            <div className="flex items-center gap-2 border-t border-neutral-200 p-3">
              <input
                type="text"
                placeholder="Type a message…"
                aria-label="Chat message"
                className="h-10 flex-1 rounded-lg border border-neutral-200 px-3 text-sm focus-visible:outline-none"
              />
              <Button size="icon" aria-label="Send message">
                <Send className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="primary"
        size="icon"
        aria-label={open ? "Close support chat" : "Open support chat"}
        aria-expanded={open}
        className="h-14 w-14 rounded-full"
        onClick={() => {
          setOpen((v) => !v);
          trackEvent("chat_widget_toggled", { open: !open });
        }}
      >
        {open ? <X className="h-6 w-6" aria-hidden /> : <MessageCircle className="h-6 w-6" aria-hidden />}
      </Button>
    </div>
  );
}

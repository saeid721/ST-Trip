"use client";

import { useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X, AtSign, Globe, Facebook, Apple } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [credential, setCredential] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: replace with real authentication flow
    console.log("Login with:", credential);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-white p-8 shadow-2xl outline-none data-[state=open]:animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-3xl font-semibold text-neutral-950">
                Sign In
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-neutral-600">
                Sign in to your account and manage bookings, payments, and travel plans.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100"
                aria-label="Close sign in dialog"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-neutral-800">
              Email or Mobile Number
              <div className="relative rounded-3xl border border-neutral-200 bg-white px-4 py-3 shadow-sm focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100">
                <AtSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden />
                <input
                  type="text"
                  name="credential"
                  value={credential}
                  onChange={(event) => setCredential(event.target.value)}
                  placeholder="Email or phone number"
                  className="w-full border-0 bg-transparent pl-11 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                />
              </div>
            </label>
            <Button type="submit" className="w-full rounded-3xl bg-[#E92227] text-white hover:bg-[#C21D23]" size="lg">
              Login
            </Button>
          </form>

          <div className="relative my-6 flex items-center">
            <span className="absolute inset-x-0 top-1/2 h-px bg-neutral-200" />
            <span className="relative mx-auto rounded-full bg-white px-3 text-xs uppercase tracking-[0.25em] text-neutral-500">
              Or Sign In with
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button type="button" className={cn("flex items-center justify-center gap-2 rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50")}>
              <Globe className="h-4 w-4" aria-hidden />
              Google
            </button>
            <button type="button" className={cn("flex items-center justify-center gap-2 rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50")}>
              <Facebook className="h-4 w-4" aria-hidden />
              Facebook
            </button>
            <button type="button" className={cn("flex items-center justify-center gap-2 rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50")}>
              <Apple className="h-4 w-4" aria-hidden />
              Apple
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-neutral-600">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign up!
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

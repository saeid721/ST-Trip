"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Apple, HelpCircle, Maximize, Minimize, Pause, Play, Smartphone, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  unloadModule(name: string): void;
  destroy(): void;
}

declare global {
  interface Window {
    YT?: { Player: new (element: HTMLElement, options: unknown) => YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;
let activePlayer: YTPlayer | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (!ytApiPromise) {
    ytApiPromise = new Promise<void>((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve();
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    });
  }
  return ytApiPromise;
}

const deviceGuides = [
  { icon: Apple, label: "Install eSIM on iOS", href: "/help" },
  { icon: Smartphone, label: "Check Android eSIM support", href: "/help" },
  { icon: HelpCircle, label: "What devices support eSIM?", href: "/help" },
];

const setupVideos = [
  {
    id: "XorwFnVc-Mw",
    platform: "Android",
    icon: Smartphone,
    title: "How to activate an eSIM on Android",
    description: "Step-by-step guide to install and activate your eSIM on an Android phone.",
  },
  {
    id: "uKJCFXYAE40",
    platform: "iPhone",
    icon: Apple,
    title: "How to activate an eSIM on iPhone",
    description: "Step-by-step guide to install and activate your eSIM on an iPhone.",
  },
];

function VideoCard({ id, platform, icon: Icon, title, description }: (typeof setupVideos)[number]) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  useEffect(() => {
    setCanFullscreen(!!document.fullscreenEnabled);
    const onChange = () => setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const holder = holderRef.current;

    loadYouTubeApi().then(() => {
      if (cancelled || !holder || !window.YT) return;
      const mount = document.createElement("div");
      holder.appendChild(mount);
      playerRef.current = new window.YT.Player(mount, {
        host: "https://www.youtube-nocookie.com",
        videoId: id,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          cc_load_policy: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: { target: YTPlayer }) => {
            try {
              event.target.unloadModule("captions");
            } catch {}
            event.target.playVideo();
          },
          onStateChange: (event: { target: YTPlayer; data: number }) => {
            setPlaying(event.data === 1 || event.data === 3);
            if (event.data === 0) setProgress(0);
            if (event.data === 1) {
              if (activePlayer && activePlayer !== event.target) {
                try {
                  activePlayer.pauseVideo();
                } catch {}
              }
              activePlayer = event.target;
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (activePlayer === playerRef.current) activePlayer = null;
      playerRef.current?.destroy();
      playerRef.current = null;
      if (holder) holder.innerHTML = "";
    };
  }, [started, id]);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      const player = playerRef.current;
      if (player && typeof player.getDuration === "function" && player.getDuration() > 0) {
        setProgress((player.getCurrentTime() / player.getDuration()) * 100);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [playing]);

  function getPlayer() {
    const player = playerRef.current;
    return player && typeof player.playVideo === "function" ? player : null;
  }

  function togglePlay() {
    if (!started) {
      setStarted(true);
      return;
    }
    const player = getPlayer();
    if (!player) return;
    if (playing) player.pauseVideo();
    else player.playVideo();
  }

  function toggleMute() {
    const player = getPlayer();
    if (!player) return;
    if (muted) player.unMute();
    else player.mute();
    setMuted(!muted);
  }

  function handleSeek(event: React.ChangeEvent<HTMLInputElement>) {
    const player = getPlayer();
    if (!player) return;
    const value = Number(event.target.value);
    setProgress(value);
    player.seekTo((value / 100) * player.getDuration(), true);
  }

  function toggleFullscreen() {
    const element = wrapperRef.current;
    if (!element) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void element.requestFullscreen();
  }

  return (
    <article className="flex flex-col">
      <div
        ref={wrapperRef}
        className="group relative aspect-video overflow-hidden rounded-md bg-neutral-900 shadow-sm [&:fullscreen]:aspect-auto [&:fullscreen]:rounded-none"
      >
        {/* Oversized + shifted iframe: the YouTube title bar and logo fall outside the visible area */}
        <div
          ref={holderRef}
          className="pointer-events-none absolute inset-x-0 top-[-30%] h-[160%] [&_iframe]:h-full [&_iframe]:w-full"
        />

        {/* Click layer: blocks YouTube hover UI, toggles play/pause, and shows the poster while not playing */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? `Pause video: ${title}` : `Play video: ${title}`}
          className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
        >
          {!playing && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/10 to-neutral-900/30" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary-800 shadow-sm">
                <Icon className="h-3.5 w-3.5" aria-hidden /> {platform}
              </span>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary-700 shadow-lg ring-8 ring-white/25 transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
                <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" aria-hidden />
              </span>
            </>
          )}
        </button>

        {/* Custom controls */}
        {started && (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-neutral-900/80 to-transparent px-3 pb-2 pt-8 text-white transition-opacity",
              playing ? "opacity-100 md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100" : "opacity-100",
            )}
          >
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-white/20"
            >
              {playing ? <Pause className="h-4 w-4 fill-current" aria-hidden /> : <Play className="h-4 w-4 fill-current" aria-hidden />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              aria-label="Seek video"
              className="h-1 min-w-0 flex-1 cursor-pointer accent-white"
            />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-white/20"
            >
              {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
            </button>
            {canFullscreen && (
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-white/20"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" aria-hidden /> : <Maximize className="h-4 w-4" aria-hidden />}
              </button>
            )}
          </div>
        )}
      </div>
      <h3 className="mt-3 text-sm font-semibold text-neutral-800">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-neutral-500">{description}</p>
    </article>
  );
}

export function EsimSearchAndGuides() {
  return (
    <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-floating sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div>
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            <HelpCircle className="h-3.5 w-3.5 text-primary-600" aria-hidden /> Device guides
          </h2>
          <ul className="mt-3 space-y-1">
            {deviceGuides.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link href={href} className="flex min-h-10 items-center gap-2.5 rounded-sm px-2 text-sm text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700">
                  <Icon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

                <div className="border-t border-neutral-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Setup guides</h2>
          <div className="mt-3 grid gap-6 md:grid-cols-2">
            {setupVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
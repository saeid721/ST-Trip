"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, PlayCircle, Volume2, VolumeX } from "lucide-react";
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

type YTWindow = {
  YT?: { Player: new (element: HTMLElement, options: unknown) => YTPlayer };
  onYouTubeIframeAPIReady?: () => void;
};

const getYTWindow = () => window as unknown as YTWindow;

let ytApiPromise: Promise<void> | null = null;
let activePlayer: YTPlayer | null = null;

function loadYouTubeApi(): Promise<void> {
  const w = getYTWindow();
  if (w.YT?.Player) return Promise.resolve();
  if (!ytApiPromise) {
    ytApiPromise = new Promise<void>((resolve) => {
      const previous = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
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

interface CustomYouTubePlayerProps {
  videoId: string;
  title: string;
  className?: string;
}

export function CustomYouTubePlayer({ videoId, title, className }: CustomYouTubePlayerProps) {
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
      const yt = getYTWindow().YT;
      if (cancelled || !holder || !yt) return;
      const mount = document.createElement("div");
      holder.appendChild(mount);
      playerRef.current = new yt.Player(mount, {
        host: "https://www.youtube-nocookie.com",
        videoId,
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
  }, [started, videoId]);

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
    <div
      ref={wrapperRef}
      className={cn(
        "group relative aspect-video overflow-hidden rounded-md bg-neutral-900 [&:fullscreen]:aspect-auto [&:fullscreen]:rounded-none",
        className,
      )}
    >
      {/* Oversized + shifted iframe: the YouTube title bar and logo fall outside the visible area */}
      <div
        ref={holderRef}
        className="pointer-events-none absolute inset-x-0 top-[-30%] h-[160%] [&_iframe]:h-full [&_iframe]:w-full"
      />

      {/* Click layer: blocks YouTube hover UI, toggles play/pause, shows the poster while not playing */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? `Pause video: ${title}` : `Play video: ${title}`}
        className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
      >
        {!playing && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
            <PlayCircle
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow"
              aria-hidden
            />
            {!started && (
              <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold text-white">{title}</span>
            )}
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
  );
}
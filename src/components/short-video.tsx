"use client";

import { useEffect, useRef, useState } from "react";
import { VIDEOS_AVAILABLE } from "@/lib/constants";

interface ShortVideoProps {
  /** Base name without extension. e.g. "v1-stack-overview" → loads /videos/v1-stack-overview.{mp4,webm} */
  src: string;
  /** Aspect ratio for the wrapper (CSS aspect-ratio value). Examples: "16/9", "9/16", "720/1564" */
  aspectRatio?: string;
  /** Whether to autoplay (loop, muted) — default true */
  autoplay?: boolean;
  /** className applied to the wrapper */
  className?: string;
  /** Caption shown overlay top-left */
  caption?: string;
  /** objectFit on the video element — default "cover" */
  objectFit?: "cover" | "contain";
}

export function ShortVideo({
  src,
  aspectRatio = "16/9",
  autoplay = true,
  className,
  caption,
  objectFit = "cover",
}: ShortVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isAvailable = VIDEOS_AVAILABLE[src] === true;
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isAvailable || !autoplay) return;
    const v = ref.current;
    if (!v) return;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* autoplay blocked — poster stays visible until user taps */
        });
      }
    };

    // Try when video data is ready (most reliable)
    const onCanPlay = () => tryPlay();
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("loadeddata", onCanPlay);

    // Force load explicitly — some browsers don't auto-fetch nested videos
    try {
      v.load();
    } catch {
      /* ignore */
    }

    // Try when scrolled into view
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && v.paused) tryPlay();
        });
      },
      { threshold: 0.1 },
    );
    if (wrapperRef.current) io.observe(wrapperRef.current);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("loadeddata", onCanPlay);
      io.disconnect();
    };
  }, [isAvailable, autoplay, src]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        aspectRatio,
        width: "100%",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        background: "#0B0B0F",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {isAvailable && !hasError ? (
        <video
          ref={ref}
          autoPlay={autoplay}
          loop={autoplay}
          muted
          playsInline
          preload="auto"
          poster={`/videos/${src}.jpg`}
          onError={(e) => {
            console.error(`Video load error for ${src}:`, e);
            setHasError(true);
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit,
            display: "block",
            position: "absolute",
            inset: 0,
          }}
        >
          <source src={`/videos/${src}.webm`} type="video/webm" />
        </video>
      ) : (
        <VideoPlaceholder />
      )}
      {caption && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            padding: "6px 12px",
            borderRadius: 8,
            background: "rgba(11, 11, 15, 0.7)",
            color: "white",
            fontSize: 12,
            fontFamily: "var(--font-mono), JetBrains Mono, monospace",
            backdropFilter: "blur(8px)",
            zIndex: 2,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

function VideoPlaceholder() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background:
          "repeating-linear-gradient(45deg, var(--color-surface-2) 0 20px, var(--color-surface) 20px 40px)",
        color: "var(--color-text-muted)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--color-primary-soft)",
          color: "var(--color-primary-strong)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255,107,26,0.25)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7-11-7Z" />
        </svg>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono), JetBrains Mono, monospace",
          fontSize: 11,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "var(--color-text-faint)",
        }}
      >
        Video coming soon
      </div>
    </div>
  );
}

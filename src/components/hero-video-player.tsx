"use client";

import { useEffect, useRef } from "react";
import { VIDEOS_AVAILABLE } from "@/lib/constants";

export interface Track {
  id: string;
  label: string;
  /** Aspect handling: vertical videos get letterboxed inside the 16:9 frame */
  vertical?: boolean;
}

export const TRACKS: Track[] = [
  { id: "v1-stack-overview", label: "Stack Overview" },
  { id: "v2-mobile-auth", label: "Mobile Auth", vertical: true },
  { id: "v3-portal-tour", label: "Portal Tour" },
  { id: "v4-airgapped-install", label: "Airgapped Install" },
];

interface HeroVideoPlayerProps {
  activeIdx: number;
  autoNext: boolean;
  onEnded: () => void;
  onAutoToggle: () => void;
}

export function HeroVideoPlayer({
  activeIdx,
  autoNext,
  onEnded,
  onAutoToggle,
}: HeroVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = TRACKS[activeIdx];
  const isAvailable = VIDEOS_AVAILABLE[active.id] === true;

  // Reload video element when track changes so the new <source> takes effect.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    // Some browsers don't auto-resume after .load() — kick playback explicitly.
    const tryPlay = () => {
      v.play().catch(() => {
        /* ignore — autoplay may be blocked, poster will show */
      });
    };
    v.addEventListener("loadedmetadata", tryPlay, { once: true });
    return () => v.removeEventListener("loadedmetadata", tryPlay);
  }, [activeIdx]);

  return (
    <div className="hv-body">
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          background: "linear-gradient(180deg, #FAFAFB 0%, #F5F5F7 100%)",
          overflow: "hidden",
        }}
      >
        {isAvailable ? (
          <video
            key={active.id}
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop={!autoNext}
            preload="auto"
            poster={`/videos/${active.id}.jpg`}
            onEnded={onEnded}
            style={{
              width: "100%",
              height: "100%",
              objectFit: active.vertical ? "contain" : "cover",
              display: "block",
              background: active.vertical ? "#0B0B0F" : undefined,
            }}
          >
            <source src={`/videos/${active.id}.webm`} type="video/webm" />
          </video>
        ) : (
          <PlayerPlaceholder label={active.label} />
        )}

        {/* Mode badge — top right, clickable in Manual mode to resume Auto */}
        <div
          onClick={!autoNext ? onAutoToggle : undefined}
          title={!autoNext ? "Click to resume auto-play" : undefined}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "4px 10px",
            borderRadius: 999,
            background: autoNext ? "var(--color-primary)" : "rgba(11,11,15,0.7)",
            color: "white",
            fontSize: 10,
            fontWeight: 600,
            fontFamily: "var(--font-mono), JetBrains Mono, monospace",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            backdropFilter: "blur(8px)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            cursor: !autoNext ? "pointer" : "default",
            userSelect: "none",
          }}
        >
          {autoNext ? (
            <>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "white",
                  animation: "pulse-dot 1.6s ease-in-out infinite",
                }}
              />
              Auto
            </>
          ) : (
            <>
              <svg
                width="8"
                height="8"
                viewBox="0 0 16 16"
                fill="currentColor"
                style={{ opacity: 0.8 }}
              >
                <path d="M13.65 2.35A8 8 0 1 0 15 8h-2a6 6 0 1 1-1.06-3.41L10 7h5V2l-1.35.35z" />
              </svg>
              Manual
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PlayerPlaceholder({ label }: { label: string }) {
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
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "var(--color-primary-soft)",
          color: "var(--color-primary-strong)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255,107,26,0.25)",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7-11-7Z" />
        </svg>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono), JetBrains Mono, monospace",
          fontSize: 12,
          letterSpacing: "0.04em",
          textAlign: "center",
        }}
      >
        {label}
        <br />
        <span style={{ color: "var(--color-text-faint)", fontSize: 11 }}>video coming soon</span>
      </div>
    </div>
  );
}

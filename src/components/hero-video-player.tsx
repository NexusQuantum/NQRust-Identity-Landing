"use client";

import { useEffect, useRef, useState } from "react";
import { VIDEOS_AVAILABLE } from "@/lib/constants";

interface Track {
  id: string;
  label: string;
  /** Aspect handling: vertical videos get letterboxed inside the 16:9 frame */
  vertical?: boolean;
}

const TRACKS: Track[] = [
  { id: "v1-stack-overview", label: "Stack Overview" },
  { id: "v2-mobile-auth", label: "Mobile Auth", vertical: true },
  { id: "v3-portal-tour", label: "Portal Tour" },
  { id: "v4-airgapped-install", label: "Airgapped Install" },
];

export function HeroVideoPlayer() {
  const [activeIdx, setActiveIdx] = useState(0);
  /** When user clicks a track, autoNext disables — selected track loops. */
  const [autoNext, setAutoNext] = useState(true);
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

  const handleEnded = () => {
    if (autoNext) {
      setActiveIdx((i) => (i + 1) % TRACKS.length);
    } else if (videoRef.current) {
      // Manual mode: loop the selected track.
      videoRef.current.currentTime = 0;
      void videoRef.current.play();
    }
  };

  const handleTrackClick = (idx: number) => {
    setAutoNext(false);
    setActiveIdx(idx);
  };

  return (
    <div className="hv-body" style={{ display: "flex", flexDirection: "column" }}>
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
            // When autoNext is off we still want native loop on the picked track.
            loop={!autoNext}
            preload="auto"
            poster={`/videos/${active.id}.jpg`}
            onEnded={handleEnded}
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

        {/* Mode badge — top right */}
        <div
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
            "Manual"
          )}
        </div>
      </div>

      {/* Track switcher — bottom strip, equal-width grid so it never overflows */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${TRACKS.length}, minmax(0, 1fr))`,
          gap: 6,
          padding: "10px 12px",
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}
      >
        {TRACKS.map((t, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => handleTrackClick(i)}
              title={t.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 6,
                padding: "6px 8px",
                borderRadius: 8,
                border: `1px solid ${isActive ? "var(--color-primary)" : "var(--color-border)"}`,
                background: isActive ? "var(--color-primary-soft)" : "transparent",
                color: isActive ? "var(--color-primary-strong)" : "var(--color-text-2)",
                fontFamily: "var(--font-mono), JetBrains Mono, monospace",
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer",
                transition: "border-color .15s, background .15s, color .15s",
                minWidth: 0,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: isActive ? "var(--color-primary)" : "var(--color-surface-2)",
                  color: isActive ? "white" : "var(--color-text-muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="7" height="7" viewBox="0 0 8 8" fill="currentColor">
                  <path d="M2 1v6l5-3-5-3z" />
                </svg>
              </span>
              <span
                style={{
                  flexShrink: 0,
                  fontSize: 9,
                  color: isActive ? "var(--color-primary)" : "var(--color-text-faint)",
                }}
              >
                0{i + 1}
              </span>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
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
